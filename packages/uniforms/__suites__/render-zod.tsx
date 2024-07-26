import { render as renderOnScreen } from '@testing-library/react';
import React, { ComponentProps, ReactElement } from 'react';
import { ZodBridge } from 'uniforms-bridge-zod';
import { AutoForm } from 'uniforms-unstyled';
import { ZodObject, ZodRawShape } from 'zod';

export function renderWithZod<Props, Schema extends ZodObject<ZodRawShape>>({
  element,
  schema,
  ...autoFormProps
}: {
  element: ReactElement<Props>;
  schema: Schema;
} & Partial<Omit<ComponentProps<typeof AutoForm>, 'schema'>>) {
  return renderOnScreen(element, {
    wrapper({ children }) {
      const bridge = new ZodBridge({ schema });
      return (
        // @ts-expect-error
        <AutoForm {...autoFormProps} schema={bridge} children={children} />
      );
    },
  });
}
