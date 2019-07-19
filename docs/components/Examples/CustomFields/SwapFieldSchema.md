```js
import Ajv from 'ajv';

import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  },
  required: ['firstName', 'lastName']
};

const validator = new Ajv({allErrors: true, useDefaults: true}).compile(schema);

const schemaValidator = model => {
  validator(model);
  if (validator.errors && validator.errors.length) {
    throw {details: validator.errors};
  }
};

export default new JSONSchemaBridge(schema, schemaValidator);
```
