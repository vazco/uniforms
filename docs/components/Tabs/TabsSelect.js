import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const state = { activeKey: 0 };
const handlers = [];

function handleSelect(activeKey) {
  return () => {
    handlers.forEach(handler => {
      handler({ activeKey });
    });
  };
}

function TabsSelect({ tabs, children }) {
  const [{ activeKey }, setState] = useState(state);
  useEffect(() => {
    handlers.push(setState);
    return () => {
      handlers.splice(handlers.indexOf(setState), 1);
    };
  }, []);

  return (
    <>
      <div className={'Tabs'}>
        {tabs.map(({ name }, key) => (
          <span
            className={`TabsSelect ${activeKey === key ? 'active' : ''}`}
            key={name}
            onClick={handleSelect(key)}
          >
            {name}
          </span>
        ))}
      </div>
      <div>{children(tabs[activeKey])}</div>
    </>
  );
}

TabsSelect.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.element,
      name: PropTypes.string
    })
  ).isRequired
};

export default TabsSelect;
