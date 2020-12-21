import invariant from 'invariant';
import { ComponentType, createContext, createElement, useContext } from 'react';

import { connectField } from './connectField';
import { Context, Override } from './types';
import { useField } from './useField';

type AutoFieldProps = Override<
  Record<string, unknown>,
  { component?: Component; name: string }
>;

type Component = ComponentType<any> | ReturnType<typeof connectField>;

type ComponentDetector = (
  props: ReturnType<typeof useField>[0],
  uniforms: Context<unknown>,
) => Component;

export function createAutoField(defaultComponentDetector: ComponentDetector) {
  const context = createContext<ComponentDetector>(defaultComponentDetector);

  function AutoField(rawProps: AutoFieldProps) {
    const [props, uniforms] = useField(rawProps.name, rawProps);
    const componentDetector = useContext(context);
    const component = props.component ?? componentDetector(props, uniforms);

    invariant(component, 'AutoField received no component for: %s', props.name);

    return 'options' in component && component.options?.kind === 'leaf'
      ? createElement(component.Component, props)
      : createElement(component, rawProps);
  }

  AutoField.componentDetectorContext = context;
  AutoField.defaultComponentDetector = defaultComponentDetector;

  return AutoField;
}
