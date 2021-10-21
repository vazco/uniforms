import { render as renderOnScreen } from '@testing-library/react';
import React, { ReactElement } from 'react';
import SimpleSchema, { SimpleSchemaDefinition } from 'simpl-schema';
import { BaseForm, context, Context, randomIds } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const randomId = randomIds();

export function render(
  element: ReactElement,
  schema: SimpleSchemaDefinition,
  contextValueExtension?: Partial<Context<unknown>>,
) {
  const contextValue = {
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
    ...contextValueExtension,
    schema: new SimpleSchema2Bridge(new SimpleSchema(schema)),
    state: {
      disabled: false,
      label: false,
      placeholder: false,
      readOnly: false,
      showInlineError: false,
      ...contextValueExtension?.state,
    },
    formRef: {} as BaseForm<unknown>,
  };

  return renderOnScreen(element, {
    wrapper({ children }) {
      return (
        <context.Provider value={contextValue}>{children}</context.Provider>
      );
    },
  });
}
