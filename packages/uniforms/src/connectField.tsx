import React, { ComponentType, FunctionComponent } from 'react';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

import { GuaranteedProps, Override } from './types';
import { context as contextReference } from './context';
import { useField } from './useField';

export function connectField<
  Props extends Partial<GuaranteedProps<Value>>,
  Value = Props['value']
>(Component: ComponentType<Props>, options?: { initialValue?: boolean }) {
  type FieldProps = Override<
    Props,
    Override<
      Partial<GuaranteedProps<Value> & typeof Component['defaultProps']>,
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
      (_, key) => props[key] !== null && props[key] !== undefined,
    );

    if (!anyFlowingPropertySet && !hasChainName) {
      return <Component {...((props as unknown) as Props)} {...fieldProps} />;
    }

    const nextContext = { ...context };
    if (anyFlowingPropertySet) {
      nextContext.state = mapValues(nextContext.state, (value, key) =>
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

  return Field as FunctionComponent<FieldProps>;
}
