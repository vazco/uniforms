import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { LongTextField } from 'uniforms-unstyled';

import ImageField from './ImageField.js';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

// <schema>
const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100
    },
    profession: {
      type: 'string',
      options: [
        {
          label: 'Developer',
          value: 'developer'
        },
        {
          label: 'Tester',
          value: 'tester'
        },
        {
          label: 'Product owner',
          value: 'product-owner'
        },
        {
          label: 'Project manager',
          value: 'project-manager'
        },
        {
          label: 'Businessman',
          value: 'businessman'
        }
      ]
    },
    additionalInfo: {
      type: 'string',
      uniforms: {
        component: LongTextField
      }
    },
    pictureUrl: {
      type: 'string',
      uniforms: {
        component: ImageField
      }
    }
  },
  required: ['firstName', 'lastName']
};
// </schema>

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}

const schemaValidator = createValidator(schema);

const bridge = new JSONSchemaBridge(schema, schemaValidator);

export default bridge;
