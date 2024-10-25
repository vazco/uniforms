import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { useContext } from 'react';
import { BaseForm, context } from 'uniforms';
import { ZodBridge } from 'uniforms-bridge-zod';
import { AutoField } from 'uniforms-unstyled';
import z from 'zod';

describe('BaseForm', () => {
  const model = { $: [1], _: 1 };
  const schema = new ZodBridge({
    schema: z.object({ a: z.string().optional() }),
  });

  const onChange = jest.fn();
  const onSubmit = jest.fn();
  afterEach(() => {
    onChange.mockClear();
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

  describe('when changed', () => {
    it('autosaves correctly (`autosave` = false)', async () => {
      render(
        <BaseForm schema={schema} onSubmit={onSubmit} model={model}>
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(onSubmit).not.toBeCalled();
    });

    it('autosaves correctly (`autosave` = true)', async () => {
      render(
        <BaseForm schema={schema} onSubmit={onSubmit} model={model} autosave>
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'test' } });

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed', async () => {
      render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          model={model}
          autosave
          autosaveDelay={25}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'test 1' } });
      fireEvent.change(input, { target: { value: 'test 2' } });
      fireEvent.change(input, { target: { value: 'test 3' } });

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed (longer)', async () => {
      render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          model={model}
          autosave
          autosaveDelay={10}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText('A');

      fireEvent.change(input, { target: { value: 'test 1' } });
      fireEvent.change(input, { target: { value: 'test 2' } });
      fireEvent.change(input, { target: { value: 'test 3' } });

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

      fireEvent.change(input, { target: { value: 'test 1' } });
      fireEvent.change(input, { target: { value: 'test 2' } });
      fireEvent.change(input, { target: { value: 'test 3' } });

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(2));
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('clears autosave correctly', async () => {
      const { unmount } = render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          model={model}
          autosave
          autosaveDelay={100}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText('A');

      fireEvent.change(input, { target: { value: 'test 1' } });
      unmount();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(onSubmit).not.toBeCalled();
    });

    it('calls `onChange` with correct name and value', () => {
      render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          onChange={onChange}
          model={model}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'test 1' } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('a', 'test 1');
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

    it('sets `submitted` to true', async () => {
      let submitted: boolean | undefined;

      function Field() {
        const test = useContext(context);
        submitted = test?.submitted;
        return null;
      }

      render(
        <BaseForm schema={schema} onSubmit={onSubmit} data-testid="form">
          <Field />
        </BaseForm>,
      );

      expect(submitted).toBe(false);
      fireEvent.submit(screen.getByTestId('form'));
      expect(submitted).toBe(true);
    });

    it('sets `submitting` state while submitting', async () => {
      let submitting: boolean | undefined;

      function Field() {
        const test = useContext(context);
        submitting = test?.submitting;
        return null;
      }

      let resolveSubmit: (...args: any[]) => void = () => {};
      const test = () => new Promise(resolve => (resolveSubmit = resolve));

      render(
        <BaseForm schema={schema} onSubmit={test} data-testid="form">
          <Field />
        </BaseForm>,
      );

      expect(submitting).toBe(false);

      const form = screen.getByTestId('form');
      fireEvent.submit(form);

      expect(submitting).toBe(true);

      resolveSubmit();

      await waitFor(() => expect(submitting).toBe(false));
    });
  });
});
