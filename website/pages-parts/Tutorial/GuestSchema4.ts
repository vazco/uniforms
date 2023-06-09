// <schema>
import Ajv, { JSONSchemaType } from 'ajv';
// </schema>
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { LongTextField } from 'uniforms-unstyled';

import ImageField from './ImageField';

const ajv = new Ajv({ allErrors: true, useDefaults: true });
ajv.addVocabulary(['options', 'uniforms']);

// <schema>
type FormData = {
  firstName: string;
  lastName: string;
  workExperience: number;
  profession: string;
  additionalInfo: string;
  pictureUrl: string;
};

const schema: JSONSchemaType<FormData> = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
    profession: {
      type: 'string',
      options: [
        {
          label: 'Developer',
          value: 'developer',
        },
        {
          label: 'Tester',
          value: 'tester',
        },
        {
          label: 'Product owner',
          value: 'product-owner',
        },
        {
          label: 'Project manager',
          value: 'project-manager',
        },
        {
          label: 'Businessman',
          value: 'businessman',
        },
      ],
    },
    additionalInfo: {
      type: 'string',
      uniforms: { component: LongTextField },
    },
    pictureUrl: {
      type: 'string',
      uniforms: { component: ImageField },
    },
  },
  required: ['firstName', 'lastName'],
};
// </schema>

function createValidator<T>(schema: JSONSchemaType<T>) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const validator = createValidator(schema);

export const bridge = new JSONSchemaBridge({ schema, validator });
