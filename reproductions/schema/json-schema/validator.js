import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

export function createValidator(schema) {
  const validator = ajv.compile(schema);
  return model => {
    validator(model);
    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}
