import React, { useState } from 'react';
import { TogglerHeader, getDefaultToggle } from '../Toggler';
import { TabsHeader } from '../Tabs';

function TogglerTabs({ tabsItems, togglerItems, children }) {
  const [{ activeTab, activeTabKey }, setStateTabs] = useState({
    activeTab: tabsItems[0],
    activeTabKey: 0
  });
  const [{ activeToggle, activeToggleKey }, setStateToggler] = useState({
    activeToggle: togglerItems[getDefaultToggle(togglerItems)],
    activeToggleKey: getDefaultToggle(togglerItems)
  });

  const handleTabsClick = (tab, key) => () => {
    setStateTabs({
      activeTab: tab,
      activeTabKey: key
    });
  };

  const handleTogglerClick = (toggle, key) => () => {
    setStateToggler({
      activeToggle: toggle,
      activeToggleKey: key
    });
  };

  return (
    <section className="TogglerTabs">
      <section className="header">
        <TabsHeader
          items={tabsItems}
          onClick={handleTabsClick}
          activeKey={activeTabKey}
        />
        <TogglerHeader
          items={togglerItems}
          onClick={handleTogglerClick}
          activeKey={activeToggleKey}
        />
      </section>
      <section className="content">
        {children({
          tab: activeTab,
          toggle: activeToggle
        })}
      </section>
    </section>
  );
}

export default TogglerTabs;
