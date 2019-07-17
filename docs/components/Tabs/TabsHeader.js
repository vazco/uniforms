import React from 'react';
import PropTypes from 'prop-types';

function TabsHeader({ items, activeKey, onClick }) {
  return (
    <div className={'Tabs'}>
      {items.map((item, key) => (
        <span
          className={`item ${activeKey === key ? 'active' : ''}`}
          key={key}
          onClick={onClick(item, key)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}

TabsHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.element
    })
  ).isRequired
};

TabsHeader.__handlers = {};

export default TabsHeader;
