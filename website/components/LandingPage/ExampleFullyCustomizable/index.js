import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import ExampleCustomizer from '../../ExampleCustomizer';
import { code } from '../../Code';
import ImageField from '../../../../docs/examples/CustomFields/ImageField';

import styles from '../index.module.css';

export default function ExampleFullyCustomizable() {
  return (
    <div className={classNames('section', styles.example)}>
      <div className="row">
        <div className="col col--4">
          <div
            className={classNames(
              styles['solid-border-box'],
              styles['green-accent'],
              styles['fully-customizable-text']
            )}
          >
            <Heading>
              Fully
              <br />
              customizable
            </Heading>
            <ul>
              <li>One-line helper for creating custom fields</li>
              <li>Supports all types of objects</li>
              <li>
                Freedom of choice when defining custom fields depending on the
                abstraction level-schema or theme dependent approach
              </li>
            </ul>
          </div>
        </div>

        <div className="col">
          <div
            className={classNames(
              styles['preview-border'],
              styles['green-accent'],
              styles['preview']
            )}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
}
