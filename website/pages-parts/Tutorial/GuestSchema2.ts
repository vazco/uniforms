// <schema>
import Ajv, { JSONSchemaType } from 'ajv';
// </schema>
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
});

// <schema>
type FormData = {
  firstName: string;
  lastName: string;
  workExperience: number;
  profession: string;
  additionalInfo: string;
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
    profession: { type: 'string' },
    additionalInfo: { type: 'string' },
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
