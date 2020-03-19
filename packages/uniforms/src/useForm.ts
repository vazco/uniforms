import invariant from 'invariant';
import { useContext } from 'react';

import contextReference from './context';
import { Context, GuaranteedProps } from './types';

export default function useForm<Model extends {}>() {
  const context = useContext(contextReference) as Context<Model>;
  invariant(context !== null, 'useForm must be used within a form.');
  return context;
}
