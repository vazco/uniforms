import Ajv from 'ajv';

import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const personSchema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100
    }
  },
  required: ['firstName', 'lastName']
};

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    personA: personSchema,
    personB: personSchema
  },
  required: ['personA', 'personB']
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
