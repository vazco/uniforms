import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, connectField } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

import { render } from '../__suites__';

const schema = new SimpleSchema2Bridge(
  new SimpleSchema({
    a: { type: String, defaultValue: '' },
    b: { type: String, defaultValue: '' },
    c: { type: String, defaultValue: '' },
  }),
);
const model = { a: '1' };
const onChange = jest.fn();
const onChangeModel = jest.fn();
const onSubmit = jest.fn();
const validator = jest.fn();

beforeEach(() => {
  onChange.mockClear();
  onChangeModel.mockClear();
  onSubmit.mockClear();
  validator.mockClear();
});

describe('<AutoForm />', () => {
  describe('when changes', () => {
    test('updates', () => {
      render(
        <AutoForm data-testid="autoForm" onChange={onChange} schema={schema} />,
        { schema: { type: SimpleSchema2Bridge } },
        { onChange },
      );
    });

    // todo no way to test in rts cause of AutoField not rendering inputs, and in rts we don't have access to instance
    test.skip('validates', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm data-testid="autoForm" onChange={onChange} schema={schema} />,
        { schema: { type: SimpleSchema2Bridge } },
      );

      const element = screen.getByTestId('autoForm');
      fireEvent.submit(element);

      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({});

      fireEvent.change(element, onChange({ a: '1' }));

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: '1' });
    });

    test('calls `onChangeModel`', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          data-testid="autoForm"
          onChange={onChangeModel}
          schema={schema}
        />,
        { schema: { type: SimpleSchema2Bridge } },
      );

      const element = screen.getByTestId('autoForm');
      fireEvent.change(element, onChangeModel({ a: '2' }));

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: '2' });
    });

    test.skip('updates `changed` and `changedMap`', () => {
      // todo no way to test in rts cause we don't have access to instance and state of component
      // (https://testing-library.com/docs/react-testing-library/intro/#the-problem)
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm data-testid="autoForm" onChange={onChange} schema={schema} />,
        { schema: { type: SimpleSchema2Bridge } },
      );

      const element = screen.getByTestId('autoForm');

      expect(element).toHaveProperty('changed', false);
      expect(element).toHaveProperty('changedMap', {});

      fireEvent.change(element, onChange({ a: '1' }));

      expect(element).toHaveProperty('changed', true);
      expect(element).toHaveProperty('changedMap.a');
      // expect(element.changedMap.a).toBeTruthy();
    });
  });
  describe('when render', () => {
    test('calls `onChange` before render', () => {
      const field = () => null;
      const Field = connectField(field);

      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          data-testid="autoForm"
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

    test.skip('skips `onSubmit` until rendered (`autosave` = true)', async () => {
      // todo no way to test in rts cause we don't have access to instance and state of component
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          data-testid="autoForm"
          autosave
          onSubmit={onSubmit}
          schema={schema}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      expect(onSubmit).not.toBeCalled();

      const element = screen.getByTestId('autoForm');

      await new Promise(resolve => setTimeout(resolve));

      fireEvent.change(element, onChange({ a: '1' }));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: 1 });
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({ a: 1 });
    });
  });
  describe('when reset', () => {
    test.skip('reset `model`', () => {
      // todo no way to test in rts cause we don't have access to instance and state of component
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          data-testid="autoForm"
          autosave
          model={model}
          schema={schema}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      // expect(wrapper.instance().getContext().model).toEqual(model);
    });

    test.skip('resets state `changedMap`', () => {
      // todo no way to test in rts cause we don't have access to instance and state of component
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          data-testid="autoForm"
          onSubmit={onSubmit}
          model={model}
          schema={schema}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      // expect(wrapper.instance().getContext().changedMap).toEqual({});
    });

    test.skip('resets state `changed`', () => {
      // todo no way to test in rts cause we don't have access to instance and state of component
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          data-testid="autoForm"
          autosave
          model={model}
          onSubmit={onSubmit}
          schema={schema}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      // expect(wrapper.instance().getContext().changed).toEqual(false);
    });
  });
  describe('when update', () => {
    test.skip('<AutoForm />, updates', () => {
      // todo no way to test in rts cause AutoForm not render input in core
      // FIXME: AutoForm is not a valid Component.
      render(<AutoForm schema={schema} />, {
        schema: { type: SimpleSchema2Bridge },
      });

      // expect(wrapper.instance().props.model).toEqual({});
    });

    test.skip('<AutoForm />, validates', () => {
      // todo no way to test in rts cause AutoForm not render input in core
      // FIXME: AutoForm is not a valid Component.
      render(<AutoForm schema={schema} />, {
        schema: { type: SimpleSchema2Bridge },
      });

      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
