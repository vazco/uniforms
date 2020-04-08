import Link from '@docusaurus/Link';
import React from 'react';
import classNames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Button from './Button';
import CodeSection from '../CodeSection';
import FormWrapper from '../FormWrapper';
import ShippingForm from '../../../docs/examples/CommonForms/ShippingForm';
import styles from './index.module.css';
import { ThemeProvider } from '../ThemeContext';

function SystemWindow({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={classNames(
        styles['system-window'],
        styles['blue-accent'],
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
        <CodeSection
          language="js"
          section="schema"
          source={require('!!raw-loader!../../../docs/examples/CommonForms/ShippingSchema')}
        />
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

const themes = [
  {
    alt: 'Semantic UI',
    src: 'themes/semantic.svg',
    to: 'https://semantic-ui.com/'
  },
  {
    alt: 'Ant Design',
    src: 'themes/antd.png',
    to: 'https://ant.design/'
  },
  {
    alt: 'Material-UI',
    src: 'themes/material-ui.png',
    to: 'https://material-ui.com/'
  },
  {
    alt: 'Bootstrap',
    src: 'themes/bootstrap.svg',
    to: 'https://getbootstrap.com/'
  }
];

export default function Header() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { title, tagline } = siteConfig;
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
              {title}
            </span>
            <span
              className={classNames(
                styles.description,
                styles.text,
                styles['text-huge']
              )}
            >
              {tagline}
            </span>
            <ul className={classNames(styles.text, styles.bullets)}>
              <li>support of all schemas and themes</li>
              <li>instant prototyping</li>
              <li>simplifies separation of concerns</li>
            </ul>
            <div className={styles['center-if-sm']}>
              <p className={classNames(styles.text, styles.supported)}>
                Supported design libraries:
              </p>
              {themes.map(({ alt, src, to }) => (
                <Link className={styles['theme-icon']} key={alt} to={to}>
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
