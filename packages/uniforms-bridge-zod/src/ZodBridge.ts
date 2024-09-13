import invariant from 'invariant';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import upperFirst from 'lodash/upperFirst';
import { Bridge, UnknownObject, joinName } from 'uniforms';
import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodError,
  ZodIssue,
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
  return typeof value !== 'string';
}

function getLabel(value: unknown) {
  return upperFirst(lowerCase(joinName(null, value).slice(-1)[0]));
}

function getFullLabel(path: ZodIssue['path'], indexes: number[] = []): string {
  const lastElement = path[path.length - 1];

  if (typeof lastElement === 'number') {
    const slicedPath = path.slice(0, path.length - 1);
    return getFullLabel(slicedPath, [lastElement, ...indexes]);
  }

  return indexes.length > 0
    ? `${getLabel(path)} (${indexes.join(', ')})`
    : getLabel(path);
}

/** Option type used in SelectField or RadioField */
type Option<Value> = {
  disabled?: boolean;
  label?: string;
  key?: string;
  value: Value;
};

export default class ZodBridge<T extends ZodRawShape> extends Bridge {
  schema: ZodObject<T> | ZodEffects<ZodObject<T>>;
  provideDefaultLabelFromFieldName: boolean;

  constructor({
    schema,
    provideDefaultLabelFromFieldName = true,
  }: {
    schema: ZodObject<T> | ZodEffects<ZodObject<T>>;
    provideDefaultLabelFromFieldName?: boolean;
  }) {
    super();

    this.schema = schema;
    this.provideDefaultLabelFromFieldName = provideDefaultLabelFromFieldName;
    // Memoize for performance and referential equality.
    this.getField = memoize(this.getField.bind(this));
    this.getInitialValue = memoize(this.getInitialValue.bind(this));
    this.getProps = memoize(this.getProps.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
    this.getType = memoize(this.getType.bind(this));
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
      return error.issues.map(issue => {
        const name = getFullLabel(issue.path);
        return `${name}: ${issue.message}`;
      });
    }

    if (error instanceof Error) {
      return [error.message];
    }

    return [];
  }

  getField(name: string) {
    let field: ZodType = this.schema;

    if (this.schema instanceof ZodEffects) {
      field = this.schema._def.schema;
    }

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

  getInitialValue(name: string): unknown {
    let field = this.getField(name);

    if (field instanceof ZodOptional) {
      field = field.unwrap();
    }

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
      const values = Object.values(field.enum as Record<string, unknown>);
      return values.find(isNativeEnumValue) ?? values[0];
    }

    if (field instanceof ZodObject) {
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

  // eslint-disable-next-line complexity
  getProps(name: string) {
    const props: UnknownObject & { options?: Option<unknown>[] } = {
      ...(this.provideDefaultLabelFromFieldName && {
        label: getLabel(name),
      }),
      required: true,
    };

    let field = this.getField(name);

    const uniforms = field._uniforms;
    if (typeof uniforms === 'function') {
      props.component = uniforms;
    } else {
      Object.assign(props, uniforms);
    }

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
      props.options = (field.options as ZodEnum<[string]>['options']).map(
        value => ({ value }),
      );
    } else if (field instanceof ZodNativeEnum) {
      const values = Object.values(field.enum as Record<string, unknown>);
      const nativeValues = values.filter(isNativeEnumValue);
      props.options = (nativeValues.length ? nativeValues : values).map(
        value => ({ value }),
      );
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
      return Object.keys(field.shape as Record<string, unknown>);
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

    if (field instanceof ZodEnum || field instanceof ZodString) {
      return String;
    }

    if (field instanceof ZodNativeEnum) {
      const values = Object.values(field.enum as Record<string, unknown>);
      return typeof values.find(isNativeEnumValue) === 'number'
        ? Number
        : String;
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
    return (model: UnknownObject) => {
      // TODO: What about async schemas?

      const result = this.schema.safeParse(model);
      return result.success ? null : result.error;
    };
  }
}
