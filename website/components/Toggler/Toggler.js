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

export default Toggler;
