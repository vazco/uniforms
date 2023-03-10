import { fireEvent, screen } from '@testing-library/react';
import omit from 'lodash/omit';
import React, { ReactNode } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, connectField, Context, context } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoFields } from 'uniforms-unstyled';

import { render } from '../__suites__';

describe('<AutoForm />', () => {
  const onChange = vi.fn();
  const onChangeModel = vi.fn();
  const onSubmit = vi.fn();
  const validator = vi.fn();
  const contextSpy = vi.fn<[Context<any> | null], ReactNode>();
  const model = { a: '1' };
  const schemaDefinition = {
    a: { type: String, defaultValue: '' },
    b: { type: String, defaultValue: '' },
    c: { type: String, defaultValue: '' },
  };
  const schema = new SimpleSchema2Bridge(new SimpleSchema(schemaDefinition));

  vi.spyOn(schema.schema, 'validator').mockImplementation(() => validator);

  beforeEach(() => {
    vi.clearAllMocks();
  });

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
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge(schema);
      render(
        <AutoForm onChangeModel={onChangeModel} schema={bridge}>
          <AutoFields />
        </AutoForm>,
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: 'a' });
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

        getNativeFormProps() {
          return omit(super.getNativeFormProps(), 'autoField');
        }
      }

      render(
        // @ts-expect-error Convoluted AutoForm types
        <CustomAutoForm
          autoField={Field}
          model={model}
          onChange={onChange}
          schema={schema}
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
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge(schema);
      render(
        <AutoForm schema={bridge}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: {} }),
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: { a: 'a' } }),
      );

      contextSpy.mock.calls.slice(-1)[0][0]?.formRef.reset();

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: {} }),
      );
    });

    it('resets state `changedMap`', () => {
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge(schema);
      render(
        <AutoForm schema={bridge}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: {} }),
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: { a: {} } }),
      );

      contextSpy.mock.calls.slice(-1)[0][0]?.formRef.reset();

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: {} }),
      );
    });

    it('resets state `changed`', () => {
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge(schema);
      render(
        <AutoForm schema={bridge}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: false }),
      );

      const input = screen.getByLabelText('A');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: true }),
      );

      contextSpy.mock.calls.slice(-1)[0][0]?.formRef.reset();

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
