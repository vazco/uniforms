import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';
import SimpleSchema from 'simpl-schema';
import { Bridge, joinName } from 'uniforms';

const propsToRemove = ['optional', 'uniforms'];

export default class SimpleSchema2Bridge extends Bridge {
  constructor(public schema: SimpleSchema) {
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
    // @ts-expect-error: `messageForError` has incorrect typing.
    return !scopedError ? '' : this.schema.messageForError(scopedError);
  }

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

  getInitialValue(name: string, props?: Record<string, any>): any {
    const field = this.getField(name);
    const defaultValue = field.defaultValue;
    if (defaultValue !== undefined) {
      return cloneDeep(defaultValue);
    }

    if (field.type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = Math.max(props?.initialCount || 0, field.minCount || 0);
      return Array.from({ length: items }, () => item);
    }

    if (field.type === Object || field.type instanceof SimpleSchema) {
      const value: Record<string, unknown> = {};
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

  // eslint-disable-next-line complexity
  getProps(name: string, fieldProps?: Record<string, any>) {
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

    type OptionDict = Record<string, string>;
    type OptionList = { label: string; value: unknown }[];
    type Options = OptionDict | OptionList | (() => OptionDict | OptionList);
    let options: Options = fieldProps?.options || props.options;
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
        const itemProps = this.getProps(`${name}.$`, fieldProps);
        if (itemProps.allowedValues && !fieldProps?.allowedValues) {
          props.allowedValues = itemProps.allowedValues;
        }

        if (itemProps.transform && !fieldProps?.transform) {
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
    // @ts-expect-error: Typing for `_makeGeneric` is missing.
    return this.schema.objectKeys(SimpleSchema._makeGeneric(name));
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
  getValidator(options: Record<string, any> = { clean: true, mutate: true }) {
    const validator = this.schema.validator(options);
    return (model: Record<string, any>) => {
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
