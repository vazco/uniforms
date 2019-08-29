import React from 'react';
import classNames from 'classnames';

import Section from '../common/Section';
import Button from '../common/Button';
import styles from '../index.module.css';

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
        <img
          src="assets/screens.png"
          srcSet="assets/screens@2x.png 2x, assets/screens@3x.png 3x"
          className="screens"
        />
      </div>
    </Section>
  );
}
