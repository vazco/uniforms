import { HTMLProps, ReactNode, SyntheticEvent } from 'react';

import { BaseForm } from './BaseForm';
import { Bridge } from './Bridge';

export type ChangedMap<T> = T extends object
  ? { [P in keyof T]?: ChangedMap<T[P]> }
  : Record<string, void>;

export type Context<Model> = {
  changed: boolean;
  changedMap: ChangedMap<Model>;
  error: any;
  formRef: BaseForm<Model>;
  model: DeepPartial<Model>;
  name: string[];
  onChange: (key: string, value: any) => void;
  onSubmit: (event?: SyntheticEvent) => any | Promise<any>;
  randomId: () => string;
  schema: Bridge;
  state: {
    disabled: boolean;
    label: boolean;
    placeholder: boolean;
    readOnly: boolean;
    showInlineError: boolean;
  };
  submitting: boolean;
  submitted: boolean;
  validating: boolean;
};

/** @internal */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type FieldProps<Value, Base, Extension = object> = Override<
  Base,
  GuaranteedProps<Value> & Extension
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FilterDOMProps {}

export type GuaranteedProps<Value> = {
  changed: boolean;
  disabled: boolean;
  error?: any;
  errorMessage?: string;
  field: any;
  fieldType: any;
  fields: string[];
  id: string;
  label: ReactNode;
  name: string;
  onChange: OnChange<Value | undefined>;
  placeholder: string;
  readOnly: boolean;
  showInlineError: boolean;
  value?: Value;
};

type OnChange<Value> = {
  (value: Value): void;
  (value: any, name: string): void;
};

export type HTMLFieldProps<Value, Element, Extension = object> = FieldProps<
  Value,
  HTMLProps<Element>,
  Extension
>;

export type ModelTransformMode = 'form' | 'submit' | 'validate';

/** @internal */
export type Override<T, U> = T extends any ? U & Omit<T, keyof U> : never;

export type ValidateMode = 'onChange' | 'onChangeAfterSubmit' | 'onSubmit';

// Explicit declaration to allow users extend it directly.
// Would it be possible not to use `declare` here?
declare module '.' {
  interface FilterDOMProps {
    allowedValues: never;
    changed: never;
    component: never;
    disabled: never;
    error: never;
    errorMessage: never;
    field: never;
    fieldType: never;
    fields: never;
    initialCount: never;
    label: never;
    name: never;
    onChange: never;
    placeholder: never;
    readOnly: never;
    showInlineError: never;
    transform: never;
    value: never;
  }
}
