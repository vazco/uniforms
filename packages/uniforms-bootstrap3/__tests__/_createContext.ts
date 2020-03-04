import { randomIds } from 'uniforms';

import createSchema from './_createSchema';

const randomId = randomIds();

type createContextProps = { state?: any; [key: string]: any; model?: any };

const createContext = (
  schema,
  context: createContextProps = { state: {} },
) => ({
  context: {
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

      ...(context && context.state),
    },
  },
});

export default createContext;
