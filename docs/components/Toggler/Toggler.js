import React, { useState } from 'react';
import TogglerHeader from './TogglerHeader';
import PropTypes from 'prop-types';
import { getDefaultToggle } from './index.js';

function Toggler({ items }) {
  const [state, setState] = useState({
    activeKey: getDefaultToggle(items),
    activeComponent: items[getDefaultToggle(items)].component || items[0]
  });

  const toggleClick = ({ component }, key) => () => {
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
      name: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      component: PropTypes.element.isRequired
    })
  ).isRequired
};

export default Toggler;
