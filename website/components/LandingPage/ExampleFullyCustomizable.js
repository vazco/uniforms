import React from 'react';
import classNames from 'classnames';

import ExampleCustomizer from '../ExampleCustomizer';
import Heading from './Heading';
import styles from './index.module.css';

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
              code={require('!!raw-loader!../../../docs/examples/CustomFields/ImageField')}
              example={require('../../../docs/examples/CustomFields/ImageField')}
              schema={require('!!raw-loader!../../../docs/examples/CustomFields/ImageFieldSchema')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
