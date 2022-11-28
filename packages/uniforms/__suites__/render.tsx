import { render as renderOnScreen, RenderResult } from '@testing-library/react';
import React, { cloneElement, ReactElement } from 'react';
import SimpleSchema, { SimpleSchemaDefinition } from 'simpl-schema';
import { BaseForm, context, Context, randomIds } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const randomId = randomIds();

export function render(
  element: ReactElement,
  schema: SimpleSchemaDefinition,
  contextValueExtension?: Partial<Context<unknown>>,
  initialModel?: object,
): RenderResult & {
  rerenderWithProps: (props: Record<any, any>) => void;
} {
  const contextValue = {
    changed: false,
    changedMap: {},
    error: null,
    model: initialModel ?? {},
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

  const originalRender = renderOnScreen(element, {
    wrapper({ children }) {
      return (
        <context.Provider value={contextValue}>{children}</context.Provider>
      );
    },
  });

  const { rerender } = originalRender;

  const rerenderWithProps = (props: Record<any, any>) => {
    rerender(cloneElement(element, props));
  };

  return { rerenderWithProps, ...originalRender };
}
