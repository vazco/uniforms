import React from 'react';
import TogglerHeaderItem from './TogglerHeaderItem';
import PropTypes from 'prop-types';

function TogglerHeader({ items, activeKey = 0, onClick }) {
  return (
    <section className="Toggler header">
      {items.map((item, key) => {
        const { tooltipText, icon } = item;
        return (
          <TogglerHeaderItem
            key={key}
            icon={icon}
            tooltipText={tooltipText}
            active={activeKey === key}
            onClick={onClick(item, key)}
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
  ).isRequired
};

export default TogglerHeader;
