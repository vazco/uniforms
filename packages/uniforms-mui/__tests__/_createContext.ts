import { SimpleSchemaDefinition } from 'simpl-schema';
import { BaseForm, Context, UnknownObject, randomIds } from 'uniforms';

import createSchema from './_createSchema';

const randomId = randomIds();

export default function createContext<Model extends UnknownObject>(
  schema?: SimpleSchemaDefinition,
  context?: Partial<Context<Model>>,
  model = {} as Model,
) {
  return {
    context: {
      changed: false,
      changedMap: {},
      error: null,
      model,
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
      formRef: {} as BaseForm<Model>,
    } as Context<Model>,
  };
}
