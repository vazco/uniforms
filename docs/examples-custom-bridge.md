---
id: examples-custom-bridge
title: Custom bridge
---

In this example we will create a custom bridge used in user login form.

### UserLoginSchema definition

First we define our data schema:

```js
const UserLoginSchema = {
  login: {
    __type__: String,
    required: true,
    initialValue: '',
    label: 'Login'
  },
  password1: {
    __type__: String,
    required: true,
    initialValue: '',
    label: 'Password'
  },
  password2: {
    __type__: String,
    required: true,
    initialValue: '',
    label: 'Password (again)'
  }
};

export default UserLoginSchema;
```

### UserLoginSchemaValidator definiton

Now that there is a schema, we can write our own validator:

```js
const UserLoginSchemaValidator = model => {
  const error = {};

  if (!model.login) {
    error.login = 'Login is required!';
  } else if (model.login.length < 5) {
    error.login = 'Login has to be at least 5 characters long!';
  }

  if (!model.password1) {
    error.password1 = 'Password is required!';
  } else if (model.password1.length < 10) {
    error.login = 'Password has to be at least 10 characters long!';
  }

  if (model.password1 !== model.password2) {
    error.password1 = 'Passwords mismatch!';
  }

  if (Object.keys(error).length) {
    throw error;
  }
};

export default UserLoginSchemaValidator;
```

### Extended uniforms `Bridge` class

When have both the schema and the validator, we can extend and implement the core `Bridge` class and create our own instance:

```js
import Bridge from 'uniforms/Bridge';

export default class UserLoginSchemaBridge extends Bridge {
  constructor(schema, validator) {
    super();

    this.schema = schema;
    this.validator = validator;
  }

  getError(name, error) {
    return error && error[name];
  }

  getErrorMessage(name, error) {
    return error && error[name];
  }

  getErrorMessages(error) {
    return error ? Object.keys(this.schema).map(field => error[field]) : [];
  }

  getField(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getType(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')].__type__;
  }

  getProps(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getInitialValue(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')].initialValue;
  }

  getSubfields(name) {
    return name
      ? this.schema[name.replace(/\.\d+/g, '.$')].subfields || []
      : Object.keys(this.schema).filter(field => field.indexOf('.') === -1);
  }

  getValidator() {
    return this.validator;
  }
}
```

### Usage

```js
import UserLoginSchema from './UserLoginSchema';
import UserLoginSchemaBridge from './UserLoginSchemaBridge;
import UserLoginSchemaValidator from './UserLoginSchemaValidator';

const bridge = new UserLoginSchemaBridge(UserLoginSchema, UserLoginSchemaValidator);

<AutoForm schema={bridge} />;
```
