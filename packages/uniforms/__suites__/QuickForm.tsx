import { render } from '@testing-library/react';
import React from 'react';
import type { QuickForm as QuickFormType } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import z from 'zod';

export function testQuickForm(QuickForm: QuickFormType) {
  const bridge = new ZodBridge({ schema: z.object({}) });

  test('<QuickForm> - renders', () => {
    const { container } = render(<QuickForm schema={bridge} />);
    expect(container.getElementsByTagName('form')).toHaveLength(1);
  });
}
