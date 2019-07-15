import Frame from 'react-frame-component';
import React, { Component } from 'react';

import './FrameWrapper.css';
import styles from './styles';

export default class FrameWrapper extends Component {
  render() {
    const { children, theme } = this.props;
    const content = (
      <React.Fragment>
        {children}
        {styles[theme]}
      </React.Fragment>
    );

    if (theme === 'material') {
      return <section children={content} />;
    }

    return <Frame className="FrameWrapper" children={content} />;
  }
}
