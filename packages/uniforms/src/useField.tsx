import get from 'lodash/get';
import invariant from 'invariant';
import mapValues from 'lodash/mapValues';
import { useCallback, useContext, useEffect, useMemo } from 'react';

import contextReference from './context';
import joinName from './joinName';
import { Context, GuaranteedProps } from './types';

function propagate(
  prop: unknown,
  schema: unknown,
  state: boolean,
  fallback: string,
): [string, string] {
  const schemaDisabled = schema === false || schema === '';
  const schemaValue =
    typeof schema === 'string' ? schema : schemaDisabled ? '' : fallback;
  const resultValue =
    typeof prop === 'string'
      ? prop
      : prop === false || (prop === undefined && !state) || schemaDisabled
      ? ''
      : schemaValue;
  return [resultValue, schemaValue];
}

export default function useField<
  Props extends Record<string, any>,
  Value = Props['value'],
>(
  fieldName: string,
  props: Props,
  options?: { initialValue?: boolean },
) {
  const context = useContext(contextReference) as Context;
  invariant(context !== null, 'useField must be used within a form.');

  const name = joinName(context.name, fieldName);
  const state = mapValues(context.state, (prev, key) => {
    const next = props[key];
    return next === null || next === undefined ? prev : !!next;
  });

  const changed = !!get(context.changedMap, name);
  const error = context.schema.getError(name, context.error);
  const errorMessage = context.schema.getErrorMessage(name, context.error);
  const field = context.schema.getField(name);
  const fieldType = context.schema.getType(name);
  const fields = context.schema.getSubfields(name);
  const schemaProps = context.schema.getProps(name, { ...state, ...props });

  const [label, labelFallback] = propagate(
    props.label,
    schemaProps.label,
    state.label,
    '',
  );
  const [placeholder] = propagate(
    props.placeholder,
    schemaProps.placeholder,
    state.placeholder,
    label || labelFallback,
  );

  const id = useMemo(() => context.randomId(), []);
  const onChange = useCallback(
    (value?: Value, key: string = name) => {
      context.onChange(key, value);
    },
    [context.onChange, name],
  );

  let value: Value | undefined = props.value ?? get(context.model, name);
  if (options?.initialValue !== false) {
    let initialValue;

    if ((schemaProps.required ?? props.required) && value === undefined) {
      value = context.schema.getInitialValue(name, props);
      initialValue = value;
    } else if (props.value !== undefined && props.value !== value) {
      initialValue = props.value;
    }

    useEffect(() => {
      if (initialValue !== undefined) onChange(initialValue);
    }, []);
  }

  const fieldProps: GuaranteedProps<Value> & Props = {
    id,
    ...state,
    changed,
    error,
    errorMessage,
    field,
    fieldType,
    fields,
    onChange,
    value,
    ...schemaProps,
    ...props,
    label,
    name,
    placeholder,
  };

  return [fieldProps, context] as [typeof fieldProps, typeof context];
}
