import React from 'react';
import PropTypes from 'prop-types';

import TabsHeader from './TabsHeader';
import { useTabs } from './state';

function TabsSelect({ children, group, tabs }) {
  const { activeTab, onTab } = useTabs(group);

  return (
    <>
      <TabsHeader activeTab={activeTab} items={tabs} onTab={onTab} />
      {children(tabs[activeTab])}
    </>
  );
}

TabsSelect.propTypes = {
  children: PropTypes.func,
  group: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TabsSelect;
