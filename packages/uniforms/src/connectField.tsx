import mapValues from 'lodash/mapValues';
import some from 'lodash/some';
import React, { ComponentType, FunctionComponent } from 'react';

import { context as contextReference } from './context';
import { GuaranteedProps, Override } from './types';
import { useField } from './useField';

export function connectField<
  Props extends Partial<GuaranteedProps<Value>>,
  Value = Props['value']
>(
  Component: ComponentType<Props>,
  options?: { initialValue?: boolean; kind?: 'leaf' | 'node' },
) {
  type FieldProps = Override<
    Props,
    Override<
      Partial<GuaranteedProps<Value>>,
      {
        label?: Props['label'] | boolean | null | string;
        name: string;
        placeholder?: Props['placeholder'] | boolean | null | string;
      }
    >
  >;

  function Field(props: FieldProps) {
    const [fieldProps, context] = useField(props.name, props, options);

    const hasChainName = props.name !== '';
    const anyFlowingPropertySet = some(
      context.state,
      // @ts-ignore: `props` has no index signature.
      (_, key) => props[key] !== null && props[key] !== undefined,
    );

    if (!anyFlowingPropertySet && !hasChainName) {
      return <Component {...((props as unknown) as Props)} {...fieldProps} />;
    }

    const nextContext = { ...context };
    if (anyFlowingPropertySet) {
      nextContext.state = mapValues(nextContext.state, (value, key) =>
        // @ts-ignore: `props` has no index signature.
        props[key] !== null && props[key] !== undefined ? !!props[key] : value,
      );
    }

    if (hasChainName) {
      nextContext.name = nextContext.name.concat(props.name);
    }

    return (
      <contextReference.Provider value={nextContext}>
        <Component {...((props as unknown) as Props)} {...fieldProps} />
      </contextReference.Provider>
    );
  }

  Field.displayName = `${Component.displayName || Component.name}Field`;

  return Object.assign(Field as FunctionComponent<FieldProps>, {
    Component,
    options,
  });
}
