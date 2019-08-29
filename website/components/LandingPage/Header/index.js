import React from 'react';
import classNames from 'classnames';

import Section from '../common/Section';
import Button from '../common/Button';
import { code } from '../../Code';
import styles from '../index.module.css';

function SystemWindow({ children }) {
  return (
    <div
      className={classNames(styles['system-window'], styles['preview-border'])}
    >
      <div className={styles['system-top-bar']}>
        <span
          className={styles['system-top-bar-circle']}
          style={{ backgroundColor: 'var(--periwinkle)' }}
        />
        <span
          className={styles['system-top-bar-circle']}
          style={{ backgroundColor: 'var(--bright-cyan)' }}
        />
        <span
          className={styles['system-top-bar-circle']}
          style={{ backgroundColor: 'var(--sea-green)' }}
        />
      </div>
      {children}
    </div>
  );
}

function Showcase() {
  return (
    <SystemWindow>
      {code(
        'javascript',
        `export const ShippingSchema = new SimpleSchema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    country: {
      type: String,
      allowedValues: ["Poland", "England", "Germany", "Russia"],
      defaultValue: "Poland"
    },
    state: {
      type: String,
      optional: true
    },
    useThisAddressForPaymentDetails: {
      type: Boolean
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String,
      optional: true
    },
    city: {
      type: String
    },
    zip: {
      type: String
    }
  });`
      )}
    </SystemWindow>
  );
}

export default function Header() {
  return (
    <Section className={styles.header}>
      <div className="col col--4 col--offset-2">
        <span
          className={classNames(styles.text, styles['text-big'], styles.title)}
        >
          uniforms
        </span>
        <span
          className={classNames(
            styles.description,
            styles.text,
            styles['text-huge']
          )}
        >
          A React library for building forms from every schema
        </span>
        <ul className={classNames(styles.text, styles.bullets)}>
          <li>support of all schemas and themes</li>
          <li>instant prototyping</li>
          <li>simplifies separation of contents</li>
        </ul>
        <p className={classNames(styles.text, styles.supported)}>
          Supported design libraries:
        </p>
        <div>
          {['semantic.svg', 'antd.png', 'material-ui.png', 'bootstrap.svg'].map(
            (src, key) => (
              <img
                key={key}
                src={`assets/${src}`}
                className={styles['theme-icon']}
              />
            )
          )}
        </div>
        <Button>Download on GitHub</Button>
      </div>
      <div className="col col--4">
        <Showcase />
      </div>
    </Section>
  );
}
