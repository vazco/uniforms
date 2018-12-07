import invariant from 'invariant';

export default class Bridge {
  constructor() {
    invariant(this.constructor !== Bridge, 'Bridge cannot be instantiated.');
  }

  static check(/* schema */) {
    invariant(false, '%s have not implemented `check` method.', this.name);
  }

  getError(/* name, error */) {
    invariant(false, '%s have not implemented `getError` method.', this.constructor.name);
  }

  getErrorMessage(/* name, error */) {
    invariant(false, '%s have not implemented `getError` method.', this.constructor.name);
  }

  getErrorMessages(/* error */) {
    invariant(false, '%s have not implemented `getErrorMessages` method.', this.constructor.name);
  }

  getField(/* name */) {
    invariant(false, '%s have not implemented `getField` method.', this.constructor.name);
  }

  getInitialValue(/* name, props */) {
    invariant(false, '%s have not implemented `getInitialValue` method.', this.constructor.name);
  }

  getProps(/* name, props */) {
    invariant(false, '%s have not implemented `getProps` method.', this.constructor.name);
  }

  getSubfields(/* name */) {
    invariant(false, '%s have not implemented `getSubfields` method.', this.constructor.name);
  }

  getType(/* name */) {
    invariant(false, '%s have not implemented `getType` method.', this.constructor.name);
  }

  getValidator(/* options */) {
    invariant(false, '%s have not implemented `getValidator` method.', this.constructor.name);
  }
}
