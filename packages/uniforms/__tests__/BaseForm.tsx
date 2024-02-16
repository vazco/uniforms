import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BaseForm } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import z from 'zod';

describe('BaseForm', () => {
  const model = { $: [1], _: 1 };
  const schema = new ZodBridge({ schema: z.object({}) });

  const onSubmit = jest.fn();
  afterEach(() => {
    onSubmit.mockClear();
  });

  describe('when rendered', () => {
    it('is <form>', () => {
      const { container } = render(<BaseForm schema={schema} />);
      expect(container.getElementsByTagName('form')).toHaveLength(1);
    });

    it('have correct children', () => {
      const { container } = render(
        <BaseForm schema={schema}>
          <div />
          <div />
          <div />
        </BaseForm>,
      );

      expect(container.getElementsByTagName('div')).toHaveLength(3);
    });
  });

  describe('when submitted', () => {
    it('calls `onSubmit` once', () => {
      render(
        <BaseForm schema={schema} onSubmit={onSubmit} data-testid="form" />,
      );

      fireEvent.submit(screen.getByTestId('form'));
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('calls `onSubmit` with correct model', () => {
      render(
        <BaseForm
          model={model}
          schema={schema}
          onSubmit={onSubmit}
          data-testid="form"
        />,
      );

      fireEvent.submit(screen.getByTestId('form'));
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('calls `onSubmit` with the correctly `modelTransform`ed model', () => {
      render(
        <BaseForm
          model={model}
          schema={schema}
          onSubmit={onSubmit}
          data-testid="form"
          modelTransform={(mode, model) =>
            mode === 'submit' ? { submit: 1 } : model
          }
        />,
      );

      fireEvent.submit(screen.getByTestId('form'));
      expect(onSubmit).toHaveBeenLastCalledWith({ submit: 1 });
    });
  });
});
