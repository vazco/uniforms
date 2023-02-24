import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';
import SimpleSchema from 'simpl-schema';
import { Bridge, UnknownObject, joinName, Option } from 'uniforms';

const propsToRemove = ['optional', 'uniforms', 'allowedValues'];

function makeGeneric(name?: string): string | undefined {
  return name?.replace(/\.\d+(\.|$)/g, '.$$$1');
}

export default class SimpleSchema2Bridge extends Bridge {
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
    // @ts-expect-error: `messageForError` has incorrect typing.
    return !scopedError ? '' : this.schema.messageForError(scopedError);
  }

  // TODO: Get rid of this `any`.
  getErrorMessages(error: any) {
    if (!error) {
      return [];
    }

    const { details } = error;
    return Array.isArray(details)
      ? // @ts-expect-error: `messageForError` has incorrect typing.
        details.map(error => this.schema.messageForError(error))
      : [error.message || error];
  }

  getField(name: string) {
    const definition = this.schema.getDefinition(name);

    invariant(definition, 'Field not found in schema: "%s"', name);

    const merged = {
      ...definition,
      ...definition.type[0],
    };

    // aldeed/node-simple-schema#27
    if (
      merged.autoValue &&
      (merged.autoValue.name === 'defaultAutoValueFunction' ||
        merged.autoValue.toString().indexOf('$setOnInsert:') !== -1) // FIXME: Hack.
    ) {
      try {
        merged.defaultValue = merged.autoValue.call({ operator: null });
      } catch (_) {
        // It's fine.
      }
    }

    return merged;
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

    if (field.type === Object || field.type instanceof SimpleSchema) {
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

    if (fieldType === Number) {
      props.decimal = true;
    }

    type OptionList = Option<unknown>[];
    type Options = OptionList | (() => OptionList);
    let options: Options = props.options;
    let allowedValues: unknown[] | (() => unknown[]) = props.allowedValues;

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
    return this.schema.objectKeys(makeGeneric(name));
  }

  getType(name: string) {
    const type = this.getField(name).type;

    if (type === SimpleSchema.Integer) {
      return Number;
    }

    if (type instanceof SimpleSchema) {
      return Object;
    }

    return type;
  }

  // TODO: `ValidationOption` is not exported.
  getValidator(options: UnknownObject = { clean: true, mutate: true }) {
    const validator = this.schema.validator(options);
    return (model: UnknownObject) => {
      try {
        // Clean mutate its argument, even if mutate is false.
        validator(options.clean ? cloneDeep({ ...model }) : model);
        return null;
      } catch (error) {
        return error;
      }
    };
  }
}
