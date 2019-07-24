import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string' },
    reemail: { type: 'string', const: { $data: '1/email' } },
    password: {
      type: 'string',
      uniforms: {
        type: 'password'
      }
    },
    repassword: {
      type: 'string',
      const: { $data: '1/password' },
      uniforms: {
        type: 'password'
      }
    },
    acceptTermsOfUse: { type: 'boolean' }
  },
  required: [
    'fullname',
    'email',
    'reemail',
    'password',
    'repassword',
    'acceptTermsOfUse'
  ]
};

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

export default new JSONSchemaBridge(schema, schemaValidator);
