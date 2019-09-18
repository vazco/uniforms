import React from 'react';
import classNames from 'classnames';

import styles from './Tabs.module.css';

export default function TabsHeaderItem({ children, active, onClick }) {
  return (
    <span
      className={classNames(styles.item, active && styles.active)}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
