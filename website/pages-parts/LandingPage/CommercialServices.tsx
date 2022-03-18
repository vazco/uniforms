import classNames from 'classnames';
import React from 'react';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Subtitle } from '../../components/Subtitle';
import styles from '../../index.module.css';

export function CommercialServices() {
  return (
    <div
      className={classNames(
        'hero hero--primary',
        styles['overflow-hidden'],
        styles.whyus,
      )}
    >
      <div className="container">
        <div className="section">
          <div className="row">
            <div
              className={classNames('col col--5', styles['section-content'])}
            >
              <Subtitle>Commercial support</Subtitle>
              <Heading className={styles['heading-white']}>
                Form Builder
              </Heading>
              <p className={classNames(styles.text, styles.paragraph)}>
                A commercial implementation of uniforms, which can save you up
                to 1500 hours of work.
              </p>
              <ul
                className={classNames(
                  styles.text,
                  styles.bullets,
                  styles['commercial-bullets'],
                )}
              >
                <li>
                  <b>Ideal for building no-code tools</b> - thanks to a
                  schema-first approach
                </li>
                <li>
                  <b>Package</b> - easy to integrate with your project and
                  design system
                </li>
                <li>
                  <b>Powerful solution</b> - custom fields, full state machine
                </li>
                <li>
                  <b>Good level of support</b> - based on our popular OS
                  solution, uniforms
                </li>
              </ul>
              <div className={styles['center-if-sm']}>
                <Button to="https://www.vazco.eu/form-builder">See more</Button>
              </div>
            </div>
            <div className={classNames('col', styles['commercial-box'])}>
              <img
                width="600px"
                height="600px"
                src="/img/form-builder.png"
                alt="Form Builder"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
