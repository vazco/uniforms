import * as graphql from 'graphql/type/definition';
import invariant from 'invariant';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import upperFirst from 'lodash/upperFirst';
import { Bridge, joinName } from 'uniforms';

function extractValue(x: boolean | null | string | undefined, y: string) {
  return x === false || x === null ? '' : x !== true && x !== undefined ? x : y;
}

// FIXME: What type is it? Maybe there's a helper in `graphql` for that?
function extractFromNonNull(x: any) {
  return x && graphql.isNonNullType(x.type) ? { ...x, type: x.type.ofType } : x;
}

function toHumanLabel(label: string) {
  return upperFirst(lowerCase(label));
}

export default class GraphQLBridge extends Bridge {
  constructor(
    public schema: graphql.GraphQLInputObjectType | graphql.GraphQLObjectType,
    public validator: (model: Record<string, any>) => any,
    public extras: Record<string, any> = {},
  ) {
    super();

    // Memoize for performance and referential equality.
    this.getField = memoize(
      this.getField,
      (name, returnExtracted = true) => `${name}:${returnExtracted}`,
    );
    this.getSubfields = memoize(this.getSubfields);
    this.getType = memoize(this.getType);
  }

  getError(name: string, error: any) {
    return (
      // FIXME: Correct type for `error`.
      error?.details?.find?.((error: any) => error.name === name) || null
    );
  }

  getErrorMessage(name: string, error: any) {
    const scopedError = this.getError(name, error);
    return scopedError?.message || '';
  }

  getErrorMessages(error: any) {
    if (error) {
      if (Array.isArray(error.details)) {
        // FIXME: Correct type for `error`.
        return (error.details as any[]).map(error => error.message);
      }

      if (error.message) {
        return [error.message];
      }
    }

    if (error !== undefined) {
      return [error];
    }

    return [];
  }

  getField(name: string, returnExtracted = true) {
    return joinName(null, name).reduce((definition, next, index, array) => {
      if (next === '$' || next === '' + parseInt(next, 10)) {
        invariant(
          graphql.isListType(definition.type),
          'Field not found in schema: "%s"',
          name,
        );
        definition = { type: extractFromNonNull(definition.type.ofType) };
        // @ts-ignore: Not public API.
      } else if (definition.type && definition.type._fields) {
        // @ts-ignore: Not public API.
        definition = definition.type._fields[next];
      } else {
        // @ts-ignore: Incorrect `definition` type.
        definition = definition[next];
      }

      invariant(definition, 'Field not found in schema: "%s"', name);

      const isLast = array.length - 1 === index;
      if (isLast && !returnExtracted) {
        return definition;
      }

      const extracted = extractFromNonNull(definition);

      if (
        (isLast && returnExtracted) ||
        !graphql.isObjectType(extracted.type)
      ) {
        return extracted;
      }

      invariant(
        extracted.type.getFields,
        'Field not found in schema: "%s"',
        name,
      );

      return extracted.type.getFields();
    }, this.schema.getFields());
  }

  getInitialValue(name: string, props: Record<string, any> = {}): any {
    const type = this.getType(name);

    if (type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = (props.initialCount as number) || 0;

      return Array.from({ length: items }, () => item);
    }

    if (type === Object) {
      return {};
    }

    const defaultValue = this.getField(name).defaultValue;

    return defaultValue === undefined
      ? this.extras[name]?.initialValue
      : defaultValue;
  }

  // eslint-disable-next-line complexity
  getProps(nameNormal: string, props: Record<string, any> = {}) {
    const nameGeneric = nameNormal.replace(/\.\d+/g, '.$');

    const field = this.getField(nameGeneric, false);
    const fieldType = extractFromNonNull(field).type;

    const ready = {
      required: graphql.isNonNullType(field.type),
      ...this.extras[nameGeneric],
      ...this.extras[nameNormal],
    };

    if (graphql.isScalarType(fieldType) && fieldType.name === 'Float') {
      ready.decimal = true;
    }

    // @ts-ignore: `field.name` is not a string?
    ready.label = extractValue(ready.label, toHumanLabel(field.name));

    const options = props.options || ready.options;
    if (options) {
      if (!Array.isArray(options)) {
        ready.transform = (value: any) => options[value];
        ready.allowedValues = Object.keys(options);
      } else {
        ready.transform = (value: any) =>
          options.find(option => option.value === value).label;
        ready.allowedValues = options.map(option => option.value);
      }
    }

    return ready;
  }

  getSubfields(name?: string) {
    if (!name) {
      return Object.keys(this.schema.getFields());
    }

    const fieldType = this.getField(name).type;

    if (
      graphql.isObjectType(fieldType) ||
      graphql.isInputObjectType(fieldType)
    ) {
      return Object.keys(fieldType.getFields());
    }

    return [];
  }

  getType(name: string) {
    const fieldType = this.getField(name).type;

    if (graphql.isListType(fieldType)) return Array;
    if (graphql.isObjectType(fieldType)) return Object;
    if (graphql.isInputObjectType(fieldType)) return Object;
    if (graphql.isScalarType(fieldType)) {
      if (fieldType.name === 'ID') return String;
      if (fieldType.name === 'Int') return Number;
      if (fieldType.name === 'Float') return Number;
      if (fieldType.name === 'String') return String;
      if (fieldType.name === 'Boolean') return Boolean;
    }

    return fieldType;
  }

  getValidator(/* options */) {
    return this.validator;
  }
}
