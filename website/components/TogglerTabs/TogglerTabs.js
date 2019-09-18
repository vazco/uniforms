import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './TogglerTabs.module.css';
import { TabsHeader } from '../Tabs';
import { TogglerHeader, getDefaultToggle } from '../Toggler';
import { useTabs } from '../Tabs/state';

function TogglerTabs({ children, group, tabsItems, togglerItems }) {
  const { activeTab, onTab } = useTabs(group);

  const [{ activeToggle }, setStateToggler] = useState({
    activeToggle: getDefaultToggle(togglerItems)
  });

  const handleTogglerClick = toggle => () => {
    setStateToggler({
      activeToggle: toggle
    });
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
        toggle: togglerItems[activeToggle]
      })}
    </section>
  );
}

TogglerTabs.propTypes = {
  children: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
  tabsItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  togglerItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired
    })
  ).isRequired
};

export default TogglerTabs;
