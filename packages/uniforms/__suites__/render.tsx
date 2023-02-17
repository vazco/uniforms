import { render as renderOnScreen, RenderResult } from '@testing-library/react';
import React, { ReactElement, cloneElement } from 'react';
import SimpleSchema, { SimpleSchemaDefinition } from 'simpl-schema';
import { BaseForm, Context, UnknownObject, context, randomIds } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const randomId = randomIds();
export function render<P, Model extends UnknownObject>(
  element: ReactElement<P>,
  schema?: SimpleSchemaDefinition,
  contextValueExtension?: Partial<Context<Model>>,
  model = {} as Model,
): RenderResult & { rerenderWithProps: (props: P) => void } {
  const renderResult = renderOnScreen(element, {
    wrapper({ children }) {
      if (schema) {
        const contextValue = {
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
          formRef: {} as BaseForm<UnknownObject>,
        };
        return (
          <context.Provider value={contextValue}>{children}</context.Provider>
        );
      }
      return <>{children}</>;
    },
  });

  const { rerender } = renderResult;

  const rerenderWithProps = (props: P) => {
    rerender(cloneElement(element, props));
  };

  return { rerenderWithProps, ...renderResult };
}
