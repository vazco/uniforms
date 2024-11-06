import classNames from 'classnames';
import React from 'react';

import styles from '../css/index.module.css';

export type SubtitleProps = JSX.IntrinsicElements['p'];

export function Subtitle({ children, className, ...props }: SubtitleProps) {
  return (
    <h3
      {...props}
      className={classNames(styles.text, styles['section-subtitle'], className)}
    >
      {children}
    </h3>
  );
}
