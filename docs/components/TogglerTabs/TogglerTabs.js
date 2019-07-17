import React, { useState, useEffect } from 'react';
import { TogglerHeader, getDefaultToggle } from '../Toggler';
import { TabsHeader } from '../Tabs';

const handlers = TabsHeader.__handlers;

function TogglerTabs({
  tabsItems,
  togglerItems,
  children,
  groupByKey = 'default'
}) {
  const [
    { activeItem: activeTab, activeKey: activeTabKey },
    setStateTabs
  ] = useState({
    activeItem: tabsItems[0],
    activeKey: 0
  });
  const [
    { activeItem: activeToggle, activeKey: activeToggleKey },
    setStateToggler
  ] = useState({
    activeItem: togglerItems[getDefaultToggle(togglerItems)],
    activeKey: getDefaultToggle(togglerItems)
  });

  const handleTabsClick = (groupByKey, item, activeKey) => () => {
    handlers[groupByKey].forEach(handler => {
      handler({ activeKey });
    });
  };

  const handleTogglerClick = (item, key) => () => {
    setStateToggler({
      activeItem: item,
      activeKey: key
    });
  };

  useEffect(() => {
    if (handlers[groupByKey] === undefined) {
      handlers[groupByKey] = [];
    }
    handlers[groupByKey].push(setStateTabs);
    return () => {
      handlers[groupByKey].splice(
        handlers[groupByKey].indexOf(setStateTabs),
        1
      );
    };
  });

  return (
    <section className="TogglerTabs">
      <section className="header">
        <TabsHeader
          items={tabsItems}
          onClick={handleTabsClick.bind(this, groupByKey)}
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
