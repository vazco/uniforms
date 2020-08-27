import React, { ReactNode, useContext } from 'react';

import styles from '../index.module.css';
import { useFrameAutoResize } from '../lib/autoresize';
import { themeContext } from '../lib/universal';
import { PlaygroundWrap } from './Playground';

export type FormWrapperProps = {
  children: ReactNode;
};

export function FormWrapper(props: FormWrapperProps) {
  const theme = useContext(themeContext);
  const frameProps = useFrameAutoResize([props.children]);

  return (
    <div className={styles['form-wrapper']}>
      <PlaygroundWrap frameProps={frameProps} theme={theme} {...props} />
    </div>
  );
}
