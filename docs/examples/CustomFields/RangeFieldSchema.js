import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Date Range',
  type: 'object',
  properties: {
    range: {
      type: 'object',
      properties: {
        start: { type: 'string', format: 'date-time' },
        stop: { type: 'string', format: 'date-time' }
      },
      required: ['start', 'stop']
    }
  }
};

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      return { details: validator.errors };
    }
  };
}

const schemaValidator = createValidator(schema);

export default new JSONSchemaBridge(schema, schemaValidator);
