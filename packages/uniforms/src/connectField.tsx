import mapValues from 'lodash/mapValues';
import React, { ComponentType, FunctionComponent } from 'react';

import { context as contextReference } from './context';
import { GuaranteedProps, Override } from './types';
import { useField } from './useField';

/** @internal */
export type ConnectFieldOptions = {
  initialValue?: boolean;
  kind?: 'leaf' | 'node';
};

/** @internal */
export type ConnectedFieldProps<
  Props extends Record<string, unknown>,
  Value = Props['value'],
> = Override<
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

/** @internal */
export type ConnectedField<
  Props extends Record<string, unknown>,
  Value = Props['value'],
> = FunctionComponent<ConnectedFieldProps<Props, Value>> & {
  Component: ComponentType<Props>;
  options?: ConnectFieldOptions;
};

export function connectField<
  Props extends Record<string, unknown>,
  Value = Props['value'],
>(
  Component: ComponentType<Props>,
  options?: ConnectFieldOptions,
): ConnectedField<Props, Value> {
  function Field(props: ConnectedFieldProps<Props, Value>) {
    const [fieldProps, context] = useField(props.name, props, options);

    const hasChainName = props.name !== '';
    const anyFlowingPropertySet = Object.keys(context.state).some(key => {
      const next = props[key];
      return next !== null && next !== undefined;
    });

    if (!anyFlowingPropertySet && !hasChainName) {
      return <Component {...(props as unknown as Props)} {...fieldProps} />;
    }

    const nextContext = { ...context };
    if (anyFlowingPropertySet) {
      nextContext.state = mapValues(nextContext.state, (prev, key) => {
        const next = props[key];
        return next !== null && next !== undefined ? !!next : prev;
      });
    }

    if (hasChainName) {
      nextContext.name = nextContext.name.concat(props.name);
    }

    return (
      <contextReference.Provider value={nextContext}>
        <Component {...(props as unknown as Props)} {...fieldProps} />
      </contextReference.Provider>
    );
  }

  Field.displayName = `${Component.displayName || Component.name}Field`;

  return Object.assign(Field, { Component, options });
}
