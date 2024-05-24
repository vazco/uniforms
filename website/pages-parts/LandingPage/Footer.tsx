import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import classNames from 'classnames';
import React from 'react';

import { ShowcaseCard } from './ShowcaseCard';
import styles from '../../index.module.css';

export function Footer() {
  const context = useDocusaurusContext();
  const { email } = context.siteConfig.customFields;

  const currentYear = new Date().getFullYear();

  return (
    <footer className={classNames('hero hero--primary', styles.footer)}>
      <div className="container">
        <div className="row">
          <div className="col">
            <ShowcaseCard />
          </div>
          <div className={classNames('col', styles['offset-column'])}>
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
          <div className={classNames('col', styles['offset-column'])}>
            <h2 className={classNames(styles.text, styles['footer-heading'])}>
              Join the Community!
            </h2>
            <ul className={styles.bullets}>
              <Link to="https://github.com/vazco/uniforms/discussions">
                <li>GitHub Discussions</li>
              </Link>
              <Link to="https://github.com/vazco/uniforms">
                <li>GitHub</li>
              </Link>
            </ul>
          </div>
          <div className={classNames('col', styles['offset-column'])}>
            <h2 className={classNames(styles.text, styles['footer-heading'])}>
              Start a conversation!
            </h2>
            <Link to={`mailto:${email}`}>
              <p className={classNames(styles.text, styles.paragraph)}>
                {email}
              </p>
            </Link>
            <Link to="https://www.vazco.eu/open-source">
              <h2 className={classNames(styles.text, styles['footer-heading'])}>
                Meet the creators!
              </h2>
            </Link>
            <a href="https://vazco.eu">
              <img
                alt="Vazco homepage"
                className={styles.vazco}
                src="assets/vazco.svg"
              />
            </a>
            <br />
            <p
              style={{ fontSize: '0.8em', display: 'inline-block' }}
              className={classNames(styles.text, styles.paragraph)}
            >
              Copyright © 2016 - {currentYear} Vazco.
              <br /> All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
