import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';

import Button from '../common/Button';
import { code } from '../../Code';
import FormWrapper from '../../FormWrapper';
import { ThemeProvider } from '../../ThemeContext';
import ShippingForm from '../../../../docs/examples/CommonForms/ShippingForm';

import styles from '../index.module.css';

function SystemWindow({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={classNames(
        styles['system-window'],
        styles['preview-border'],
        className
      )}
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
    <div className={classNames(styles['floating-example'])}>
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
      <SystemWindow>
        <ThemeProvider value="semantic">
          <FormWrapper>
            <ShippingForm />
          </FormWrapper>
        </ThemeProvider>
      </SystemWindow>
    </div>
  );
}

export default function Header() {
  return (
    <div className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col">
            <span
              className={classNames(
                styles.text,
                styles['text-big'],
                styles.title
              )}
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
            <div className={styles['center-if-sm']}>
              <p className={classNames(styles.text, styles.supported)}>
                Supported design libraries:
              </p>
              {[
                {
                  alt: 'Semantic UI',
                  src: 'semantic.svg',
                  to: 'https://semantic-ui.com/'
                },
                {
                  alt: 'Ant Design',
                  src: 'antd.png',
                  to: 'https://ant.design/'
                },
                {
                  alt: 'Material-UI',
                  src: 'material-ui.png',
                  to: 'https://material-ui.com/'
                },
                {
                  alt: 'Bootstrap',
                  src: 'bootstrap.svg',
                  to: 'https://getbootstrap.com/'
                }
              ].map(({ alt, src, to }, key) => (
                <Link className={styles['theme-icon']} key={key} to={to}>
                  <img alt={alt} src={`assets/${src}`} />
                </Link>
              ))}
            </div>
            <div className={styles['center-if-sm']}>
              <Button to="/docs/tutorials-basic-uniforms-usage">
                Get Started
              </Button>
            </div>
          </div>
          <div className="col">
            <Showcase />
          </div>
        </div>
      </div>
    </div>
  );
}
