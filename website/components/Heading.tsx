import classNames from 'classnames';
import React from 'react';

import styles from '../index.module.css';

export type HeadingProps = JSX.IntrinsicElements['h1'];

export function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h1 {...props} className={classNames(styles.heading, className)}>
      {children}
    </h1>
  );
}
