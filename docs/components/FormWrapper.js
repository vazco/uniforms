import Frame from 'react-frame-component';
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
  }

  return <Frame className="FormWrapper" children={content} />;
}
