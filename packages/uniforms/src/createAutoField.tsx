import invariant from 'invariant';
import {
  ComponentType,
  ReactElement,
  createContext,
  createElement,
  useContext,
} from 'react';

import { connectField } from './connectField';
import { Context, UnknownObject } from './types';
import { useField } from './useField';

export type AutoFieldProps = UnknownObject & {
  component?: Component;
  experimental_absoluteName?: boolean;
  name: string;
};

/** @internal */
export type Component = ComponentType<any> | ReturnType<typeof connectField>;

/** @internal */
export type ComponentDetector = (
  props: ReturnType<typeof useField>[0],
  uniforms: Context<UnknownObject>,
) => Component;

export function createAutoField(defaultComponentDetector: ComponentDetector) {
  const context = createContext<ComponentDetector>(defaultComponentDetector);

  function AutoField({
    experimental_absoluteName: absoluteName,
    ...rawProps
  }: AutoFieldProps): ReactElement {
    const options = { absoluteName };
    const [props, uniforms] = useField(rawProps.name, rawProps, options);
    const componentDetector = useContext(context);
    const component = componentDetector(props, uniforms);

    invariant(component, 'AutoField received no component for: %s', props.name);

    return 'options' in component && component.options?.kind === 'leaf'
      ? createElement(component.Component, props)
      : createElement(component, rawProps);
  }

  return Object.assign(AutoField, {
    componentDetectorContext: context,
    defaultComponentDetector,
  });
}
