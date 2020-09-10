import invariant from 'invariant';
import { ComponentType, createContext, createElement, useContext } from 'react';

import { connectField } from './connectField';
import { Override } from './types';
import { useField } from './useField';

type AutoFieldProps = Override<
  Record<string, unknown>,
  { component?: Component; name: string }
>;

type Component = ComponentType<any> | ReturnType<typeof connectField>;

type ComponentDetector = (props: ReturnType<typeof useField>[0]) => Component;

export function createAutoField(defaultComponentDetector: ComponentDetector) {
  const context = createContext<ComponentDetector>(defaultComponentDetector);

  function AutoField(originalProps: AutoFieldProps) {
    const props = useField(originalProps.name, originalProps)[0];
    const componentDetector = useContext(context);
    const component = props.component ?? componentDetector(props);

    invariant(component, 'AutoField received no component for: %s', props.name);

    return 'options' in component && component.options?.kind === 'leaf'
      ? createElement(component.Component, props)
      : createElement(component, originalProps);
  }

  return { AutoField, AutoFieldContext: context };
}
