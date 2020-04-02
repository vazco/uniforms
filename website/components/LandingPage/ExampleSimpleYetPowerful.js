import React from 'react';
import classNames from 'classnames';

import CodeSection from '../CodeSection';
import ExampleCustomizer from '../ExampleCustomizer';
import Heading from './Heading';
import SignUp from '../../../docs/examples/CommonForms/SignUp';
import styles from './index.module.css';

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
              code={theme => (
                <CodeSection
                  language="js"
                  replace={{
                    '../../../website/components/universal': `uniforms-${theme}`
                  }}
                  source={require('!!raw-loader!../../../docs/examples/CommonForms/SignUp')}
                />
              )}
              example={<SignUp />}
              schema={
                <CodeSection
                  language="js"
                  source={require('!!raw-loader!../../../docs/examples/CommonForms/SignUpSchema')}
                />
              }
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
              <li>Abbreviates form code by 51%</li>
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
