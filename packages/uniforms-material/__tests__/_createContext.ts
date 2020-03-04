import { randomIds } from 'uniforms';

import createSchema from './_createSchema';

type createContextProps = { state?: any; [key: string]: any; model?: any };

const randomId = randomIds();

const createContext = (schema, context: createContextProps) => ({
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
      disabled: false,
      submitting: false,
      label: false,
      placeholder: false,
      showInlineError: false,

      ...(context && context.state),
    },
  },
});

export default createContext;
