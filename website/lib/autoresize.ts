import get from 'lodash/get';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

function handleResize(
  ref: RefObject<HTMLIFrameElement | undefined>,
  setHeight: (height: number) => void,
) {
  const scrollHeight = get(
    ref.current,
    'node.contentDocument.body.scrollHeight',
    0,
  );

  if (scrollHeight !== 0) {
    setHeight(scrollHeight);
  }
}

export function useFrameAutoResize(watch: unknown[]) {
  const [height, setHeight] = useState(300);
  const ref = useRef<HTMLIFrameElement | undefined>();
  const onLoad = useCallback(() => handleResize(ref, setHeight), [
    ref,
    setHeight,
  ]);

  useEffect(() => {
    const id = setInterval(onLoad, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, ...watch]);

  return { onLoad, ref, style: { height } };
}
