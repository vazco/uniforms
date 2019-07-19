```js
import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    fullname: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    reemail: {
      type: 'string'
    },
    password: {
      type: 'string',
      uniforms: {
        type: 'password'
      }
    },
    repassword: {
      type: 'string',
      errorMessage: {
        type: 'Passwords must match'
      },
      const: {$data: '1/password'},
      uniforms: {
        type: 'password'
      }
    },
    acceptTermsOfUse: {
      type: 'boolean'
    }
  },
  required: ['fullname', 'email', 'reemail', 'password', 'repassword', 'acceptTermsOfUse']
};

const validator = new Ajv({
  allErrors: true,
  useDefaults: true,
  $data: true
}).compile(schema);

const schemaValidator = model => {
  validator(model);
  if (validator.errors && validator.errors.length) {
    throw {details: validator.errors};
  }
};

export default new JSONSchemaBridge(schema, schemaValidator);
```
