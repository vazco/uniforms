import { useCallback, useEffect, useState } from 'react';

const activeTabs: Record<string, number> = Object.create(null);
const handlers: Record<string, ((tab: number) => void)[]> = Object.create(null);

function register(group: string, handler: (tab: number) => void) {
  if (handlers[group] === undefined) {
    activeTabs[group] = 0;
    handlers[group] = [];
  }

  handlers[group].push(handler);

  return () => {
    handlers[group].splice(handlers[group].indexOf(handler), 1);
  };
}

function trigger(group: string, activeTab: number) {
  activeTabs[group] = activeTab;
  handlers[group].forEach(handler => {
    handler(activeTab);
  });
}

export function useTabs(group: string) {
  const [activeTab, setActiveTab] = useState(activeTabs[group] || 0);
  const onTab = useCallback(activeTab => trigger(group, activeTab), [group]);
  useEffect(() => register(group, setActiveTab), [group]);
  return { activeTab, onTab };
}
