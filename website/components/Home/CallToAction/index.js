import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';

import styles from './CallToAction.module.css';

const Button = ({ title, to, ...rest }) => {
  const classes = Object.keys(rest).map(key => `button--${key}`);
  return (
    <Link to={to}>
      <button class={classNames('button', ...classes)}>{title}</button>
    </Link>
  );
};

const Section = ({ children, className, ...rest }) => (
  <section {...rest} className={classNames(styles.container, className)}>
    {children}
  </section>
);

export function SectionButton({ title, vertical }) {
  return (
    <Section className={vertical && styles.vertical} id={styles['get-started']}>
      <Button title={title} to="/docs/installation" lg primary />
    </Section>
  );
}

export function SectionQuestions({ title, subtitle }) {
  return (
    <Section className={styles.questions}>
      <div style={{ textAlign: 'center' }}>
        {title && <h2>{title}</h2>}
        {subtitle && <h6>{subtitle}</h6>}
        <Button
          title="Gitter"
          to="https://gitter.im/vazco/uniforms"
          lg
          outline
          primary
        />
      </div>
    </Section>
  );
}
