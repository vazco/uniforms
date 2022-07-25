import {
  GraphQLInputField,
  GraphQLType,
  getNullableType,
  isEnumType,
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

function fieldInvariant(name: string, condition: boolean): asserts condition {
  invariant(condition, 'Field not found in schema: "%s"', name);
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
    const details = error?.details;
    if (!Array.isArray(details)) {
      return null;
    }

    return details.find(error => error.name === name) || null;
  }

  getErrorMessage(name: string, error: any) {
    const scopedError = this.getError(name, error);
    return scopedError?.message || '';
  }

  getErrorMessages(error: any) {
    if (!error) {
      return [];
    }

    const { details } = error;
    return Array.isArray(details)
      ? details.map(error => error.message)
      : [error.message || error];
  }

  getField(name: string) {
    return joinName(null, name).reduce(
      (field, namePart) => {
        const fieldType = getNullableType(field.type);

        if (namePart === '$' || namePart === '' + parseInt(namePart, 10)) {
          fieldInvariant(name, isListType(fieldType));
          return { ...field, type: fieldType.ofType };
        }

        if (isInputObjectType(fieldType) || isObjectType(fieldType)) {
          const fields = fieldType.getFields();
          fieldInvariant(name, namePart in fields);
          return fields[namePart] as GraphQLInputField;
        }

        fieldInvariant(name, false);
      },
      { name: '', type: this.schema } as GraphQLInputField,
    );
  }

  getInitialValue(name: string, props?: Record<string, any>): any {
    const type = this.getType(name);

    if (type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = props?.initialCount || 0;
      return Array.from({ length: items }, () => item);
    }

    if (type === Object) {
      const value: Record<string, unknown> = {};
      this.getSubfields(name).forEach(key => {
        const initialValue = this.getInitialValue(joinName(name, key));
        if (initialValue !== undefined) {
          value[key] = initialValue;
        }
      });
      return value;
    }

    const { defaultValue } = this.getField(name);
    return defaultValue ?? this.extras[name]?.initialValue;
  }

  getProps(nameNormal: string, fieldProps?: Record<string, any>) {
    const nameGeneric = nameNormal.replace(/\.\d+/g, '.$');

    const field = this.getField(nameGeneric);
    const props = {
      required: isNonNullType(field.type),
      ...this.extras[nameGeneric],
      ...this.extras[nameNormal],
    };

    const fieldType = getNullableType(field.type);
    if (isScalarType(fieldType) && fieldType.name === 'Float') {
      props.decimal = true;
    }

    props.label ??= upperFirst(lowerCase(field.name));

    type OptionDict = Record<string, string>;
    type OptionList = { label: string; value: unknown }[];
    type Options = OptionDict | OptionList;
    const options: Options = fieldProps?.options || props.options;
    if (options) {
      if (Array.isArray(options)) {
        props.allowedValues = options.map(option => option.value);
        props.transform = (value: unknown) =>
          options.find(option => option.value === value)!.label;
      } else {
        props.allowedValues = Object.keys(options);
        props.transform = (value: string) => options[value];
      }
    } else if (isEnumType(fieldType)) {
      const values = fieldType.getValues();
      props.allowedValues = values.map(option => option.value);
      props.transform = (value: unknown) =>
        values.find(searchValue => searchValue.value === value)!.name;
    }

    return props;
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
