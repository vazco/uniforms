import PropTypes from 'prop-types';
import React, { useState } from 'react';

import TogglerHeader from './TogglerHeader';
import { getDefaultToggle } from './index.js';

function Toggler({ items }) {
  const [{ activeToggle }, setState] = useState({
    activeToggle: getDefaultToggle(items)
  });

  const toggleClick = toggle => () => {
    setState({
      activeToggle: toggle
    });
  };

  return (
    <>
      <TogglerHeader
        items={items}
        activeToggle={activeToggle}
        onClick={toggleClick}
      />
      <section>{items[activeToggle].component}</section>
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
