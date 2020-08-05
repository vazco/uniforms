import React, { ReactNode, useContext } from 'react';

import styles from '../index.module.css';
import { PlaygroundWrap } from './Playground';
import { themeContext } from '../lib/universal';
import { useFrameAutoResize } from '../lib/autoresize';

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
