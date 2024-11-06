import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword('uniforms');

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string' },
    confirmEmail: { type: 'string', const: { $data: '1/email' } },
    password: {
      type: 'string',
      uniforms: { type: 'password' },
    },
    confirmPassword: {
      type: 'string',
      const: { $data: '1/password' },
      uniforms: { type: 'password' },
    },
    acceptTermsOfUse: { type: 'boolean', const: true },
  },
  required: [
    'fullname',
    'email',
    'confirmEmail',
    'password',
    'confirmPassword',
    'acceptTermsOfUse',
  ],
};

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const validator = createValidator(schema);

export const bridge = new JSONSchemaBridge({ schema, validator });
