import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { joinName } from './joinName';
import { GuaranteedProps, OnChange, UnknownObject } from './types';
import { useForm } from './useForm';

export function useField<
  // This type has to use `any` to allow any object.
  Props extends Record<string, any>,
  Value = Props['value'],
  Model extends UnknownObject = UnknownObject,
>(
  fieldName: string,
  props: Props,
  options?: { absoluteName?: boolean; initialValue?: boolean },
) {
  const context = useForm<Model>();
  const name = joinName(options?.absoluteName ? '' : context.name, fieldName);
  const field = context.schema.getField(name);

  const usesInitialValue = options?.initialValue !== false;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onChangeCalled = usesInitialValue ? useRef(false) : { current: false };

  const state = mapValues(context.state, (prev, key) => {
    const next = props[key];
    return next !== null && next !== undefined ? !!next : prev;
  });

  const changed = !!get(context.changedMap, name);
  const error = context.schema.getError(name, context.error);
  const errorMessage = context.schema.getErrorMessage(name, context.error);
  const fieldType = context.schema.getType(name);
  const fields = context.schema.getSubfields(name);
  const schemaProps = context.schema.getProps(name);

  const label = props.label ?? schemaProps.label ?? '';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const id = useMemo(() => context.randomId(), []);
  const onChange: OnChange<Value | undefined> = useCallback(
    (value, key: string = name) => {
      onChangeCalled.current = true;
      context.onChange(key, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.onChange, name],
  );

  // @ts-expect-error The `props` should be typed more precisely.
  const valueFromModel: Value | undefined = get(context.model, name);
  let initialValue: Value | undefined;
  let value: Value | undefined = props.value ?? valueFromModel;

  if (usesInitialValue) {
    if (!onChangeCalled.current) {
      if (value === undefined) {
        value = context.schema.getInitialValue(name) as Value | undefined;
        initialValue = value;
      } else if (props.value !== undefined && props.value !== valueFromModel) {
        initialValue = props.value;
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const required = props.required ?? schemaProps.required;
      if (required && initialValue !== undefined) {
        onChange(initialValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };
  return [fieldProps, context] as [typeof fieldProps, typeof context];
}
