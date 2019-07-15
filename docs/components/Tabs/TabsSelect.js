import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TabsSelect({ tabs, children }) {
  const [state, setState] = useState({ activeKey: 0 });
  const { activeKey } = state;

  function handleSelect(key) {
    return () => {
      setState({
        activeKey: key
      });
    };
  }

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
