import ConfigProvider from 'antd/lib/config-provider';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import React, { useRef, useState, useEffect } from 'react';

import './FormWrapper.css';
import styles from './styles';
import { themeContext } from './ThemeContext';

const INITIAL_HEIGHT = 300;

export default function FormWrapper({ children }) {
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const iframeRef = useRef();
  const theme = React.useContext(themeContext);
  const content = (
    <React.Fragment>
      {children}
      {styles[theme]}
    </React.Fragment>
  );

  function handleResize(iframeRef) {
    if (
      iframeRef.current &&
      iframeRef.current.node.contentDocument &&
      iframeRef.current.node.contentDocument.body.scrollHeight !== 0
    ) {
      setHeight(iframeRef.current.node.contentDocument.body.scrollHeight);
    }
  }
  useEffect(() => handleResize(iframeRef), [children]);

  let form = (
    <Frame
      children={content}
      className="iframe"
      onLoad={() => handleResize(iframeRef)}
      ref={iframeRef}
      style={{ height }}
    />
  );

  if (theme === 'material') {
    form = <section className="iframe" children={content} />;
  } else if (theme === 'antd') {
    form = (
      <Frame
        children={content}
        className="iframe"
        onLoad={() => handleResize(iframeRef)}
        ref={iframeRef}
        style={{ height }}
      >
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

  return <div className="FormWrapper">{form}</div>;
}
