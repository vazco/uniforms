import { render } from '@testing-library/react';
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
    const { container } = render(<QuickForm schema={bridge} />);
    expect(container.getElementsByTagName('form')).toHaveLength(1);
  });

  test('<QuickForm> - when rendered with custom fields, renders `AutoField` for each field', () => {
    const { container } = render(<TestForm schema={bridge} />);

    expect(container.getElementsByClassName('auto')).toHaveLength(3);
  });

  test('<QuickForm> - when rendered with custom fields, renders `ErrorField`', () => {
    const { container } = render(<TestForm schema={bridge} />);

    expect(container.getElementsByClassName('errors')).toHaveLength(1);
  });

  test('<QuickForm> - when rendered with custom fields, renders `SubmitField`', () => {
    const { container } = render(<TestForm schema={bridge} />);

    expect(container.getElementsByClassName('submit')).toHaveLength(1);
  });

  test('<QuickForm> - when rendered with custom fields in `props`, renders `ErrorsField`', () => {
    const { container } = render(
      <TestForm
        schema={bridge}
        errorsField={() => <i className="errorsOverride" />}
      />,
    );

    expect(container.getElementsByClassName('errorsOverride')).toHaveLength(1);
  });

  test('<QuickForm> - when rendered with custom fields in `props`, renders `SubmitField`', () => {
    const { container } = render(
      <TestForm
        schema={bridge}
        submitField={() => <i className="submitOverride" />}
      />,
    );

    expect(container.getElementsByClassName('submitOverride')).toHaveLength(1);
  });

  test('<QuickForm> - renders children', () => {
    const { container } = render(
      <QuickForm schema={bridge}>
        <div />
      </QuickForm>,
    );

    expect(container.getElementsByTagName('div')).toHaveLength(1);
  });
}
