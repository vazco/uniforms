```js
import Ajv from 'ajv';

import ImageField from './ImageField.js';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    pictureUrl: {
      type: 'string'
    }
  }
};

const validator = new Ajv({allErrors: true, useDefaults: true}).compile(schema);

const schemaValidator = model => {
  validator(model);
  if (validator.errors && validator.errors.length) {
    throw {details: validator.errors};
  }
};

const bridge = new JSONSchemaBridge(schema, schemaValidator);

export default bridge;
```
