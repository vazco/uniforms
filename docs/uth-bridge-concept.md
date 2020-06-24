---
id: 'uth-bridge-concept'
title: 'Bridge concept'
---

To make use of any schema, uniforms have to create a _bridge_ of it - a unified schema mapper. A bridge is (preferably) a subclass of `Bridge`, implementing static `check(schema)` method and these instance methods:

- `getError(name, error)`
- `getErrorMessage(name, error)`
- `getErrorMessages(error)`
- `getField(name)`
- `getInitialValue(name, props)`
- `getProps(name, props)`
- `getSubfields(name)`
- `getType(name)`
- `getValidator(options)`

Bridge is a kind of abstract class, which should be extended to create custom bridges.
It implements all of the required methods and throws an error with meaningful "method not implemented" error.

```js
import { Bridge } from 'uniforms';

class CustomBridge extends Bridge {
  // Check, if this bridge is compatibile with given schema.
  static check(schema) {
    /* ... */
  }

  // Field's scoped error.
  getError(name, error) {
    /* ... */
  }

  // Field's scoped error message.
  getErrorMessage(name, error) {
    /* ... */
  }

  // All error messages from error.
  getErrorMessages(error) {
    /* ... */
  }

  // Field's definition (`field` prop).
  getField(name) {
    /* ... */
  }

  // Field's initial value.
  getInitialValue(name) {
    /* ... */
  }

  // Field's props.
  getProps(name) {
    /* ... */
  }

  // Field's subfields (or first-level fields).
  getSubfields(name) {
    /* ... */
  }

  // Field's type (ex. Number, String).
  getType(name) {
    /* ... */
  }

  // Function with one argument - model - which return errors when model is
  // invalid.
  getValidator(options) {
    /* ... */
  }
}
```
