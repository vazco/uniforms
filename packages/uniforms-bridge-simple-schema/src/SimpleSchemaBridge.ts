import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';
// @ts-ignore
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Bridge, joinName } from 'uniforms';

export default class SimpleSchemaBridge extends Bridge {
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
    return !scopedError
      ? ''
      : this.schema.messageForError(
          scopedError.type,
          scopedError.name,
          null,
          scopedError.details && scopedError.details.value,
        );
  }

  getErrorMessages(error: any) {
    if (error) {
      if (Array.isArray(error.details)) {
        // FIXME: Correct type for `error`.
        return (error.details as any[]).map(error =>
          this.schema.messageForError(
            error.type,
            error.name,
            null,
            error.details && error.details.value,
          ),
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

    return definition;
  }

  getInitialValue(name: string, props: Record<string, any> = {}): any {
    const field = this.getField(name);

    if (field.type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = Math.max(props.initialCount || 0, field.minCount || 0);

      return Array.from({ length: items }, () => item);
    }

    if (field.type === Object) {
      return {};
    }

    return field.defaultValue;
  }

  // eslint-disable-next-line complexity
  getProps(name: string, props: Record<string, any> = {}) {
    // eslint-disable-next-line prefer-const
    let { optional, type, uniforms, ...field } = this.getField(name);

    field = { ...field, required: !optional };

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
    return this.schema.objectKeys(SimpleSchema._makeGeneric(name));
  }

  getType(name: string) {
    return this.getField(name).type;
  }

  getValidator(options: Record<string, any> = { clean: true }) {
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
