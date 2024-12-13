import React, { ReactNode, useState } from 'react';

import styles from '../css/index.module.css';
import { useTabs } from '../lib/tabs';
import { TabsHeader, TabsItem } from './Tabs';
import { TogglerHeader, TogglerItem } from './Toggler';

export type TogglerTabsProps<T extends TabsItem, U extends TogglerItem> = {
  children: (args: { tab: T; toggle: U }) => ReactNode;
  group: string;
  tabsItems: T[];
  togglerItems: U[];
};

export function TogglerTabs<T extends TabsItem, U extends TogglerItem>({
  children,
  group,
  tabsItems,
  togglerItems,
}: TogglerTabsProps<T, U>) {
  const { activeTab, onTab } = useTabs(group);
  const [activeToggle, setStateToggler] = useState(0);

  const handleTogglerClick = (toggle: number) => () => {
    setStateToggler(toggle);
  };

  return (
    <section className={styles['toggler-tabs']}>
      <section className={styles.header}>
        <TabsHeader items={tabsItems} onTab={onTab} activeTab={activeTab} />
        <TogglerHeader
          items={togglerItems}
          onClick={handleTogglerClick}
          activeToggle={activeToggle}
        />
      </section>
      {children({
        tab: tabsItems[activeTab],
        toggle: togglerItems[activeToggle],
      })}
    </section>
  );
}
