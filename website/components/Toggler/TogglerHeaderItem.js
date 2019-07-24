import React from 'react';

function TogglerHeaderItem({ icon, active, tooltipText, ...rest }) {
  return (
    <span {...rest} className={`tooltip item ${active && 'active'}`}>
      {tooltipText && <span className="tooltip-text">{tooltipText}</span>}
      {icon}
    </span>
  );
}

export default TogglerHeaderItem;
