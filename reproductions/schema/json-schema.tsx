import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });
ajv.addKeyword('uniforms');

function createValidator(schema: object) {
  const validator = ajv.compile(schema);
  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schema = {
  title: 'Address',
  type: 'object',
  properties: {
    city: { type: 'string' },
    state: { type: 'string' },
    street: { type: 'string' },
    zip: { type: 'string', pattern: '[0-9]{5}' },
  },
  required: ['street', 'zip', 'state'],
};

const validator = createValidator(schema);

export const bridge = new JSONSchemaBridge({ schema, validator });
