import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    pictureUrl: { type: 'string' },
  },
};

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const validator = createValidator(schema);

export const bridge = new JSONSchemaBridge({ schema, validator });
