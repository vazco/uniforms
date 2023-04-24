import { render } from '@testing-library/react';
import React, { ComponentType } from 'react';
import { ZodBridge } from 'uniforms-bridge-zod';
import z from 'zod';

export function testValidatedQuickForm(ValidatedQuickForm: ComponentType<any>) {
  test('<ValidatedQuickForm> - renders', () => {
    const schema = z.object({});
    const bridge = new ZodBridge(schema);
    const screen = render(
      <ValidatedQuickForm data-testid="form" schema={bridge} />,
    );
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
}
