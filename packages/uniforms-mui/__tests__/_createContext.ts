import { BaseForm, Context, randomIds } from 'uniforms';

import createSchema from './_createSchema';

const randomId = randomIds();

export default function createContext(
  schema?: object,
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
      submitted: false,
      submitting: false,
      validating: false,
      ...context,
      schema: createSchema(schema),
      state: {
        disabled: false,
        label: false,
        placeholder: false,
        readOnly: false,
        showInlineError: false,
        ...context?.state,
      },
      formRef: {} as BaseForm<unknown>,
    },
  };
}
