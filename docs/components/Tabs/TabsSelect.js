import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TabsHeader from './TabsHeader';

const state = { activeKey: 0 };
const handlers = [];

function handleSelect(item, activeKey) {
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
      <TabsHeader activeKey={activeKey} items={tabs} onClick={handleSelect} />
      <div>{children(tabs[activeKey])}</div>
    </>
  );
}

TabsSelect.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.element
    })
  ).isRequired
};

export default TabsSelect;
