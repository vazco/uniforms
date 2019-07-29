import React from 'react';
import classNames from 'classnames';

import styles from './Footer.module.css';
import { Container } from '../Grid';

export default function Footer() {
  return (
    <section className={styles.footer}>
      <Container>
        <div className={classNames(styles.content, styles.vertical)}>
          <div className={styles.vertical}>
            <a href="https://vazco.eu">
              <img src="/img/vazco-logo.png" />
            </a>
            <p className={styles.minor}>
              Copyright &copy; 2019 Vazco. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
