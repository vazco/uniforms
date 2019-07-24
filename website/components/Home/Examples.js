import React from 'react';

import { Row, Column } from './Grid';
import ExampleCustomizer from '../ExampleCustomizer';
import { code } from '../Code';

import SignUp from '../../../docs/examples/CommonForms/SignUp';
// import SignUpSchema from '../../../docs/examples/CommonForms/SignUpSchema.md';

import ImageField from '../../../docs/examples/CustomFields/ImageField';

export default function Examples() {
  return (
    <section>
      <Row>
        <Column>
          <h2>Simple, yet powerful.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            lacinia justo quam, sed condimentum metus feugiat et. Cras a
            lobortis est. Maecenas rutrum nunc eget ligula tincidunt, id maximus
            nisl viverra. Ut ac est a lorem pellentesque tincidunt sit amet in
            lacus. Sed nec maximus felis. Praesent malesuada lectus vel augue
            vehicula, vitae ornare nisi convallis. Mauris eget massa feugiat,
            finibus ligula sed, condimentum ipsum. Sed scelerisque sollicitudin
            consectetur. Maecenas eget arcu mauris. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia Curae;
          </p>
        </Column>
        <Column>
          <span style={{ fontSize: '.66em' }}>
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
          </span>
        </Column>
      </Row>

      <Row>
        <Column>
          <span style={{ fontSize: '.66em' }}>
            <ExampleCustomizer
              code={theme =>
                code(
                  'js',
                  `import React from 'react';
import connectField from 'uniforms/connectField';\n
import schema from './ImageFieldSchema';
import { AutoForm, SubmitField } from 'uniforms-${theme}';\n
function Image({ onChange, value }) {
  const imgPlaceholder = 'https://via.placeholder.com/150.png';\n
  function onImageChange({ target: { files } }) {
    if (files && files[0]) {
      onChange(URL.createObjectURL(files[0]));
    }
  }\n
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>Choose your photo</div>
        <img
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
          src={value ? value : imgPlaceholder}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={onImageChange}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}
const ImageField = connectField(Image);\n
export default function ExamplesSubmitField() {
  return (
    <AutoForm schema={schema}>
      <ImageField name="pictureUrl" />
      <SubmitField />
    </AutoForm>
  );
`
                )
              }
              example={<ImageField />}
              schema={code(
                'js',
                `import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    pictureUrl: { type: 'string' }
  }
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

const bridge = new JSONSchemaBridge(schema, schemaValidator);

export default bridge;
`
              )}
            />
          </span>
        </Column>
        <Column>
          <h2>Custom fields.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            lacinia justo quam, sed condimentum metus feugiat et. Cras a
            lobortis est. Maecenas rutrum nunc eget ligula tincidunt, id maximus
            nisl viverra. Ut ac est a lorem pellentesque tincidunt sit amet in
            lacus. Sed nec maximus felis. Praesent malesuada lectus vel augue
            vehicula, vitae ornare nisi convallis. Mauris eget massa feugiat,
            finibus ligula sed, condimentum ipsum. Sed scelerisque sollicitudin
            consectetur. Maecenas eget arcu mauris. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia Curae;
          </p>
        </Column>
      </Row>
    </section>
  );
}
