import React from 'react';
import PropTypes from 'prop-types';

function TabsHeader({ items, activeKey, onClick }) {
  return (
    <div className={'Tabs'}>
      {items.map(({ name }, key) => (
        <span
          className={`TabsSelect ${activeKey === key ? 'active' : ''}`}
          key={key}
          onClick={onClick(key)}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

TabsHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      component: PropTypes.element.isRequired
    })
  ).isRequired
};

export default TabsHeader;
