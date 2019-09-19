import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import get from 'lodash/get';

import styles from './FormWrapper.module.css';
import { PlaygroundWrap } from '../Playground';
import { themeContext } from '../ThemeContext';

function handleResize(ref, setHeight) {
  const scrollHeight = get(
    ref.current,
    'node.contentDocument.body.scrollHeight',
    0
  );

  if (scrollHeight !== 0) setHeight(scrollHeight);
}

function useFrameAutoResize(initialHeight, refreshInterval, watch) {
  const [height, setHeight] = useState(initialHeight);
  const ref = useRef();
  const onLoad = useCallback(() => handleResize(ref, setHeight), [
    ref,
    setHeight
  ]);

  useEffect(() => {
    const id = setInterval(onLoad, refreshInterval);
    return () => clearInterval(id);
  }, watch);

  return { onLoad, ref, style: { height } };
}

const initialHeight = 300;
const refreshInterval = 1000;

export default function FormWrapper(props) {
  const theme = useContext(themeContext);
  const frameProps = useFrameAutoResize(initialHeight, refreshInterval, [
    props.children
  ]);

  return (
    <div className={styles['form-wrapper']}>
      <PlaygroundWrap frameProps={frameProps} theme={theme} {...props} />
    </div>
  );
}
