import { render } from '@testing-library/react';
import React from 'react';
import { QuickForm } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import { z } from 'zod';

describe('QuickForm', () => {
  const AutoField = jest.fn(() => null) as any;
  const ErrorsField = jest.fn(() => null) as any;
  const SubmitField = jest.fn(() => null) as any;

  // @ts-expect-error QuickForm is not a valid Component.
  class TestForm extends QuickForm<any> {
    // eslint-disable-next-line react/display-name
    getAutoField = () => () => <AutoField />;
    // eslint-disable-next-line react/display-name
    getErrorsField = () => () => <ErrorsField />;
    // eslint-disable-next-line react/display-name
    getSubmitField = () => () => <SubmitField />;
  }

  const schema = z.object({
    a: z.string(),
    b: z.string(),
    c: z.string(),
  });
  const bridge = new ZodBridge({ schema });

  afterEach(() => {
    AutoField.mockClear();
    ErrorsField.mockClear();
    SubmitField.mockClear();
  });

  describe('when rendered with custom fields', () => {
    it('renders `AutoField` for each field', () => {
      render(<TestForm schema={bridge} />);

      expect(AutoField).toHaveBeenCalledTimes(3);
    });

    it('renders `ErrorsField`', () => {
      render(<TestForm schema={bridge} />);

      expect(ErrorsField).toHaveBeenCalledTimes(1);
    });

    it('renders `SubmitField`', () => {
      render(<TestForm schema={bridge} />);

      expect(SubmitField).toHaveBeenCalledTimes(1);
    });
  });

  describe('when rendered with custom fields in `props`', () => {
    it('renders `ErrorsField`', () => {
      const ErrorsOverrideField = jest.fn(() => <div />) as React.FC<any>;

      render(
        <TestForm
          schema={bridge}
          errorsField={() => <ErrorsOverrideField />}
        />,
      );

      expect(ErrorsOverrideField).toHaveBeenCalledTimes(1);
    });

    it('renders `SubmitField`', () => {
      const SubmitOverrideField = jest.fn(() => <div />) as React.FC<any>;

      render(
        <TestForm
          schema={bridge}
          submitField={() => <SubmitOverrideField />}
        />,
      );

      expect(SubmitOverrideField).toHaveBeenCalledTimes(1);
    });
  });

  describe('when rendered with children', () => {
    it('renders children', () => {
      const Child = jest.fn(() => <div />) as React.FC<any>;

      render(
        <QuickForm schema={bridge}>
          <Child />
        </QuickForm>,
      );

      expect(Child).toHaveBeenCalledTimes(1);
    });
  });
});
