import React, { ComponentType, FunctionComponent } from 'react';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

import contextReference from './context';
import useField from './useField';
import { GuaranteedProps } from './types';

export default function connectField<
  Props extends Partial<GuaranteedProps<Value>>,
  Value = Props['value']
>(
  Component: ComponentType<Props>,
  options?: { includeInChain?: boolean; initialValue?: boolean },
) {
  // prettier-ignore
  type FieldProps =
    & { name: string }
    & Partial<GuaranteedProps<Value>>
    & Omit<Props, keyof GuaranteedProps<Value>>;

  function Field(props: FieldProps) {
    const [fieldProps, context] = useField(props.name, props, options);
    const anyFlowingPropertySet = some(
      context.state,
      (_, key) => props[key] !== null && props[key] !== undefined,
    );

    if (!anyFlowingPropertySet && options?.includeInChain === false) {
      return <Component {...((props as unknown) as Props)} {...fieldProps} />;
    }

    const nextContext = { ...context };
    if (anyFlowingPropertySet) {
      nextContext.state = mapValues(nextContext.state, (value, key) =>
        props[key] !== null && props[key] !== undefined ? !!props[key] : value,
      );
    }

    if (options?.includeInChain !== false)
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
