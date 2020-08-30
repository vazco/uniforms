import classNames from 'classnames';
import React from 'react';

import styles from '../index.module.css';

export type SubtitleProps = JSX.IntrinsicElements['p'];

export function Subtitle({ children, className, ...props }: SubtitleProps) {
  return (
    <p
      {...props}
      className={classNames(styles.text, styles['section-subtitle'], className)}
    >
      {children}
    </p>
  );
}
