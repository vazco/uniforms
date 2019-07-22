import { useCallback, useEffect, useState } from 'react';

const activeTabs = {};
const handlers = {};

function register(group, handler) {
  if (handlers[group] === undefined) {
    activeTabs[group] = 0;
    handlers[group] = [];
  }

  handlers[group].push(handler);

  return () => {
    handlers[group].splice(handlers[group].indexOf(handler), 1);
  };
}

function trigger(group, activeTab) {
  activeTabs[group] = activeTab;
  handlers[group].forEach(handler => {
    handler(activeTab);
  });
}

export function useTabs(group) {
  const [activeTab, setActiveTab] = useState(activeTabs[group] || 0);
  const onTab = useCallback(activeTab => trigger(group, activeTab), [group]);
  useEffect(() => register(group, setActiveTab), [group]);
  return { activeTab, onTab };
}
