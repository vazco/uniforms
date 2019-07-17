import React from 'react';
import TogglerHeaderItem from './TogglerHeaderItem';
import PropTypes from 'prop-types';

function TogglerHeader({ items, activeToggle, onClick }) {
  return (
    <section className="Toggler header">
      {items.map(({ tooltipText, icon }, key) => {
        return (
          <TogglerHeaderItem
            key={key}
            icon={icon}
            tooltipText={tooltipText}
            active={activeToggle === key}
            onClick={onClick(key)}
          />
        );
      })}
    </section>
  );
}

TogglerHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      component: PropTypes.element.isRequired
    })
  ).isRequired,
  activeToggle: PropTypes.number,
  onClick: PropTypes.func
};

export default TogglerHeader;
