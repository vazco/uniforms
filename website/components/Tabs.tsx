import classNames from 'classnames';
import React, { ReactNode } from 'react';

import styles from '../index.module.css';
import { useTabs } from '../lib/tabs';

export type TabsItem = {
  name: string;
};

export type TabsHeaderProps<T extends TabsItem> = {
  activeTab: number;
  items: T[];
  onTab: (tab: number) => void;
};

export function TabsHeader<T extends TabsItem>({
  activeTab,
  items,
  onTab,
}: TabsHeaderProps<T>) {
  return (
    <div className={styles.tabs}>
      {items.map(({ name }, key) => (
        <TabsHeaderItem
          active={activeTab === key}
          key={key}
          onClick={() => onTab(key)}
        >
          {name}
        </TabsHeaderItem>
      ))}
    </div>
  );
}

export type TabsHeaderItemProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

export function TabsHeaderItem({
  active,
  children,
  onClick,
}: TabsHeaderItemProps) {
  return (
    <span
      className={classNames(styles.item, active && styles.active)}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export type TabsProps<T extends TabsItem> = {
  children: (tab: T) => ReactNode;
  group: string;
  tabs: T[];
};

export function Tabs<T extends TabsItem>({
  children,
  group,
  tabs,
}: TabsProps<T>) {
  const { activeTab, onTab } = useTabs(group);

  return (
    <>
      <TabsHeader activeTab={activeTab} items={tabs} onTab={onTab} />
      {children(tabs[activeTab])}
    </>
  );
}
