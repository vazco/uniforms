import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import ExampleCustomizer from '../../ExampleCustomizer';
import { code } from '../../Code';
import SignUp from '../../../../docs/examples/CommonForms/SignUp';
import styles from '../index.module.css';

export default function ExampleSimpleYetPowerful() {
  return (
    <div className={classNames('section', styles.example)}>
      <div
        className={classNames(
          'row',
          styles['blue-accent'],
          styles['reverse-wrap']
        )}
      >
        <div className="col">
          <div
            className={classNames(styles['preview-border'], styles['preview'])}
          >
            <ExampleCustomizer
              code={theme =>
                code(
                  'js',
                  `import React from 'react';\n
import schema from './SignUpSchema';
import { AutoForm } from 'uniforms-${theme}';\n
export default function SignUpForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    />
  );
}`
                )
              }
              example={<SignUp />}
              schema={code(
                'js',
                `import Ajv from 'ajv';
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

export default new JSONSchemaBridge(schema, schemaValidator);`
              )}
            />
          </div>
        </div>

        <div className="col col--4">
          <div
            className={classNames(
              styles['solid-border-box'],
              styles['simple-yet-powerful-text']
            )}
          >
            <Heading>
              Simple,
              <br />
              yet powerful
            </Heading>
            <ul>
              <li>Abbrevates from code by 51%</li>
              <li>
                Out-of-the box built-in fields capable of rendering every schema
              </li>
              <li>Automatic state management</li>
              <li>Inline and asynchronous form validation</li>
              <li>
                Clean-looking components while keeping extendability and
                separation of concerns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
