import Link from '@docusaurus/Link';
import classNames from 'classnames';
import React from 'react';

import styles from '../index.module.css';

export type IconLinkProps = JSX.IntrinsicElements['div'] & { to: string };

export function IconLink({ children, className, to, ...props }: IconLinkProps) {
  return (
    <Link to={to}>
      <div
        {...props}
        className={classNames(styles['link-icon-container'], className)}
      >
        {children}
      </div>
    </Link>
  );
}
