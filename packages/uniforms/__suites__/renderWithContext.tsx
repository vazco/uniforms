import { render as renderOnScreen } from '@testing-library/react';
import React, { ComponentType, ReactElement } from 'react';
import SimpleSchema from 'simpl-schema';
import { context, Context, randomIds } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const randomId = randomIds();

export default function createContext(
  schema = {},
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
      schema: new SimpleSchema2Bridge(new SimpleSchema(schema)),
      state: {
        disabled: false,
        label: false,
        placeholder: false,
        readOnly: false,
        showInlineError: false,
        ...context?.state,
      },
    },
  };
}

export function render(
  element: ReactElement,
  customContext = createContext({ x: { type: String } }),
) {
  const Wrapper: ComponentType = ({ children }) => (
    <context.Provider value={customContext.context}>
      {children}
    </context.Provider>
  );
  return renderOnScreen(element, { wrapper: Wrapper });
}
