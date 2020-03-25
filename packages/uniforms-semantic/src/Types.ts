import { ComponentType } from 'react';

type AutoFieldProps = {
  component?: ComponentType<any>;
  name: string;
} & Record<string, unknown>;

export { AutoFieldProps };
