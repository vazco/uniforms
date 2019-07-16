import React from 'react';
import TogglerHeaderItem from './TogglerHeaderItem';
import PropTypes from 'prop-types';

function TogglerHeader({ items, activeKey, onClick }) {
  return (
    <section className="Toggler header">
      {items.map(({ key, tooltipText, icon, component }) => (
        <TogglerHeaderItem
          key={key}
          icon={icon}
          tooltipText={tooltipText}
          active={activeKey === key}
          onClick={onClick(key, component)}
        />
      ))}
    </section>
  );
}

TogglerHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      component: PropTypes.element.isRequired
    })
  ).isRequired
};

export default TogglerHeader;
