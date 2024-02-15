import { render, screen } from '@testing-library/react';
import React from 'react';
import type { QuickForm as QuickFormType } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import z from 'zod';

export function testQuickForm(QuickForm: QuickFormType) {
  // @ts-expect-error QuickForm is not a valid Component.
  class TestForm extends QuickForm<any> {
    // eslint-disable-next-line react/display-name
    getAutoField = () => () => <i className="auto" />;
    // eslint-disable-next-line react/display-name
    getErrorsField = () => () => <i className="errors" />;
    // eslint-disable-next-line react/display-name
    getSubmitField = () => () => <i className="submit" />;
  }

  const schema = z.object({
    a: z.string(),
    b: z.string(),
    c: z.string(),
  });
  const bridge = new ZodBridge({ schema });

  test('<QuickForm> - renders', () => {
    render(<QuickForm data-testid="form" schema={bridge} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  test('<QuickForm> - when rendered with custom fields, renders `AutoField` for each field', () => {
    const { container } = render(<TestForm schema={bridge} />);

    expect(container.getElementsByClassName('auto').length).toBe(3);
  });

  test('<QuickForm> - when rendered with custom fields, renders `ErrorField`', () => {
    const { container } = render(<TestForm schema={bridge} />);

    expect(container.getElementsByClassName('errors').length).toBe(1);
  });

  test('<QuickForm> - when rendered with custom fields, renders `SubmitField`', () => {
    const { container } = render(<TestForm schema={bridge} />);

    expect(container.getElementsByClassName('submit').length).toBe(1);
  });

  test('<QuickForm> - when rendered with custom fields in `props`, renders `ErrorsField`', () => {
    const { container } = render(
      <TestForm
        schema={bridge}
        errorsField={() => <i className="errorsOverride" />}
      />,
    );

    expect(container.getElementsByClassName('errorsOverride').length).toBe(1);
  });

  test('<QuickForm> - when rendered with custom fields in `props`, renders `SubmitField`', () => {
    const { container } = render(
      <TestForm
        schema={bridge}
        submitField={() => <i className="submitOverride" />}
      />,
    );

    expect(container.getElementsByClassName('submitOverride').length).toBe(1);
  });

  test('<QuickForm> - renders children', () => {
    const { container } = render(
      <QuickForm schema={bridge}>
        <div />
      </QuickForm>,
    );

    expect(container.getElementsByTagName('div').length).toBe(1);
  });
}
