import React, { useState } from 'react';
import './Toggler.css';
import TogglerHeaderItem from './TogglerHeaderItem';

function getDefaultToggle(items) {
  return items
    .filter(({ active }) => active)
    .reduce((acc, { key }) => Object.assign(acc, { [key]: true }), {});
}

function TogglerHeader({ items }) {
  const [state, setState] = useState(getDefaultToggle(items));

  const toggleClick = key => () => {
    setState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <>
      <section className="Toggler header">
        {items.map(({ key, tooltipText, icon }) => (
          <TogglerHeaderItem
            key={key}
            icon={icon}
            tooltipText={tooltipText}
            active={state[key]}
            onClick={toggleClick(key)}
          />
        ))}
      </section>
      <section>
        {items
          .filter(({ key }) => state[key] === true)
          .map(({ key, component }) => (
            <span key={key}>{component}</span>
          ))}
      </section>
    </>
  );
}

export default TogglerHeader;
