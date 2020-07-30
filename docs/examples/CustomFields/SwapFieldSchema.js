import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' }
  },
  required: ['firstName', 'lastName']
};

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

export default new JSONSchemaBridge(schema, schemaValidator);
