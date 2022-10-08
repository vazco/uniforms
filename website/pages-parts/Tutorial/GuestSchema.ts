// <schema>
// <validator>
import Ajv, { JSONSchemaType } from 'ajv';
// </validator>
// </schema>
// <bridgeImport>
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
// </bridgeImport>

// <schema>
interface FormData {
  firstName: string;
  lastName: string;
  workExperience?: number;
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
  },
  required: ['firstName', 'lastName'],
};
// </schema>

// <validator>
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
});

function createValidator(schema: JSONSchemaType<FormData>) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);
// </validator>

// <bridge>
// Correct usage of the JSONSchemaBridge.
export const bridge = new JSONSchemaBridge(schema, schemaValidator);
// </bridge>
