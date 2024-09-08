import { HTMLProps, ReactNode, SyntheticEvent } from 'react';

import { BaseForm } from './BaseForm';
import { Bridge } from './Bridge';

export type ChangedMap<T> = T extends object
  ? { [P in keyof T]?: ChangedMap<T[P]> }
  : Record<string, void>;

export type Context<Model extends UnknownObject> = {
  changed: boolean;
  changedMap: ChangedMap<Model>;
  error: unknown;
  formRef: BaseForm<Model>;
  model: Model;
  name: string[];
  onChange: (key: string, value: unknown) => void;
  onSubmit: (event?: SyntheticEvent) => unknown | Promise<unknown>;
  randomId: () => string;
  schema: Bridge;
  state: {
    disabled: boolean;
    readOnly: boolean;
    showInlineError: boolean;
  };
  submitting: boolean;
  submitted: boolean;
  validating: boolean;
};

export type FieldProps<Value, Base, Extension = object> = Override<
  Base,
  GuaranteedProps<Value> & Extension
>;

export interface FilterDOMProps {}

export type GuaranteedProps<Value> = {
  changed: boolean;
  disabled: boolean;
  error?: unknown;
  errorMessage?: string;
  field: unknown;
  fieldType: unknown;
  fields: string[];
  id: string;
  label?: ReactNode;
  name: string;
  onChange: OnChange<Value | undefined>;
  readOnly: boolean;
  showInlineError: boolean;
  value?: Value;
};

/** @internal */
export type OnChange<Value> = {
  (value: Value): void;
  (value: unknown, name: string): void;
};

export type HTMLFieldProps<Value, Element, Extension = object> = FieldProps<
  Value,
  HTMLProps<Element>,
  Extension
>;

export type ModelTransformMode = 'form' | 'submit' | 'validate';

/** @internal */
export type Override<T, U> = T extends any ? U & Omit<T, keyof U> : never;

/** @internal */
export type UnknownObject = Record<string, unknown>;

export type ValidateMode = 'onChange' | 'onChangeAfterSubmit' | 'onSubmit';

// Explicit declaration to allow users extend it directly.
// Would it be possible not to use `declare` here?
declare module '.' {
  interface FilterDOMProps {
    changed: never;
    component: never;
    disabled: never;
    error: never;
    errorMessage: never;
    field: never;
    fieldType: never;
    fields: never;
    name: never;
    onChange: never;
    readOnly: never;
    showInlineError: never;
    value: never;
  }
}
