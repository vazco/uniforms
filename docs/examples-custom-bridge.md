---
id: examples-custom-bridge
title: Custom bridge & validator
---

In this example, we will create an ordinary login form, with login, password, and password confirmation fields.

### Schema definition

We'll start with defining a schema.
It's an object with three keys, representing our fields.
Each of them has the following self-explanatory properties:

- `__type__`
- `required`
- `initialValue`
- `label`

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

### Validator definition

When the schema is ready, our next step is to provide a way to check if the values received from our form are correct.
In order to do so, we prepare a validation function.
That function, called validator, takes a model (the submitted object) as input and throws an error whether any value doesn't meet given criteria.

In our case we say 'form is invalid' when there's no login or password at all,
login has less then 5 characters, password has lass then 10 characters or given passwords mismatch:

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
    return error;
  }
};

export default UserLoginSchemaValidator;
```

### The Bridge!

Now that both have the schema and the validator, we can define our bridge, which will be a binder between the form and the data itself.
All we have to do is to extend `Bridge` class and implement its methods according to the [Bridge concept](/docs/uth-bridge-concept):

```js
import { Bridge } from 'uniforms';

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

After our custom bridge is created, we can use in the very same way as we would use predefined one -
we have to supply the schema and validator and then we can take an advantage of it in the AutoForm:

```js
import UserLoginSchema from './UserLoginSchema';
import UserLoginSchemaBridge from './UserLoginSchemaBridge;
import UserLoginSchemaValidator from './UserLoginSchemaValidator';

const bridge = new UserLoginSchemaBridge(UserLoginSchema, UserLoginSchemaValidator);

<AutoForm schema={bridge} />;
```
