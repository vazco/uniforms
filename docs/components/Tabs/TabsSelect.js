import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    return () => {
      this.setState({
        activeKey: key
      });
    };
  }

  render() {
    const { tabs, children } = this.props;
    const { activeKey } = this.state;
    return (
      <>
        {tabs.map(({ name }, key) => (
          <span
            className={`TabSelect ${activeKey === key ? 'active' : ''}`}
            key={name}
            onClick={this.handleSelect(key)}
          >
            {name}
          </span>
        ))}
        {children(tabs[activeKey])}
      </>
    );
  }
}

TabsSelect.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.element,
      name: PropTypes.string
    })
  )
};

export default TabsSelect;
