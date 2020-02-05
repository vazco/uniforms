import React from 'react';
import identity from 'lodash/identity';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

import contextReference from './context';
import useField from './useField';

type GuaranteedProps = ReturnType<typeof useField>[0];

export default function connectField<Props extends {}>(
  Component: React.ComponentType<Props & GuaranteedProps>,
  { includeInChain = false }: { includeInChain?: boolean } = {},
) {
  type FieldProps = Props & { name: string };
  function Field(props: FieldProps) {
    const [fieldProps, context] = useField(props.name, props);
    const anyFlowingPropertySet = some(
      context.state,
      (_, key) => props[key] !== null && props[key] !== undefined,
    );

    if (!anyFlowingPropertySet && !includeInChain)
      return <Component {...props} {...fieldProps} />;

    const nextContext = { ...context };
    if (anyFlowingPropertySet) {
      nextContext.state = mapValues(nextContext.state, (value, key) =>
        props[key] !== null && props[key] !== undefined ? !!props[key] : value,
      );
    }

    if (includeInChain) {
      nextContext.name = nextContext.name.concat(props.name);
    }

    return (
      <contextReference.Provider value={nextContext}>
        <Component {...props} {...fieldProps} />
      </contextReference.Provider>
    );
  }

  Field.displayName = `${Component.displayName || Component.name}Field`;

  return Field as React.FC<FieldProps>;
}
