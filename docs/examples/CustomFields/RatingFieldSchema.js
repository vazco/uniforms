import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Rating',
  type: 'object',
  properties: {
    rating: { type: 'integer' }
  }
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
