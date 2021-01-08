import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';
import SimpleSchema from 'simpl-schema';
import { Bridge, joinName } from 'uniforms';

export default class SimpleSchema2Bridge extends Bridge {
  constructor(public schema: SimpleSchema) {
    super();

    // Memoize for performance and referential equality.
    this.getField = memoize(this.getField);
    this.getSubfields = memoize(this.getSubfields);
    this.getType = memoize(this.getType);
  }

  getError(name: string, error: any) {
    // FIXME: Correct type for `error`.
    return error?.details?.find?.((error: any) => error.name === name) || null;
  }

  getErrorMessage(name: string, error: any) {
    const scopedError = this.getError(name, error);
    // @ts-ignore: `messageForError` has incorrect typing.
    return !scopedError ? '' : this.schema.messageForError(scopedError);
  }

  getErrorMessages(error: any) {
    if (error) {
      if (Array.isArray(error.details)) {
        // FIXME: Correct type for `error`.
        return (error.details as any[]).map(error =>
          // @ts-ignore: `messageForError` has incorrect typing.
          this.schema.messageForError(error),
        );
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
        /* ignore it */
      }
    }

    return merged;
  }

  getInitialValue(name: string, props: Record<string, any> = {}): any {
    const field = this.getField(name);

    if (field.type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = Math.max(props.initialCount || 0, field.minCount || 0);

      return Array.from({ length: items }, () => item);
    }

    if (field.type === Object || field.type instanceof SimpleSchema) {
      return {};
    }

    return field.defaultValue;
  }

  // eslint-disable-next-line complexity
  getProps(name: string, props: Record<string, any> = {}) {
    const { optional, type, uniforms, ...contextField } = this.getField(name);
    let field = { ...contextField, required: !optional };

    if (uniforms) {
      if (typeof uniforms === 'string' || typeof uniforms === 'function') {
        field = { ...field, component: uniforms };
      } else {
        field = { ...field, ...uniforms };
      }
    }

    if (type === Array) {
      try {
        const itemProps = this.getProps(`${name}.$`, props);
        if (itemProps.allowedValues && !props.allowedValues) {
          field.allowedValues = itemProps.allowedValues;
        }

        if (itemProps.transform && !props.transform) {
          field.transform = itemProps.transform;
        }
      } catch (_) {
        /* ignore it */
      }
    } else if (type === Number) {
      field = { ...field, decimal: true };
    }

    let options = props.options || field.options;
    if (options) {
      if (typeof options === 'function') {
        options = options();
      }

      if (!Array.isArray(options)) {
        field = {
          ...field,
          transform: (value: any) => options[value],
          allowedValues: Object.keys(options),
        };
      } else {
        field = {
          ...field,
          transform: (value: any) =>
            (options as any[]).find(option => option.value === value).label,
          allowedValues: options.map(option => option.value),
        };
      }
    }

    return field;
  }

  getSubfields(name?: string) {
    // @ts-ignore: Typing for `_makeGeneric` is missing.
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
