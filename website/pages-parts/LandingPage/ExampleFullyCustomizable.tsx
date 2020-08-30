import classNames from 'classnames';
import React from 'react';

import { ExampleCustomizer } from '../../components/ExampleCustomizer';
import { Heading } from '../../components/Heading';
import styles from '../../index.module.css';

export function ExampleFullyCustomizable() {
  return (
    <div className={classNames('section', styles.example)}>
      <div className="row">
        <div className="col col--4">
          <div
            className={classNames(
              styles['solid-border-box'],
              styles['green-accent'],
              styles['fully-customizable-text'],
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
              styles['preview'],
            )}
          >
            <ExampleCustomizer
              code={require('!!raw-loader!../CustomFields/ImageField')}
              example={require('../CustomFields/ImageField').ImageFieldForm}
              schema={require('!!raw-loader!../CustomFields/ImageFieldSchema')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
