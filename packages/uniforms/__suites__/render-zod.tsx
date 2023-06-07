import { render as renderOnScreen } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { BaseForm, Context, context, randomIds } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import { TypeOf, ZodObject, ZodRawShape } from 'zod';

export function renderWithZod<Props, Schema extends ZodObject<ZodRawShape>>({
  element,
  schema,
  ...contextValueOverride
}: {
  element: ReactElement<Props>;
  schema: Schema;
} & Omit<Partial<Context<TypeOf<Schema>>>, 'schema'>) {
  return renderOnScreen(element, {
    wrapper({ children }) {
      if (!schema) {
        return <>{children}</>;
      }

      const value = {
        changed: false,
        changedMap: Object.create(null),
        error: null,
        formRef: null as unknown as BaseForm<TypeOf<Schema>>,
        model: Object.create(null),
        name: [],
        onChange() {},
        onSubmit() {},
        randomId: randomIds(),
        submitted: false,
        submitting: false,
        validating: false,
        ...contextValueOverride,
        schema: new ZodBridge({
          schema,
        }),
        state: {
          disabled: false,
          readOnly: false,
          showInlineError: false,
          ...contextValueOverride?.state,
        },
      };

      return <context.Provider children={children} value={value} />;
    },
  });
}
