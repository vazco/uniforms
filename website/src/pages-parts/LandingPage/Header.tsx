import Link from '@docusaurus/Link';
import classNames from 'classnames';
import React from 'react';

import { Button } from '../../components/Button';
import { CodeSection } from '../../components/CodeSection';
import { FormWrapper } from '../../components/FormWrapper';
import styles from '../../css/index.module.css';
import { themeContext } from '../../lib/universal';
import { ShippingForm } from '../CommonForms/ShippingForm';

type SystemWindowProps = JSX.IntrinsicElements['div'];

function SystemWindow({ children, className, ...props }: SystemWindowProps) {
  return (
    <div
      {...props}
      className={classNames(
        styles['system-window'],
        styles['blue-accent'],
        styles['preview-border'],
        className,
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
          language="tsx"
          section="schema"
          source={require('!!raw-loader!../CommonForms/ShippingSchema')}
        />
      </SystemWindow>
      <SystemWindow>
        <themeContext.Provider value="semantic">
          <FormWrapper>
            <ShippingForm />
          </FormWrapper>
        </themeContext.Provider>
      </SystemWindow>
    </div>
  );
}

const themes = [
  {
    alt: 'Semantic UI',
    src: 'themes/semantic.svg',
    to: 'https://semantic-ui.com/',
  },
  {
    alt: 'Ant Design',
    src: 'themes/antd.png',
    to: 'https://ant.design/',
  },
  {
    alt: 'MUI',
    src: 'themes/mui.png',
    to: 'https://mui.com/',
  },
  {
    alt: 'Bootstrap',
    src: 'themes/bootstrap.svg',
    to: 'https://getbootstrap.com/',
  },
];

export function Header() {
  return (
    <div className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col">
            <span
              className={classNames(
                styles.text,
                styles['text-big'],
                styles.title,
              )}
            >
              uniforms
            </span>
            <h1
              className={classNames(
                styles.description,
                styles.text,
                styles['text-huge'],
              )}
            >
              A React library for building forms from any schema
            </h1>
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
              <Button to="/docs/getting-started/basic-usage">
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
