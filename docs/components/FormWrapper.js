import ConfigProvider from 'antd/lib/config-provider';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import React from 'react';

import './FormWrapper.css';
import styles from './styles';
import { themeContext } from './ThemeContext';

export default function FormWrapper({ children }) {
  const theme = React.useContext(themeContext);
  const content = (
    <React.Fragment>
      {children}
      {styles[theme]}
    </React.Fragment>
  );

  if (theme === 'material') {
    return <section className="FormWrapper" children={content} />;
  } else if (theme === 'antd') {
    return (
      <Frame className="FormWrapper">
        <FrameContextConsumer>
          {/* 
            Provides iframe's `window` and `document` instance
            since Ant Design appends `<div>` to default (top most) `document.body`,
            we have to pass `getPopupContainer` `document.body` specific to
            rendered `iframe` in order to work as intended.
          */}
          {({ document }) => (
            <ConfigProvider getPopupContainer={() => document.body}>
              {content}
            </ConfigProvider>
          )}
        </FrameContextConsumer>
      </Frame>
    );
  }

  return <Frame className="FormWrapper" children={content} />;
}
