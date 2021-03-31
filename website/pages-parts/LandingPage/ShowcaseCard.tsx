import classNames from 'classnames';
import React from 'react';

import styles from '../../index.module.css';

export function ShowcaseCard() {
  return (
    <div
      className={classNames(styles['showcase-card'], styles['border-dashed'])}
    >
      <img alt="" src="img/uniforms.svg" />
      <p className={classNames(styles.text, styles.paragraph)}>
        A React library for building forms. Integrates with every schema and
        wide range of themes.
      </p>
    </div>
  );
}
