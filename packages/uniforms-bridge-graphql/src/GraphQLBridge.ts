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
import { Bridge, UnknownObject, joinName } from 'uniforms';

function fieldInvariant(name: string, condition: boolean): asserts condition {
  invariant(condition, 'Field not found in schema: "%s"', name);
}

/** Option type used in SelectField or RadioField */
type Option<Value> = {
  disabled?: boolean;
  label: string;
  key?: string;
  value: Value;
};

export default class GraphQLBridge extends Bridge {
  constructor(
    public schema: GraphQLType,
    public validator: (model: UnknownObject) => unknown,
    public extras: UnknownObject = {},
  ) {
    super();

    // Memoize for performance and referential equality.
    this.getField = memoize(this.getField.bind(this));
    this.getInitialValue = memoize(this.getInitialValue.bind(this));
    this.getProps = memoize(this.getProps.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
    this.getType = memoize(this.getType.bind(this));
  }

  // TODO: Get rid of this `any`.
  getError(name: string, error: any) {
    const details = error?.details;
    if (!Array.isArray(details)) {
      return null;
    }

    return details.find(error => error.name === name) || null;
  }

  // TODO: Get rid of this `any`.
  getErrorMessage(name: string, error: any) {
    const scopedError = this.getError(name, error);
    return scopedError?.message || '';
  }

  // TODO: Get rid of this `any`.
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

  getInitialValue(name: string): unknown {
    const type = this.getType(name);

    if (type === Array) {
      return [];
    }

    if (type === Object) {
      const value: UnknownObject = {};
      this.getSubfields(name).forEach(key => {
        const initialValue = this.getInitialValue(joinName(name, key));
        if (initialValue !== undefined) {
          value[key] = initialValue;
        }
      });
      return value;
    }

    const { defaultValue } = this.getField(name);
    // @ts-expect-error The `extras` should be typed more precisely.
    return defaultValue ?? this.extras[name]?.initialValue;
  }

  getProps(nameNormal: string) {
    const nameGeneric = nameNormal.replace(/\.\d+/g, '.$');

    const field = this.getField(nameGeneric);
    const props = {
      required: isNonNullType(field.type),
      // @ts-expect-error The `extras` should be typed more precisely.
      ...this.extras[nameGeneric],
      ...this.extras[nameNormal],
    };

    const fieldType = getNullableType(field.type);
    if (isScalarType(fieldType) && fieldType.name === 'Float') {
      props.decimal = true;
    }

    props.label ??= upperFirst(lowerCase(field.name));

    type OptionDict = Record<string, unknown>;
    type OptionList = Option<unknown>[];
    type Options = OptionDict | OptionList;
    let options: Options = props.options;
    if (options) {
      if (!Array.isArray(options)) {
        options = Object.entries(options).map(([key, value]) => ({
          key,
          label: key,
          value,
        }));
      }
    } else if (isEnumType(fieldType)) {
      const values = fieldType.getValues();
      options = values.map(option => ({
        label: option.name,
        value: option.value,
      }));
    }

    return Object.assign(props, { options });
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
