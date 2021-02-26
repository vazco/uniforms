import {
  GraphQLInputField,
  GraphQLType,
  getNullableType,
  isInputObjectType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
} from 'graphql/type/definition';
import invariant from 'invariant';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import upperFirst from 'lodash/upperFirst';
import { Bridge, joinName } from 'uniforms';

function extractValue(x: boolean | null | string | undefined, y: string) {
  return x === false || x === null ? '' : x !== true && x !== undefined ? x : y;
}

function toHumanLabel(label: string) {
  return upperFirst(lowerCase(label));
}

export default class GraphQLBridge extends Bridge {
  constructor(
    public schema: GraphQLType,
    public validator: (model: Record<string, any>) => any,
    public extras: Record<string, any> = {},
  ) {
    super();

    // Memoize for performance and referential equality.
    this.getField = memoize(this.getField.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
    this.getType = memoize(this.getType.bind(this));
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

  getField(name: string) {
    const root = { name: '', type: this.schema } as GraphQLInputField;

    return joinName(null, name).reduce((field, namePart) => {
      const fieldType = getNullableType(field.type);

      if (namePart === '$' || namePart === '' + parseInt(namePart, 10)) {
        invariant(
          isListType(fieldType),
          'Field not found in schema: "%s"',
          name,
        );

        return { ...field, type: fieldType.ofType };
      }

      if (isInputObjectType(fieldType) || isObjectType(fieldType)) {
        const fields = fieldType.getFields();
        invariant(namePart in fields, 'Field not found in schema: "%s"', name);
        return fields[namePart] as GraphQLInputField;
      }

      invariant(false, 'Field not found in schema: "%s"', name);
    }, root);
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

    const { defaultValue } = this.getField(name);
    return defaultValue ?? this.extras[name]?.initialValue;
  }

  getProps(nameNormal: string, props: Record<string, any> = {}) {
    const nameGeneric = nameNormal.replace(/\.\d+/g, '.$');

    const { name, type } = this.getField(nameGeneric);
    const result = {
      required: isNonNullType(type),
      ...this.extras[nameGeneric],
      ...this.extras[nameNormal],
    };

    const fieldType = getNullableType(type);
    if (isScalarType(fieldType) && fieldType.name === 'Float') {
      result.decimal = true;
    }

    result.label = extractValue(result.label, toHumanLabel(name));

    const options = props.options || result.options;
    if (options) {
      if (!Array.isArray(options)) {
        result.transform = (value: any) => options[value];
        result.allowedValues = Object.keys(options);
      } else {
        result.transform = (value: any) =>
          options.find(option => option.value === value).label;
        result.allowedValues = options.map(option => option.value);
      }
    }

    return result;
  }

  getSubfields(name = '') {
    const type = getNullableType(this.getField(name).type);
    return isInputObjectType(type) || isObjectType(type)
      ? Object.keys(type.getFields())
      : [];
  }

  getType(name: string) {
    const type = getNullableType(this.getField(name).type);

    if (isInputObjectType(type) || isObjectType(type)) {
      return Object;
    }
    if (isListType(type)) {
      return Array;
    }
    if (isScalarType(type)) {
      if (type.name === 'Boolean') {
        return Boolean;
      }
      if (type.name === 'Float') {
        return Number;
      }
      if (type.name === 'ID') {
        return String;
      }
      if (type.name === 'Int') {
        return Number;
      }
      if (type.name === 'String') {
        return String;
      }
    }

    return type;
  }

  getValidator(/* options */) {
    return this.validator;
  }
}
