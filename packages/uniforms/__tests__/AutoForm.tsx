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
  const schemaDefinition = {
    a: { type: String, defaultValue: '' },
    b: { type: String, defaultValue: '' },
    c: { type: String, defaultValue: '' },
  };
  const schema = new SimpleSchema2Bridge(
    new SimpleSchema(schemaDefinition),
    true,
  );

  jest.spyOn(schema.schema, 'validator').mockImplementation(() => validator);

  beforeEach(() => jest.clearAllMocks());

  describe('when changed', () => {
    it('updates', () => {
      render(
        <AutoForm onChange={onChange} schema={schema}>
          <AutoFields />
        </AutoForm>,
        schemaDefinition,
        { onChange },
      );
      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: '2' } });
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenLastCalledWith('a', '2');
    });
    it('validates', () => {
      render(
        <AutoForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          onChange={onChange}
          schema={schema}
        >
          <AutoFields />
        </AutoForm>,
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
      render(
        <AutoForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          onChangeModel={onChangeModel}
          schema={schema}
        />,
      );

      const form = screen.getByRole('form');
      fireEvent.change(form, onChangeModel({ a: '2' }));

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: '2' });
    });
    it('updates `changed` and `changedMap`', () => {
      render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
        schemaDefinition,
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

      render(
        // @ts-expect-error Convoluted AutoForm types
        <CustomAutoForm
          onChange={onChange}
          schema={schema}
          autoField={Field}
          model={model}
        />,
      );

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[0]).toEqual(expect.arrayContaining(['b', '']));
      expect(onChange.mock.calls[1]).toEqual(expect.arrayContaining(['c', '']));
    });
    it('skips `onSubmit` until rendered (`autosave` = true)', async () => {
      render(
        <AutoForm autosave onSubmit={onSubmit} schema={schema}>
          <AutoFields />
        </AutoForm>,
      );

      expect(onSubmit).not.toBeCalled();
      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: '1' } });

      await new Promise(resolve => setTimeout(resolve));
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: '1', b: '', c: '' });
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({ a: '1', b: '', c: '' });
    });
  });

  describe('when reset', () => {
    it('reset `model`', () => {
      const Component = () => (
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>
      );
      const { rerender } = render(<Component />, schemaDefinition);

      rerender(<Component />);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model }),
      );
    });

    it('resets state `changedMap`', () => {
      const Component = () => (
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>
      );

      const { rerender } = render(<Component />, schemaDefinition);

      rerender(<Component />);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: {} }),
      );
    });

    it('resets state `changed`', () => {
      const Component = () => (
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>
      );
      const { rerender } = render(<Component />, schemaDefinition);

      rerender(<Component />);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: false }),
      );
    });
  });
  describe('when update', () => {
    it('<AutoForm />, updates', () => {
      const { rerenderWithProps } = render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>,
        schemaDefinition,
      );

      rerenderWithProps({ model: {} });
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: {} }),
      );
    });

    it('<AutoForm />, validates', () => {
      const { rerenderWithProps } = render(<AutoForm schema={schema} />);

      rerenderWithProps({ model, validate: 'onChange' });
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
