import React from 'react';

export default function TabsHeaderItem({ children, active, onClick }) {
  return (
    <span className={`item${active ? ' active' : ''}`} onClick={onClick}>
      {children}
    </span>
  );
}
