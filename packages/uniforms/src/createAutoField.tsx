import invariant from 'invariant';
import {
  ComponentType,
  ReactElement,
  createContext,
  createElement,
  useContext,
} from 'react';

import { connectField } from './connectField';
import { Context } from './types';
import { useField } from './useField';

export type AutoFieldProps = {
  component?: Component;
  name: string;
  [prop: string]: unknown;
};

/** @internal */
export type Component = ComponentType<any> | ReturnType<typeof connectField>;

/** @internal */
export type ComponentDetector = (
  props: ReturnType<typeof useField>[0],
  uniforms: Context<Record<string, unknown>>,
) => Component;

export function createAutoField(defaultComponentDetector: ComponentDetector) {
  const context = createContext<ComponentDetector>(defaultComponentDetector);

  function AutoField(rawProps: AutoFieldProps): ReactElement {
    const [props, uniforms] = useField(rawProps.name, rawProps);
    const componentDetector = useContext(context);
    const component = props.component ?? componentDetector(props, uniforms);

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
