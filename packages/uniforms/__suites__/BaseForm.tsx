import { render } from '@testing-library/react';
import React, { ComponentType } from 'react';
import { ZodBridge } from 'uniforms-bridge-zod';
import z from 'zod';

export function testBaseForm(BaseForm: ComponentType<any>) {
  test('<BaseForm> - renders', () => {
    const schema = z.object({});
    const bridge = new ZodBridge({ schema });
    const screen = render(<BaseForm data-testid="form" schema={bridge} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
}
