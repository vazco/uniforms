import { filterDOMProps } from 'uniforms';

// There's no possibility to retrieve them at runtime.
declare module 'uniforms' {
  interface FilterDOMProps {
    decimal: never;
    minCount: never;
    maxCount: never;
  }
}

filterDOMProps.register('decimal', 'minCount', 'maxCount');
