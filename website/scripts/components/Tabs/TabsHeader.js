import React from 'react';
import PropTypes from 'prop-types';
import TabsHeaderItem from './TabsHeaderItem';

function TabsHeader({ items, activeTab, onTab }) {
  return (
    <div className="Tabs">
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

TabsHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  activeTab: PropTypes.number.isRequired,
  onTab: PropTypes.func.isRequired
};

export default TabsHeader;
