import React, { useState } from 'react';
import './Toggler.css';
import TogglerHeaderItem from './TogglerHeaderItem';
import PropTypes from 'prop-types';

function getDefaultToggle(items) {
  return items.find(({ active }) => active === true) || items[0] || {};
}

function TogglerHeader({ items }) {
  const [state, setState] = useState({
    activeKey: getDefaultToggle(items).key,
    activeComponent: getDefaultToggle(items).component
  });

  const toggleClick = (key, component) => () => {
    setState({
      activeKey: key,
      activeComponent: component
    });
  };

  const { activeKey, activeComponent } = state;
  return (
    <>
      <section className="Toggler header">
        {items.map(({ key, tooltipText, icon, component }) => (
          <TogglerHeaderItem
            key={key}
            icon={icon}
            tooltipText={tooltipText}
            active={activeKey === key}
            onClick={toggleClick(key, component)}
          />
        ))}
      </section>
      <section>{activeComponent}</section>
    </>
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
