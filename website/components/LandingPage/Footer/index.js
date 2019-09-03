import React from 'react';
import classNames from 'classnames';
import GitHubButton from 'react-github-btn';
import Link from '@docusaurus/Link';

import styles from '../index.module.css';

function ShowcaseCard() {
  return (
    <div
      className={classNames(styles['showcase-card'], styles['border-dashed'])}
    >
      <img src="img/uniforms.svg" />
      <p className={classNames(styles.text, styles.paragraph)}>
        A React library for building forms. Integrates with every schema and
        wide range of themes.
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={classNames('hero hero--primary', styles.footer)}>
      <div className="container">
        <div className="row">
          <div className="col">
            <ShowcaseCard />
            <div className="row">
              <div className="col">
                <img src="assets/vazco.svg" />
              </div>
              <div className="col">
                <p
                  style={{ fontSize: '0.8em', display: 'inline-block' }}
                  className={classNames(styles.text, styles.paragraph)}
                >
                  Copyright © 2019 Vazco. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <h2 className={classNames(styles.text, styles['footer-heading'])}>
              Always free
              <br />
              and open source
            </h2>
            <ul className={styles.bullets}>
              <Link to="/docs/installation">
                <li>Introduction</li>
              </Link>
              <Link to="/docs/examples-common-forms">
                <li>Examples</li>
              </Link>
              <Link to="/docs/api-forms">
                <li>API Reference</li>
              </Link>
            </ul>
          </div>
          <div className="col">
            <h2 className={classNames(styles.text, styles['footer-heading'])}>
              Join the Community!
            </h2>
            <GitHubButton
              href="https://github.com/vazco/uniforms"
              data-show-count="true"
              aria-label="Star vazco/uniforms on GitHub"
            >
              Star
            </GitHubButton>
            <ul className={styles.bullets}>
              <Link to="https://gitter.im/vazco/uniforms">
                <li>Gitter</li>
              </Link>
              <Link to="https://github.com/vazco/uniforms">
                <li>GitHub</li>
              </Link>
            </ul>
          </div>
          <div className="col">
            <h2 className={classNames(styles.text, styles['footer-heading'])}>
              Start a conversation!
            </h2>
            <p className={classNames(styles.text, styles.paragraph)}>
              hello@uniforms.tools
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
