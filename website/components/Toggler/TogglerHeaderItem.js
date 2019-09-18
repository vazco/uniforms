import React from 'react';
import classNames from 'classnames';

import styles from './Toggler.module.css';

function TogglerHeaderItem({ icon, active, tooltipText, ...rest }) {
  return (
    <span
      {...rest}
      className={classNames(
        styles.tooltip,
        styles.item,
        active && styles.active
      )}
    >
      {tooltipText && (
        <span className={styles['tooltip-text']}>{tooltipText}</span>
      )}
      {icon}
    </span>
  );
}

export default TogglerHeaderItem;
