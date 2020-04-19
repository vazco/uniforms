import invariant from 'invariant';
import { useContext } from 'react';

import { Context } from './types';
import { context as contextReference } from './context';

export function useForm<Model>(): Context<Model> {
  const context = useContext(contextReference);
  invariant(context !== null, 'useForm must be used within a form.');
  return context;
}
