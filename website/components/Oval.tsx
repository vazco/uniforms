import React from 'react';
import classNames from 'classnames';

import styles from '../index.module.css';

export type OvalProps = JSX.IntrinsicElements['span'];

export function Oval({ children, className, ...props }: OvalProps) {
  return (
    <span {...props} className={classNames(styles.oval, className)}>
      {children}
    </span>
  );
}
