import Link from '@docusaurus/Link';
import classNames from 'classnames';
import React from 'react';

import styles from '../index.module.css';

export type OvalLinkProps = JSX.IntrinsicElements['span'] & { to: string };

export function OvalLink({ children, className, to, ...props }: OvalLinkProps) {
  return (
    <Link className={styles['oval-link']} to={to}>
      <span
        {...props}
        className={classNames(styles['oval-link-icon'], className)}
      >
        {children}
      </span>
    </Link>
  );
}
