import { render as renderOnScreen, RenderResult } from '@testing-library/react';
import React, { ReactElement, cloneElement } from 'react';
import SimpleSchema, { SimpleSchemaDefinition } from 'simpl-schema';
import { Context, UnknownObject } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms-unstyled';

export function render<P, Model extends UnknownObject>(
  element: ReactElement<P>,
  schema?: SimpleSchemaDefinition,
  contextValueExtension?: Pick<Partial<Context<Model>>, 'onChange'>,
  model = {} as Model,
): RenderResult & { rerenderWithProps: (props: P) => void } {
  const renderResult = renderOnScreen(element, {
    wrapper({ children }) {
      if (schema) {
        const bridge = new SimpleSchema2Bridge({
          schema: new SimpleSchema(schema),
        });
        return (
          <AutoForm
            onChange={contextValueExtension?.onChange}
            model={model}
            schema={bridge}
          >
            {children}
          </AutoForm>
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
