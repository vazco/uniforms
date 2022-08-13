import Link from '@docusaurus/Link';
import classNames from 'classnames';
import React, { ComponentType } from 'react';

import styles from '../index.module.css';

export type IconLinkProps = JSX.IntrinsicElements['div'] & {
  icon: ComponentType;
  to: string;
};

export function IconLink({
  className,
  icon: Icon,
  to,
  ...props
}: IconLinkProps) {
  return (
    <Link to={to}>
      <div
        {...props}
        className={classNames(styles['link-icon-container'], className)}
      >
        <Icon />
      </div>
    </Link>
  );
}
