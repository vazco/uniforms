import { SyntheticEvent } from 'react';

import Bridge from './Bridge';
import useField from './useField';

export type ChangedMap<T> = T extends object
  ? { [P in keyof T]?: ChangedMap<T[P]> }
  : Record<string, void>;

export interface Context<Model extends object = Record<string, unknown>> {
  changed: boolean;
  changedMap: ChangedMap<Model>;
  error: unknown;
  model: DeepPartial<Model>;
  name: string[];
  onChange(key: string, value: unknown): void;
  onSubmit(event?: SyntheticEvent): unknown | Promise<unknown>;
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
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type GuaranteedProps = Pick<
  ReturnType<typeof useField>[0],
  | 'changed'
  | 'disabled'
  | 'error'
  | 'errorMessage'
  | 'field'
  | 'fieldType'
  | 'fields'
  | 'id'
  | 'label'
  | 'name'
  | 'onChange'
  | 'placeholder'
  | 'showInlineError'
  | 'value'
>;

export type ModelTransformMode = 'form' | 'submit' | 'validate';

export type Partialize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ValidateMode = 'onChange' | 'onChangeAfterSubmit' | 'onSubmit';
