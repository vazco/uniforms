import classNames from 'classnames';
import React from 'react';

import { ExampleCustomizer } from '../../components/ExampleCustomizer';
import { Heading } from '../../components/Heading';
import styles from '../../index.module.css';

export function ExampleSimpleYetPowerful() {
  return (
    <div className={classNames('section', styles.example)}>
      <div
        className={classNames(
          'row',
          styles['blue-accent'],
          styles['reverse-wrap'],
        )}
      >
        <div className="col">
          <div
            className={classNames(styles['preview-border'], styles['preview'])}
          >
            <ExampleCustomizer
              code={require('!!raw-loader!../CommonForms/SignUp')}
              example={require('../CommonForms/SignUp').SignUp}
              schema={require('!!raw-loader!../CommonForms/SignUpSchema')}
            />
          </div>
        </div>

        <div className="col col--4">
          <div
            className={classNames(
              styles['solid-border-box'],
              styles['simple-yet-powerful-text'],
            )}
          >
            <Heading>
              Simple,
              <br />
              yet powerful
            </Heading>
            <ul>
              <li>Abbreviates form code by 51%</li>
              <li>
                Out-of-the box built-in fields capable of rendering every schema
              </li>
              <li>Automatic state management</li>
              <li>Inline and asynchronous form validation</li>
              <li>
                Clean-looking components while keeping extensibility and
                separation of concerns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
