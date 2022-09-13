import invariant from 'invariant';
import { useContext } from 'react';

import { context as contextReference } from './context';
import { Context } from './types';

export function useForm<Model>(): Context<Model> {
  const context = useContext(contextReference);
  invariant(
    context !== null,
    `useForm must be used within a form.

Two most common reasons for this error are:
1. Component calling this function doesn't have a parent Form component in the tree.
2. A duplicate uniforms dependency is installed in node_modules.

For more info check FAQ: https://uniforms.tools/docs/faq/#useform-must-be-used-within-a-form
  `,
  );
  return context;
}
