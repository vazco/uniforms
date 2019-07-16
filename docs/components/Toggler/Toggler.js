import React, { useState } from 'react';
import TogglerHeader from './TogglerHeader';
import PropTypes from 'prop-types';

function getDefaultToggle(items) {
  return items.find(({ active }) => active === true) || items[0] || {};
}

function Toggler({ items }) {
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
      <TogglerHeader
        items={items}
        activeKey={activeKey}
        onClick={toggleClick}
      />
      <section>{activeComponent}</section>
    </>
  );
}

Toggler.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      component: PropTypes.element.isRequired
    })
  ).isRequired
};

export default Toggler;
