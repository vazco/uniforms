import classNames from 'classnames';
import React from 'react';

import styles from '../../index.module.css';

export function ShowcaseCard() {
  return (
    <div
      className={classNames(styles['showcase-card'], styles['border-dashed'])}
    >
      {/* TODO[jsx-a11y] */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src="img/uniforms.svg" />
      <p className={classNames(styles.text, styles.paragraph)}>
        A React library for building forms. Integrates with every schema and
        wide range of themes.
      </p>
    </div>
  );
}
