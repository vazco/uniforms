import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';
// @ts-ignore -- This package _is_ typed, but not in all environments.
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Bridge, UnknownObject, joinName } from 'uniforms';

const propsToRemove = ['optional', 'uniforms'];

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

    type OptionDict = Record<string, string>;
    type OptionList = { label: string; value: unknown }[];
    type Options = OptionDict | OptionList | (() => OptionDict | OptionList);
    let options: Options = props.options;
    if (options) {
      if (typeof options === 'function') {
        options = options();
      }

      if (Array.isArray(options)) {
        props.allowedValues = options.map(option => option.value);
        props.transform = (value: unknown) =>
          (options as OptionList).find(option => option.value === value)!.label;
      } else {
        props.allowedValues = Object.keys(options);
        props.transform = (value: string) => (options as OptionDict)[value];
      }
    } else if (fieldType === Array) {
      try {
        const itemProps = this.getProps(`${name}.$`);
        if (itemProps.allowedValues) {
          props.allowedValues = itemProps.allowedValues;
        }

        if (itemProps.transform) {
          props.transform = itemProps.transform;
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

    return props;
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
