import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    pictureUrl: { type: 'string' }
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

const bridge = new JSONSchemaBridge(schema, schemaValidator);

export default bridge;
