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
  type: 'object',
  properties: {
    a: {
      type: 'number',
      title: 'a',
      uniforms: { title: 'Horse' },
    },
    b: {
      type: 'string',
      uniforms: {
        placeholder: 'Horse',
        required: false,
      },
    },
    c: {
      type: 'string',
      title: 'Title',
      uniforms: { label: 'Horse' },
    },
    d: { type: 'string' },
    e: {
      type: 'string',
      title: 'Title',
      uniforms: {
        label: 'Horse A',
        placeholder: 'Horse B',
      },
    },
  },
  required: ['b', 'c', 'd', 'e'],
};

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);
