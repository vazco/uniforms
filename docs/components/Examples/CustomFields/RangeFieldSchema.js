import Ajv from 'ajv';

import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Date Range',
  type: 'object',
  properties: {
    range: {
      type: 'object',
      properties: {
        start: {
          type: 'string'
        },
        stop: {
          type: 'string'
        }
      }
    }
  }
};

const validator = new Ajv({ allErrors: true, useDefaults: true }).compile(
  schema
);

const schemaValidator = model => {
  validator(model);
  if (validator.errors && validator.errors.length) {
    throw { details: validator.errors };
  }
};

export default new JSONSchemaBridge(schema, schemaValidator);
