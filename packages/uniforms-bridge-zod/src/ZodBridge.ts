import invariant from 'invariant';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import upperFirst from 'lodash/upperFirst';
import { Bridge, joinName } from 'uniforms';
import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodEnum,
  ZodError,
  ZodNativeEnum,
  ZodNumber,
  ZodNumberDef,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodType,
} from 'zod';

function fieldInvariant(name: string, condition: boolean): asserts condition {
  invariant(condition, 'Field not found in schema: "%s"', name);
}

function isNativeEnumValue(value: unknown) {
  return typeof value !== 'number';
}

export default class ZodBridge<T extends ZodRawShape> extends Bridge {
  constructor(public schema: ZodObject<T>) {
    super();

    this.getField = memoize(this.getField.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
  }

  getError(name: string, error: unknown) {
    if (!(error instanceof ZodError)) {
      return null;
    }

    return error.issues.find(issue => name === joinName(issue.path)) || null;
  }

  getErrorMessage(name: string, error: unknown) {
    return this.getError(name, error)?.message || '';
  }

  getErrorMessages(error: unknown) {
    if (error instanceof ZodError) {
      // TODO: There's no information which field caused which error. We could
      // do some generic prefixing, e.g., `{name}: {message}`.
      return error.issues.map(issue => issue.message);
    }

    if (error instanceof Error) {
      return [error.message];
    }

    return [];
  }

  getField(name: string) {
    let field: ZodType = this.schema;
    for (const key of joinName(null, name)) {
      if (field instanceof ZodDefault) {
        field = field.removeDefault();
      } else if (field instanceof ZodOptional) {
        field = field.unwrap();
      }

      if (key === '$' || key === '' + parseInt(key, 10)) {
        fieldInvariant(name, field instanceof ZodArray);
        field = field.element;
      } else {
        fieldInvariant(name, field instanceof ZodObject);
        field = field.shape[joinName.unescape(key)];
      }
    }

    return field;
  }

  // TODO: The `fieldProps` argument will be removed in v4. See
  // https://github.com/vazco/uniforms/issues/1048 for details.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getInitialValue(name: string, fieldProps?: Record<string, unknown>): unknown {
    const field = this.getField(name);
    if (field instanceof ZodArray) {
      const item = this.getInitialValue(joinName(name, '$'));
      if (item === undefined) {
        return [];
      }

      const length = field._def.minLength?.value || 0;
      return Array.from({ length }, () => item);
    }

    if (field instanceof ZodDefault) {
      return field._def.defaultValue();
    }

    if (field instanceof ZodEnum) {
      return field.options[0];
    }

    if (field instanceof ZodNativeEnum) {
      return Object.values(field.enum)[0];
    }

    if (field instanceof ZodObject) {
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

  // TODO: The `props` argument could be removed in v4, just like in the
  // `getInitialValue` function.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getProps(name: string, fieldProps?: Record<string, unknown>) {
    const props: Record<string, unknown> = {
      label: upperFirst(lowerCase(joinName(null, name).slice(-1)[0])),
      required: true,
    };

    let field = this.getField(name);
    if (field instanceof ZodDefault) {
      field = field.removeDefault();
      props.required = false;
    } else if (field instanceof ZodOptional) {
      field = field.unwrap();
      props.required = false;
    }

    if (field instanceof ZodArray) {
      if (field._def.maxLength) {
        props.maxCount = field._def.maxLength.value;
      }

      if (field._def.minLength) {
        props.minCount = field._def.minLength.value;
      }
    } else if (field instanceof ZodEnum) {
      props.allowedValues = field.options;
    } else if (field instanceof ZodNativeEnum) {
      // Native enums have both numeric and string values.
      props.allowedValues = Object.values(field.enum).filter(isNativeEnumValue);
    } else if (field instanceof ZodNumber) {
      if (!field.isInt) {
        props.decimal = true;
      }

      const max = field.maxValue;
      if (max !== null) {
        props.max = max;
      }

      const min = field.minValue;
      if (min !== null) {
        props.min = min;
      }

      // TODO: File an issue to expose a `.getStep` function.
      type ZodNumberCheck = ZodNumberDef['checks'][number];
      const step = field._def.checks.find(
        (check): check is Extract<ZodNumberCheck, { kind: 'multipleOf' }> =>
          check.kind === 'multipleOf',
      );
      if (step) {
        props.step = step.value;
      }
    }

    return props;
  }

  getSubfields(name = '') {
    let field = this.getField(name);
    if (field instanceof ZodDefault) {
      field = field.removeDefault();
    } else if (field instanceof ZodOptional) {
      field = field.unwrap();
    }

    if (field instanceof ZodArray) {
      return ['$'];
    }

    if (field instanceof ZodObject) {
      return Object.keys(field.shape);
    }

    return [];
  }

  getType(name: string) {
    let field = this.getField(name);
    if (field instanceof ZodDefault) {
      field = field.removeDefault();
    } else if (field instanceof ZodOptional) {
      field = field.unwrap();
    }

    if (field instanceof ZodArray) {
      return Array;
    }

    if (field instanceof ZodBoolean) {
      return Boolean;
    }

    if (field instanceof ZodDate) {
      return Date;
    }

    if (
      field instanceof ZodEnum ||
      field instanceof ZodNativeEnum ||
      field instanceof ZodString
    ) {
      return String;
    }

    if (field instanceof ZodNumber) {
      return Number;
    }

    if (field instanceof ZodObject) {
      return Object;
    }

    invariant(false, 'Field "%s" has an unknown type', name);
  }

  getValidator() {
    return (model: Record<string, unknown>) => {
      // TODO: What about async schemas?
      // eslint-disable-next-line react/no-this-in-sfc
      const result = this.schema.safeParse(model);
      return result.success ? null : result.error;
    };
  }
}
