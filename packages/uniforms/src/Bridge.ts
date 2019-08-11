import invariant from 'invariant';

export default abstract class Bridge {
  constructor(...args: any[]) {
    invariant(
      this.constructor !== Bridge,
      'Bridge cannot be instantiated (args=%o).',
      { args }
    );
  }

  static check(schema: any) {
    invariant(
      false,
      '%s have not implemented `check` method (args=%o).',
      this.name,
      { schema }
    );
  }

  getError(name: string, error: any) {
    invariant(
      false,
      '%s have not implemented `getError` method (args=%o).',
      this.constructor.name,
      { name, error }
    );
  }

  getErrorMessage(name: string, error: any) {
    invariant(
      false,
      '%s have not implemented `getErrorMessage` method (args=%o).',
      this.constructor.name,
      { name, error }
    );
  }

  getErrorMessages(error: any) {
    invariant(
      false,
      '%s have not implemented `getErrorMessages` method (args=%o).',
      this.constructor.name,
      { error }
    );
  }

  getField(name: string) {
    invariant(
      false,
      '%s have not implemented `getField` method (args=%o).',
      this.constructor.name,
      { name }
    );
  }

  getInitialValue(name: string, props: {}) {
    invariant(
      false,
      '%s have not implemented `getInitialValue` method (args=%o).',
      this.constructor.name,
      { name, props }
    );
  }

  getProps(name: string, props: {}) {
    invariant(
      false,
      '%s have not implemented `getProps` method (args=%o).',
      this.constructor.name,
      { name, props }
    );
  }

  getSubfields(name: string) {
    invariant(
      false,
      '%s have not implemented `getSubfields` method (args=%o).',
      this.constructor.name,
      { name }
    );
  }

  getType(name: string) {
    invariant(
      false,
      '%s have not implemented `getType` method (args=%o).',
      this.constructor.name,
      { name }
    );
  }

  getValidator(options?: {}) {
    invariant(
      false,
      '%s have not implemented `getValidator` method (args=%o).',
      this.constructor.name,
      { options }
    );
  }
}
