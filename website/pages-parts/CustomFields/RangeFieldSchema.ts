import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({
  allErrors: true,
  formats: { 'date-time': true },
  useDefaults: true,
});

const schema = {
  title: 'Date Range',
  type: 'object',
  properties: {
    range: {
      type: 'object',
      properties: {
        start: { type: 'string', format: 'date-time' },
        stop: { type: 'string', format: 'date-time' },
      },
      required: ['start', 'stop'],
    },
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
