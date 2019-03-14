import randomIds from 'uniforms/randomIds';

import createSchema from './_createSchema';

const randomId = randomIds();

const createContext = (schema, context) => ({
  context: {
    uniforms: {
      error: null,
      model: {},
      name: [],
      onChange() {},
      onSubmit() {},

      ...context,

      randomId,
      schema: createSchema(schema),
      state: {
        changedMap: {},

        changed: false,
        submitting: false,
        disabled: false,
        label: false,
        placeholder: false,
        showInlineError: false,

        ...(context && context.state)
      }
    }
  }
});

export default createContext;
