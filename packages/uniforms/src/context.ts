// FIXME: Finish ESLint configuration for TypeScript.
// eslint-disable-next-line no-unused-vars
import { SyntheticEvent, createContext } from 'react';

// FIXME: Finish ESLint configuration for TypeScript.
// eslint-disable-next-line no-unused-vars
import Bridge from './Bridge';

// TODO: Think about externalizing these types.
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
export type ChangedMap<T> = T extends object
  ? { [P in keyof T]?: ChangedMap<T[P]> }
  : Record<string, void>;

export interface UniformsContext<Model extends object = Record<string, any>> {
  name: string[];
  error: any;
  model: DeepPartial<Model>;
  schema: Bridge;
  state: {
    changed: boolean;
    changedMap: ChangedMap<Model>;
    submitting: boolean;
    label: boolean;
    disabled: boolean;
    placeholder: boolean;
    // TODO: Themes may extend the state.
    [_: string]: unknown;
  };
  onChange(key: string, value: unknown): void;
  onSubmit(event?: SyntheticEvent): Promise<unknown>;
  randomId(): string;
}

// FIXME: This context is nullable. Should we provide a wrapper for useContext?
// @ts-ignore
const none: { uniforms: UniformsContext } = null;

export default createContext<{ uniforms: UniformsContext }>(none);
