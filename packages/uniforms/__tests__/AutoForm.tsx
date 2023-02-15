import { fireEvent, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, connectField, Context, context } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoFields } from 'uniforms-unstyled';

import { render } from '../__suites__';

describe('<AutoForm />', () => {
  const onChange = jest.fn();
  const onChangeModel = jest.fn();
  const onSubmit = jest.fn();
  const validator = jest.fn();
  const contextSpy = jest.fn<ReactNode, [Context<any> | null]>();
  const model = { a: '1' };
  const schema = new SimpleSchema2Bridge(
    new SimpleSchema({
      a: { type: String, defaultValue: '' },
      b: { type: String, defaultValue: '' },
      c: { type: String, defaultValue: '' },
    }),
  );

  jest.spyOn(schema.schema, 'validator').mockImplementation(() => validator);

  beforeEach(() => jest.clearAllMocks());

  describe('when changed', () => {
    it('updates', () => {
      render(
        <AutoForm onChange={onChange} schema={schema} />,
        { schema: { type: SimpleSchema2Bridge } },
        { onChange },
      );
    });
    it('validates', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
        >
          <AutoFields />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      const form = screen.getByRole('form');
      const input = screen.getByLabelText('A');
      fireEvent.submit(form);

      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({ a: '', b: '', c: '' });

      fireEvent.change(input, { target: { value: '2' } });

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: '2', b: '', c: '' });
    });

    it('calls `onChangeModel`', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          onChange={onChangeModel}
          schema={schema}
        />,
        { schema: { type: SimpleSchema2Bridge } },
      );

      const form = screen.getByRole('form');
      fireEvent.change(form, onChangeModel({ a: '2' }));

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: '2' });
    });
    it('updates `changed` and `changedMap`', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          changed: true,
          changedMap: { a: {}, b: {}, c: {} },
        }),
      );
    });
  });
  describe('when render', () => {
    it('calls `onChange` before render', () => {
      const field = () => null;
      const Field = connectField(field);

      // @ts-expect-error Convoluted AutoForm types
      class CustomAutoForm extends AutoForm {
        getAutoField() {
          return Field;
        }
      }

      // FIXME: AutoForm is not a valid Component.
      render(
        // @ts-expect-error Convoluted AutoForm types
        <CustomAutoForm
          onChange={onChange}
          schema={schema}
          autoField={Field}
          model={model}
        />,
        { schema: { type: SimpleSchema2Bridge } },
      );

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[0]).toEqual(expect.arrayContaining(['b', '']));
      expect(onChange.mock.calls[1]).toEqual(expect.arrayContaining(['c', '']));
    });
    it('skips `onSubmit` until rendered (`autosave` = true)', async () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm autosave onSubmit={onSubmit} schema={schema}>
          <AutoFields />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      expect(onSubmit).not.toBeCalled();

      await new Promise(resolve => setTimeout(resolve));

      const input = screen.getByLabelText('A');

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: '', b: '', c: '' });

      await new Promise(resolve => setTimeout(resolve));
      fireEvent.change(input, { target: { value: '1' } });

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: '1', b: '', c: '' });
    });
  });

  describe('when reset', () => {
    it('reset `model`', () => {
      const Component = () => (
        // FIXME: AutoForm is not a valid Component.
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>
      );
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component />);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model }),
      );
    });

    it('resets state `changedMap`', () => {
      const Component = () => (
        // FIXME: AutoForm is not a valid Component.
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>
      );

      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component />);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: {} }),
      );
    });

    it('resets state `changed`', () => {
      const Component = () => (
        // FIXME: AutoForm is not a valid Component.
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>
      );
      const { rerender } = render(
        // FIXME: AutoForm is not a valid Component.
        <Component />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      rerender(<Component />);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: false }),
      );
    });
  });
  describe('when update', () => {
    it('<AutoForm />, updates', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: {} }),
      );
    });

    it('<AutoForm />, validates', () => {
      // FIXME: AutoForm is not a valid Component.
      const { rerenderWithProps } = render(<AutoForm schema={schema} />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerenderWithProps({ model, validate: 'onChange' });
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
