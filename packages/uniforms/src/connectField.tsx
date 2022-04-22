import mapValues from 'lodash/mapValues';
import React, { ComponentType, FunctionComponent } from 'react';

import { context as contextReference } from './context';
import { Context, GuaranteedProps, Override } from './types';
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

function getNextContext<Model, Props extends Record<string, unknown>, Value>(
  context: Context<Model>,
  props: ConnectedFieldProps<Props, Value>,
  options?: ConnectFieldOptions,
) {
  // Leaf components by definition do not affect the context. `AutoField` will
  // skip most of them anyway, but if rendered directly we have to do it here.
  // An example in the core theme are the `List*Field`s.
  if (options?.kind === 'leaf') {
    return context;
  }

  const changesName = props.name !== '';
  const changesState = Object.keys(context.state).some(key => {
    const next = props[key];
    return next !== null && next !== undefined;
  });

  // There are no other ways of affecting the context.
  if (!changesName && !changesState) {
    return context;
  }

  const nextContext = { ...context };
  if (changesName) {
    nextContext.name = nextContext.name.concat(props.name);
  }

  if (changesState) {
    nextContext.state = mapValues(nextContext.state, (prev, key) => {
      const next = props[key];
      return next !== null && next !== undefined ? !!next : prev;
    });
  }

  return nextContext;
}

export function connectField<
  Props extends Record<string, unknown>,
  Value = Props['value'],
>(
  Component: ComponentType<Props>,
  options?: ConnectFieldOptions,
): ConnectedField<Props, Value> {
  function Field(props: ConnectedFieldProps<Props, Value>) {
    const [fieldProps, context] = useField(props.name, props, options);
    const nextContext = getNextContext(context, props, options);
    const body = <Component {...(props as unknown as Props)} {...fieldProps} />;

    // If the context has not changed, then don't render the `Provider`. It's
    // possible that it will change at some point, but it's extremely rare, as
    // either `name` or one of the "state props" has to change.
    if (context === nextContext) {
      return body;
    }

    return <contextReference.Provider children={body} value={nextContext} />;
  }

  Field.displayName = `${Component.displayName || Component.name}Field`;

  return Object.assign(Field, { Component, options });
}
