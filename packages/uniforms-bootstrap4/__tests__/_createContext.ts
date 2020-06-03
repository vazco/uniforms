import { Context, randomIds } from 'uniforms';

import createSchema from './_createSchema';

const randomId = randomIds();

export default function createContext(
  schema?: {},
  context?: Partial<Context<any>>,
): { context: Context<any> } {
  return {
    context: {
      changed: false,
      changedMap: {},
      error: null,
      model: {},
      name: [],
      onChange() {},
      onSubmit() {},
      randomId,
      submitting: false,
      validating: false,
      ...context,
      schema: createSchema(schema),
      state: {
        disabled: false,
        label: false,
        placeholder: false,
        showInlineError: false,
        ...context?.state,
      },
    },
  };
}
