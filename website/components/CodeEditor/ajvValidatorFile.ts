export const ajvValidatorFile = `import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
});

export function createValidator<T>(schema: JSONSchemaType<T>) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}`;
