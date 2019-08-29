import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';

import styles from '../index.module.css';

export default function Button({
  children,
  className,
  centered,
  to,
  ...props
}) {
  return (
    <Link to={to}>
      <button
        {...props}
        className={classNames(
          'button button--lg button--primary',
          centered && styles.centered,
          styles['call-to-action'],
          className
        )}
      >
        {children}
      </button>
    </Link>
  );
}
