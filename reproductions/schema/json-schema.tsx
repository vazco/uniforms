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
    regularRequired: {
      type: 'string',
    },
    'nested.required': {
      type: 'string',
    },

    regularMinLength: {
      type: 'string',
      minLength: 5,
      default: 'Horse',
    },
    'nested.minLength': {
      type: 'string',
      minLength: 5,
      default: 'Horse',
    },
    'nested.array': {
      type: 'array',
      minItems: 5,
      items: {
        type: 'object',
        required: ['first.name', 'last.name'],
        properties: {
          'first.name': {
            type: 'string',
            minLength: 5,
          },
          'last.name': {
            type: 'string',
            minLength: 5,
          },
        },
      },
    },
    'nested.object': {
      type: 'object',
      required: ['first.name', 'last.name'],
      properties: {
        'first.name': {
          type: 'string',
          minLength: 5,
        },
        'last.name': {
          type: 'string',
          minLength: 5,
        },
        'another.nested': {
          type: 'object',
          properties: {
            a: { type: 'string', minLength: 5 },
            b: { type: 'string', minLength: 5 },
          },
        },
      },
    },
  },
  required: ['nested.required', 'regularRequired'],
};

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);
