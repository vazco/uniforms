import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TabsHeader from './TabsHeader';

const state = { activeKey: 0 };
const handlers = {};

function handleSelect(groupByKey, item, activeKey) {
  return () => {
    handlers[groupByKey].forEach(handler => {
      handler({ activeKey });
    });
  };
}

function TabsSelect({ tabs, children, groupByKey = 'default' }) {
  const [{ activeKey }, setState] = useState(state);
  useEffect(() => {
    if (handlers[groupByKey] === undefined) {
      handlers[groupByKey] = [];
    }
    handlers[groupByKey].push(setState);
    return () => {
      handlers[groupByKey].splice(handlers[groupByKey].indexOf(setState), 1);
    };
  }, {});

  return (
    <>
      <TabsHeader
        activeKey={activeKey}
        items={tabs}
        onClick={handleSelect.bind(this, groupByKey)}
      />
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
