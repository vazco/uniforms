import React from 'react';
import styles from '../styles.module.css';

export function Container({ children }) {
  return (
    <div className={`${styles.textSmall} container margin-top--lg`}>
      {children}
    </div>
  );
}

export function Row({ children }) {
  return <div className="row">{children}</div>;
}

export function Column({ children }) {
  return <div className={styles.half}>{children}</div>;
}
