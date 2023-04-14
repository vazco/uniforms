import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';
// @ts-ignore -- This package _is_ typed, but not in all environments.
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Bridge, UnknownObject, joinName } from 'uniforms';

const propsToRemove = ['optional', 'uniforms', 'allowedValues'];

/** Option type used in SelectField or RadioField */
type Option<Value> = {
  disabled?: boolean;
  label: string;
  key?: string;
  value: Value;
};

export default class SimpleSchemaBridge extends Bridge {
  constructor(public schema: SimpleSchema) {
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
    return !scopedError
      ? ''
      : this.schema.messageForError(
          scopedError.type,
          scopedError.name,
          null,
          scopedError.details && scopedError.details.value,
        );
  }

  // TODO: Get rid of this `any`.
  getErrorMessages(error: any) {
    if (!error) {
      return [];
    }

    const { details } = error;
    return Array.isArray(details)
      ? details.map(error =>
          this.schema.messageForError(
            error.type,
            error.name,
            null,
            error.details && error.details.value,
          ),
        )
      : [error.message || error];
  }

  getField(name: string) {
    const definition = this.schema.getDefinition(name);

    invariant(definition, 'Field not found in schema: "%s"', name);

    return definition;
  }

  getInitialValue(name: string): unknown {
    const field = this.getField(name);
    const defaultValue = field.defaultValue;
    if (defaultValue !== undefined) {
      return cloneDeep(defaultValue);
    }

    if (field.type === Array) {
      const item = this.getInitialValue(joinName(name, '$'));
      if (item === undefined) {
        return [];
      }

      const length = field.minCount || 0;
      return Array.from({ length }, () => item);
    }

    if (field.type === Object) {
      const value: UnknownObject = {};
      this.getSubfields(name).forEach(key => {
        const initialValue = this.getInitialValue(joinName(name, key));
        if (initialValue !== undefined) {
          value[key] = initialValue;
        }
      });
      return value;
    }

    return undefined;
  }

  private allowedValueToOption = <T>(value: T): Option<T> => ({
    key: String(value),
    label: String(value),
    value,
  });

  getProps(name: string) {
    const { type: fieldType, ...props } = this.getField(name);
    props.required = !props.optional;

    if (
      typeof props.uniforms === 'function' ||
      typeof props.uniforms === 'string'
    ) {
      props.component = props.uniforms;
    } else {
      Object.assign(props, props.uniforms);
    }

    type OptionList = Option<unknown>[];
    type Options = OptionList | (() => OptionList);
    let options: Options | undefined = props.options;
    let allowedValues: unknown[] | (() => unknown[]) | undefined =
      props.allowedValues;

    if (typeof options === 'function') {
      options = options();
    }

    if (!options && typeof allowedValues === 'function') {
      allowedValues = allowedValues();
    }

    if (!options && Array.isArray(allowedValues)) {
      options = allowedValues.map(this.allowedValueToOption);
    } else if (fieldType === Array) {
      try {
        const itemProps = this.getProps(`${name}.$`);
        if (itemProps.options) {
          options = itemProps.options as OptionList;
        }
      } catch (_) {
        // It's fine.
      }
    }

    propsToRemove.forEach(key => {
      if (key in props) {
        delete props[key];
      }
    });

    return Object.assign(props, { options });
  }

  getSubfields(name?: string): string[] {
    return this.schema.objectKeys(SimpleSchema._makeGeneric(name));
  }

  getType(name: string) {
    return this.getField(name).type;
  }

  getValidator(options: UnknownObject = { clean: true }) {
    const validator = this.schema.validator(options);
    return (model: any) => {
      try {
        // Clean mutate its argument.
        validator(options.clean ? cloneDeep({ ...model }) : model);
        return null;
      } catch (error) {
        return error;
      }
    };
  }
}
