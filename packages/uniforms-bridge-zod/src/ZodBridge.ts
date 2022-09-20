import invariant from 'invariant';
import memoize from 'lodash/memoize';
import { Bridge, joinName } from 'uniforms';
import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodObject,
  ZodRawShape,
  ZodString,
  ZodType,
} from 'zod';

function fieldInvariant(name: string, condition: boolean): asserts condition {
  invariant(condition, 'Field not found in schema: "%s"', name);
}

export default class ZodBridge<T extends ZodRawShape> extends Bridge {
  constructor(public schema: ZodObject<T>) {
    super();

    this.getField = memoize(this.getField.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
  }

  getField(name: string) {
    let field: ZodType = this.schema;
    for (const key of joinName(null, name)) {
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

  getSubfields(name = '') {
    const field = this.getField(name);
    if (field instanceof ZodArray) {
      return ['$'];
    }

    if (field instanceof ZodObject) {
      return Object.keys(field.shape);
    }

    return [];
  }

  getType(name: string) {
    const field = this.getField(name);
    if (field instanceof ZodArray) {
      return Array;
    }

    if (field instanceof ZodBoolean) {
      return Boolean;
    }

    if (field instanceof ZodDate) {
      return Date;
    }

    if (field instanceof ZodNumber) {
      return Number;
    }

    if (field instanceof ZodObject) {
      return Object;
    }

    if (field instanceof ZodString) {
      return String;
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
