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
    },
    codingSince: {
      description: 'Age in years',
      type: 'integer',
      minimum: 5
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

const bridge = new JSONSchemaBridge(schema, schemaValidator);

export default bridge;
