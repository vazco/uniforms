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
interface FormData {
  firstName: string;
  lastName: string;
  workExperience?: number;
  profession?: string;
  additionalInfo?: string;
}

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
      nullable: true,
    },
    profession: { type: 'string', nullable: true },
    additionalInfo: { type: 'string', nullable: true },
  },
  required: ['firstName', 'lastName'],
};
// </schema>

function createValidator(schema: JSONSchemaType<FormData>) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);
