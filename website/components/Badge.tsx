import Link from '@docusaurus/Link';
import React, { ComponentType } from 'react';
import classNames from 'classnames';

import styles from '../index.module.css';
import { Oval } from './Oval';

export type BadgeProps = {
  border: number;
  color: string;
  icon: ComponentType<{ color?: string }>;
  number?: string;
  text: string;
  to: string;
};

export function Badge({
  border,
  color,
  icon: Icon,
  number,
  text,
  to,
}: BadgeProps) {
  return (
    <Link to={to} className={classNames(styles.badge)}>
      <img
        className={styles['badge-image']}
        src={`assets/border-0${border}.svg`}
        alt="border-image"
      />
      {Icon && (
        <Oval className={styles['top-right-corner']}>
          <Icon color={color} />
        </Oval>
      )}
      <div className={classNames(styles['badge-centered'], styles.centered)}>
        <div style={{ color }} className={styles['badge-number']}>
          {number}
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </Link>
  );
}
