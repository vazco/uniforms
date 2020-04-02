import { SyntheticEvent } from 'react';

import Bridge from './Bridge';

export type ChangedMap<T> = T extends {}
  ? { [P in keyof T]?: ChangedMap<T[P]> }
  : Record<string, void>;

export type Context<Model extends {} = Record<string, any>> = {
  changed: boolean;
  changedMap: ChangedMap<Model>;
  error: any;
  model: DeepPartial<Model>;
  name: string[];
  onChange(key: string, value?: any): void;
  onSubmit(event?: SyntheticEvent): any | Promise<any>;
  randomId(): string;
  schema: Bridge;
  state: {
    disabled: boolean;
    label: boolean;
    placeholder: boolean;
    showInlineError: boolean;
  };
  submitting: boolean;
  validating: boolean;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends {} ? DeepPartial<T[P]> : T[P];
};

export type GuaranteedProps<Value> = {
  changed: boolean;
  disabled: boolean;
  error?: any;
  errorMessage?: string;
  field: any;
  fieldType: any;
  fields: string[];
  id: string;
  label: string;
  name: string;
  onChange: (value?: Value, name?: string) => void;
  placeholder: string;
  showInlineError: boolean;
  value?: Value;
};

export type ModelTransformMode = 'form' | 'submit' | 'validate';

export type Partialize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ValidateMode = 'onChange' | 'onChangeAfterSubmit' | 'onSubmit';

export type Override<T, U> = U & Omit<T, keyof U>;
