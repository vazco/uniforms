import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BaseForm as UniformsBaseForm } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import z from 'zod';

export function testBaseForm(BaseForm: typeof UniformsBaseForm) {
  const model = { $: [1], _: 1 };
  const schema = new ZodBridge({ schema: z.object({}) });

  const onSubmit = jest.fn();
  afterEach(() => {
    onSubmit.mockClear();
  });

  test('<BaseForm> - renders', () => {
    const screen = render(<BaseForm data-testid="form" schema={schema} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  test('<BaseForm> - when rendered, is <form>', () => {
    const { container } = render(<BaseForm schema={schema} />);
    expect(container.getElementsByTagName('form')).toHaveLength(1);
  });

  test('<BaseForm> - when rendered, have correct children', () => {
    const { container } = render(
      <BaseForm disabled schema={schema}>
        <div />
        <div />
        <div />
      </BaseForm>,
    );
    expect(container.getElementsByTagName('div')).toHaveLength(3);
  });

  test('<BaseForm> - when submitted, calls `onSubmit` once', () => {
    render(
      <BaseForm
        model={model}
        schema={schema}
        onSubmit={onSubmit}
        data-testid="form"
      />,
    );

    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('<BaseForm> - when submitted, calls `onSubmit` with correct model', () => {
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

  test('<BaseForm> - when submitted, calls `onSubmit` with the correctly `modelTransform`ed model', () => {
    render(
      <BaseForm
        model={model}
        schema={schema}
        onSubmit={onSubmit}
        data-testid="form"
        modelTransform={(mode, model) => {
          return mode === 'submit' ? { submit: 1 } : model;
        }}
      />,
    );
    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit).toHaveBeenLastCalledWith({ submit: 1 });
  });
}
