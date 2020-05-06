import * as graphql from 'graphql';
import invariant from 'invariant';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import upperFirst from 'lodash/upperFirst';
import { Bridge, joinName } from 'uniforms';

const extractValue = (...xs) =>
  xs.reduce((x, y) =>
    x === false || x === null ? '' : x !== true && x !== undefined ? x : y,
  );

const extractFromNonNull = x =>
  x && x.type instanceof graphql.GraphQLNonNull
    ? { ...x, type: x.type.ofType }
    : x;

const toHumanLabel = (label: string): string => upperFirst(lowerCase(label));

export default class GraphQLBridge extends Bridge {
  extras: any;
  schema: any;
  validator: any;

  constructor(schema, validator, extras = {}) {
    super();

    this.extras = extras;
    this.schema = schema;
    this.validator = validator;

    // Memoize for performance and referential equality.
    this.getField = memoize(
      this.getField,
      (name, returnExtracted = true) => `${name}:${returnExtracted}`,
    );
    this.getSubfields = memoize(this.getSubfields);
    this.getType = memoize(this.getType);
  }

  // This bridge has 3 arguments, so it cannot be constructed implicite in the
  // createSchemaBridge.
  static check(/* schema */) {
    return false;
  }

  getError(name, error) {
    return (
      (error &&
        error.details &&
        error.details.find &&
        error.details.find(error => error.name === name)) ||
      null
    );
  }

  getErrorMessage(name, error) {
    const scopedError = this.getError(name, error);
    return !scopedError ? '' : scopedError.message;
  }

  getErrorMessages(error) {
    if (error) {
      if (Array.isArray(error.details)) {
        return error.details.map(error => error.message);
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

  getField(name, returnExtracted = true) {
    return joinName(null, name).reduce((definition, next, index, array) => {
      if (next === '$' || next === '' + parseInt(next, 10)) {
        invariant(
          definition.type instanceof graphql.GraphQLList,
          'Field not found in schema: "%s"',
          name,
        );
        definition = { type: extractFromNonNull(definition.type.ofType) };
      } else if (definition.type && definition.type._fields) {
        definition = definition.type._fields[next];
      } else {
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
        !(extracted.type instanceof graphql.GraphQLObjectType)
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

  getInitialValue(name, props: any = {}) {
    const type = this.getType(name);

    if (type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = props.initialCount || 0;

      return Array.from({ length: items }, () => item);
    }

    if (type === Object) {
      return {};
    }

    const defaultValue = this.getField(name).defaultValue;

    return defaultValue === undefined
      ? this.extras[name] && this.extras[name].initialValue
      : defaultValue;
  }

  // eslint-disable-next-line complexity
  getProps(nameNormal, props: any = {}) {
    const nameGeneric = nameNormal.replace(/\.\d+/g, '.$');

    const field = this.getField(nameGeneric, false);
    const fieldType = extractFromNonNull(field).type;

    const ready = {
      required: field.type instanceof graphql.GraphQLNonNull,
      ...this.extras[nameGeneric],
      ...this.extras[nameNormal],
    };

    if (
      fieldType instanceof graphql.GraphQLScalarType &&
      fieldType.name === 'Float'
    ) {
      ready.decimal = true;
    }

    ready.label = extractValue(ready.label, toHumanLabel(field.name));

    const options = props.options || ready.options;
    if (options) {
      if (!Array.isArray(options)) {
        ready.transform = value => options[value];
        ready.allowedValues = Object.keys(options);
      } else {
        ready.transform = value =>
          options.find(option => option.value === value).label;
        ready.allowedValues = options.map(option => option.value);
      }
    }

    return ready;
  }

  getSubfields(name) {
    if (!name) {
      return Object.keys(this.schema.getFields());
    }

    const fieldType = this.getField(name).type;

    if (
      fieldType instanceof graphql.GraphQLObjectType ||
      fieldType instanceof graphql.GraphQLInputObjectType
    ) {
      return Object.keys(fieldType.getFields());
    }

    return [];
  }

  getType(name) {
    const fieldType = this.getField(name).type;

    if (fieldType instanceof graphql.GraphQLList) return Array;
    if (fieldType instanceof graphql.GraphQLObjectType) return Object;
    if (fieldType instanceof graphql.GraphQLInputObjectType) return Object;
    if (fieldType instanceof graphql.GraphQLScalarType) {
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
