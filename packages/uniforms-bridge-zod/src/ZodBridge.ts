import memoize from 'lodash/memoize';
import { Bridge } from 'uniforms';
import { ZodObject, ZodRawShape } from 'zod';

export default class ZodBridge<T extends ZodRawShape> extends Bridge {
  constructor(public schema: ZodObject<T>) {
    super();

    this.getSubfields = memoize(this.getSubfields.bind(this));
  }

  getSubfields(name?: string): string[] {
    if (name === undefined) {
      return Object.keys(this.schema.shape);
    }

    // TODO.
    return [];
  }
}
