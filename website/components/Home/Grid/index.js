import React from 'react';
import styles from '../styles.module.css';
import classNames from 'classnames';

export function Container({ children }) {
  return (
    <div className={`${styles.textSmall} container margin-top--lg`}>
      {children}
    </div>
  );
}

export function Row({ children }) {
  return <div className={classNames('row', styles.row)}>{children}</div>;
}

export function Column({ children }) {
  return (
    <div className={classNames(styles.half, styles.column)}>{children}</div>
  );
}
