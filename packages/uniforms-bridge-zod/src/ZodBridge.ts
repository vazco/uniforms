import invariant from 'invariant';
import memoize from 'lodash/memoize';
import { Bridge, joinName } from 'uniforms';
import { ZodArray, ZodObject, ZodRawShape, ZodType } from 'zod';

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
}
