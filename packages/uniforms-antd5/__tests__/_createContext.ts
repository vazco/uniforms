import { SimpleSchemaDefinition } from 'simpl-schema';
import { Context, UnknownObject, randomIds, ChangedMap } from 'uniforms';

import createSchema from './_createSchema';

const randomId = randomIds();

export default function createContext<Model extends UnknownObject>(
  schema?: SimpleSchemaDefinition,
  context?: Partial<Context<Model>>,
  model = {} as Model,
): { context: Context<Model> } {
  return {
    context: {
      changed: false,
      changedMap: {} as ChangedMap<Model>,
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
        readOnly: false,
        showInlineError: false,
        ...context?.state,
      },
      // @ts-expect-error We don't have a true ref in tests.
      formRef: null,
    },
  };
}
