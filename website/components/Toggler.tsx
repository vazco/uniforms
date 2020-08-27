import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';

import styles from '../index.module.css';

export type TogglerItem = {
  component?: ReactNode;
  icon: ReactNode;
  tooltipText: string;
};

export type TogglerHeaderItemProps = JSX.IntrinsicElements['span'] &
  TogglerItem & { active: boolean };

export function TogglerHeaderItem({
  active,
  icon,
  tooltipText,
  ...rest
}: TogglerHeaderItemProps) {
  return (
    <span
      {...rest}
      className={classNames(
        styles.tooltip,
        styles.item,
        active && styles.active,
      )}
    >
      {tooltipText && (
        <span className={styles['tooltip-text']}>{tooltipText}</span>
      )}
      {icon}
    </span>
  );
}

export type TogglerHeaderProps<T extends TogglerItem> = {
  activeToggle: number;
  items: T[];
  onClick(tab: number): () => void;
};

export function TogglerHeader<T extends TogglerItem>({
  activeToggle,
  items,
  onClick,
}: TogglerHeaderProps<T>) {
  return (
    <section className={classNames(styles.toggler, styles.header)}>
      {items.map((item, key) => {
        return (
          <TogglerHeaderItem
            active={activeToggle === key}
            key={key}
            onClick={onClick(key)}
            {...item}
          />
        );
      })}
    </section>
  );
}

export type TogglerProps<T extends TogglerItem> = {
  items: T[];
};

export function Toggler<T extends TogglerItem>({ items }: TogglerProps<T>) {
  const [activeToggle, setState] = useState(0);

  const toggleClick = (toggle: number) => () => {
    setState(toggle);
  };

  return (
    <>
      <TogglerHeader
        activeToggle={activeToggle}
        items={items}
        onClick={toggleClick}
      />
      <section>{items[activeToggle].component}</section>
    </>
  );
}
