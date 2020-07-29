import invariant from 'invariant';

// There is no standarized error format. While creating a custom bridge, one can
// come up with an own error format, returned from validator and later analyzed
// in `getError*` methods.
type Error = any;

// There is no standarized field format. Most bridges use it as a common object,
// used in calculation of initial values, props, and types.
type Field = any;

// There is no standarized field type format. However, `AutoField` component
// will work correctly only with standard JavaScript constructors, like `String`
// or `Number`.
type FieldType = any;

export abstract class Bridge {
  // Each bridge can have a different set of parameters.
  constructor(...args: any[]) {
    invariant(
      this.constructor !== Bridge,
      'Bridge cannot be instantiated (args=%o).',
      { args },
    );
  }

  // Get an error for field `name` out of `error`. There is no standarized
  // format, but fields treat truthy values as a sign of being invalid. Fields
  // receive this as a `error` guaranteed prop.
  getError(name: string, error: Error): Error {
    return invariant(
      false,
      '%s have not implemented `getError` method (args=%o).',
      this.constructor.name,
      { name, error },
    );
  }

  // Get an error message for field `name` out of `error`. If there is no error,
  // return an empty string. Fields receive this as a `errorMessage` guaranteed
  // prop.
  getErrorMessage(name: string, error: Error): string {
    return invariant(
      false,
      '%s have not implemented `getErrorMessage` method (args=%o).',
      this.constructor.name,
      { name, error },
    );
  }

  // Get all error messages from `error`. Only `ErrorsField` make use of that
  // (in builtin themes).
  getErrorMessages(error: Error): string[] {
    return invariant(
      false,
      '%s have not implemented `getErrorMessages` method (args=%o).',
      this.constructor.name,
      { error },
    );
  }

  // Get internal field definition for field `name`. Fields receive this as a
  // `field` guaranteed prop.
  getField(name: string): Field {
    return invariant(
      false,
      '%s have not implemented `getField` method (args=%o).',
      this.constructor.name,
      { name },
    );
  }

  // Get initial value of field `name`. It is used as a default when no value is
  // set (e.g. the form is rendered with an empty `model`). Additionally,
  // `props` are this field instance props. If a field is rendered multiple
  // times, this function will be called multiple times, possibly with different
  // `props`.
  getInitialValue(name: string, props: Record<string, any>): any {
    return invariant(
      false,
      '%s have not implemented `getInitialValue` method (args=%o).',
      this.constructor.name,
      { name, props },
    );
  }

  // Get props defined in schema for a field `name`. There are no required nor
  // banned fields, however properties like `required` are often available.
  // Additionally, `props` are this field instance props. If a field is rendered
  // multiple times, this function will be called multiple times, possibly with
  // different `props`.
  getProps(name: string, props: Record<string, any>): Record<string, any> {
    return invariant(
      false,
      '%s have not implemented `getProps` method (args=%o).',
      this.constructor.name,
      { name, props },
    );
  }

  // Get a list of subfields of field `name` or top-level fields, if no `name`
  // is passed.
  getSubfields(name?: string): string[] {
    return invariant(
      false,
      '%s have not implemented `getSubfields` method (args=%o).',
      this.constructor.name,
      { name },
    );
  }

  // Get a type of field `name`. See `FieldTypeType` for details.
  getType(name: string): FieldType {
    return invariant(
      false,
      '%s have not implemented `getType` method (args=%o).',
      this.constructor.name,
      { name },
    );
  }

  // Get a validator function. The `options` here are from the `validator` prop
  // of the form. A validator function receives a model and returns an error or
  // a promise that will resolve (not reject!) with an error. If there is no
  // error, return (or resolve with) a `null` value instead.
  // eslint-disable-next-line prettier/prettier
  getValidator(options?: any): (model: Record<string, any>) => null | Error | Promise<null | Error> {
    return invariant(
      false,
      '%s have not implemented `getValidator` method (args=%o).',
      this.constructor.name,
      { options },
    );
  }
}
