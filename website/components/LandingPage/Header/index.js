import React from 'react';
import classNames from 'classnames';

import styles from '../index.module.css';

export default function Header() {
  return (
    <div className={classNames('row', styles.header)}>
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
        <button
          className={classNames(
            'button button--lg button--primary',
            styles['call-to-action']
          )}
        >
          Download on GitHub
        </button>
      </div>
      <div className="col col--4">
        <img
          src="assets/screens.png"
          srcset="assets/screens@2x.png 2x, assets/screens@3x.png 3x"
          class="screens"
        />
      </div>
    </div>
  );
}
