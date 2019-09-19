import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import TogglerHeaderItem from './TogglerHeaderItem';
import styles from './Toggler.module.css';

function TogglerHeader({ items, activeToggle, onClick }) {
  return (
    <section className={classNames(styles.toggler, styles.header)}>
      {items.map(({ tooltipText, icon }, key) => {
        return (
          <TogglerHeaderItem
            key={key}
            icon={icon}
            tooltipText={tooltipText}
            active={activeToggle === key}
            onClick={onClick(key)}
          />
        );
      })}
    </section>
  );
}

TogglerHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tooltipText: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired
    })
  ).isRequired,
  activeToggle: PropTypes.number,
  onClick: PropTypes.func
};

export default TogglerHeader;
