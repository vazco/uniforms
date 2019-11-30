import React from 'react';

import TabsHeader from './TabsHeader';
import { useTabs } from './state';

function Tabs({ children, group, tabs }) {
  const { activeTab, onTab } = useTabs(group);

  return (
    <>
      <TabsHeader activeTab={activeTab} items={tabs} onTab={onTab} />
      {children(tabs[activeTab])}
    </>
  );
}

export default Tabs;
