import invariant from 'invariant';
import { useContext } from 'react';

import { context as contextReference } from './context';
import { Context } from './types';

export function useForm<Model>(): Context<Model> {
  const context = useContext(contextReference);
  invariant(context !== null, 'useForm must be used within a form.');
  return context;
}
