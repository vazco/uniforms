import { SyntheticEvent } from 'react';

import Bridge from './Bridge';

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type ChangedMap<T> = T extends object
  ? { [P in keyof T]?: ChangedMap<T[P]> }
  : Record<string, void>;

export interface Context<Model extends {} = Record<string, unknown>> {
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
