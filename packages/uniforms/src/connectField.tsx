import React, { ComponentType, FunctionComponent } from 'react';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

import contextReference from './context';
import useField from './useField';
import { GuaranteedProps } from './types';

export default function connectField<Props extends Partial<GuaranteedProps>>(
  Component: ComponentType<Props>,
  options?: { includeInChain?: boolean; initialValue?: boolean },
) {
  type FieldProps = { name: string } & Omit<Props, keyof GuaranteedProps>;
  function Field(props: FieldProps) {
    const [fieldProps, context] = useField(props.name, props, options);
    const anyFlowingPropertySet = some(
      context.state,
      (_, key) => props[key] !== null && props[key] !== undefined,
    );

    if (!anyFlowingPropertySet && !options?.includeInChain) {
      return <Component {...((props as unknown) as Props)} {...fieldProps} />;
    }

    const nextContext = { ...context };
    if (anyFlowingPropertySet) {
      nextContext.state = mapValues(nextContext.state, (value, key) =>
        props[key] !== null && props[key] !== undefined ? !!props[key] : value,
      );
    }

    if (options?.includeInChain)
      nextContext.name = nextContext.name.concat(props.name);

    return (
      <contextReference.Provider value={nextContext}>
        <Component {...((props as unknown) as Props)} {...fieldProps} />
      </contextReference.Provider>
    );
  }

  Field.displayName = `${Component.displayName || Component.name}Field`;

  return Field as FunctionComponent<FieldProps>;
}
