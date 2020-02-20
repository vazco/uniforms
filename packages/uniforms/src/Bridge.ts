import invariant from 'invariant';

type UnknownObject = Record<string, unknown>;

export default abstract class Bridge {
  constructor(...args: unknown[]) {
    invariant(
      this.constructor !== Bridge,
      'Bridge cannot be instantiated (args=%o).',
      { args },
    );
  }

  static check(schema: unknown): boolean {
    return invariant(
      false,
      '%s have not implemented `check` method (args=%o).',
      this.name,
      { schema },
    );
  }

  getError(name: string, error: unknown): unknown {
    return invariant(
      false,
      '%s have not implemented `getError` method (args=%o).',
      this.constructor.name,
      { name, error },
    );
  }

  getErrorMessage(name: string, error: unknown): string | void {
    return invariant(
      false,
      '%s have not implemented `getErrorMessage` method (args=%o).',
      this.constructor.name,
      { name, error },
    );
  }

  getErrorMessages(error: unknown): string[] {
    return invariant(
      false,
      '%s have not implemented `getErrorMessages` method (args=%o).',
      this.constructor.name,
      { error },
    );
  }

  getField(name: string): unknown {
    return invariant(
      false,
      '%s have not implemented `getField` method (args=%o).',
      this.constructor.name,
      { name },
    );
  }

  getInitialValue(name: string, props: UnknownObject): unknown {
    return invariant(
      false,
      '%s have not implemented `getInitialValue` method (args=%o).',
      this.constructor.name,
      { name, props },
    );
  }

  getProps(name: string, props: UnknownObject): UnknownObject {
    return invariant(
      false,
      '%s have not implemented `getProps` method (args=%o).',
      this.constructor.name,
      { name, props },
    );
  }

  getSubfields(name?: string): string[] {
    return invariant(
      false,
      '%s have not implemented `getSubfields` method (args=%o).',
      this.constructor.name,
      { name },
    );
  }

  getType(name: string): unknown {
    return invariant(
      false,
      '%s have not implemented `getType` method (args=%o).',
      this.constructor.name,
      { name },
    );
  }

  getValidator(options?: unknown): (model: UnknownObject) => void {
    return invariant(
      false,
      '%s have not implemented `getValidator` method (args=%o).',
      this.constructor.name,
      { options },
    );
  }
}
