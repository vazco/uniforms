import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, connectField, context } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoField } from 'uniforms-unstyled';

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

jest.spyOn(schema.schema, 'validator').mockImplementation(() => validator);

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
        <AutoForm onChange={onChange} schema={schema} />,
        { schema: { type: SimpleSchema2Bridge } },
        { onChange },
      );
    });
    test('validates', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          // TODO: delete ts-expect-error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
        >
          <AutoField name="a" />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      const form = screen.getByRole('form');
      const input = screen.getByLabelText('A');
      fireEvent.submit(form);

      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({ a: '' });

      fireEvent.change(input, { target: { value: '2' } });

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: '2' });
    });

    test('calls `onChangeModel`', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm
          // TODO: delete ts-expect-error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
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
    test('updates `changed` and `changedMap`', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm schema={schema}>
          <context.Consumer>
            {context => (
              <>
                {context ? (
                  <>
                    <p data-testid="changed">{`${context.changed}`}</p>
                    <p data-testid="changedMap">
                      {JSON.stringify(context?.changedMap)}
                    </p>
                  </>
                ) : null}
              </>
            )}
          </context.Consumer>
          <AutoField name="b" />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      const changed = screen.getByTestId('changed').innerHTML;
      const changedMap = JSON.parse(screen.getByTestId('changedMap').innerHTML);

      expect(changed).toBe('true');
      expect(changedMap).toHaveProperty('b');
      expect(changedMap.b).toBeTruthy();
    });
  });
  describe('when render', () => {
    test('calls `onChange` before render', () => {
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
    test('skips `onSubmit` until rendered (`autosave` = true)', async () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm autosave onSubmit={onSubmit} schema={schema}>
          <AutoField name="a" />
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      expect(onSubmit).not.toBeCalled();

      await new Promise(resolve => setTimeout(resolve));

      const input = screen.getByLabelText('A');

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: '' });

      await new Promise(resolve => setTimeout(resolve));
      fireEvent.change(input, { target: { value: '1' } });

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: '1' });
    });
  });

  describe('when reset', () => {
    test('reset `model`', () => {
      // FIXME: AutoForm is not a valid Component.
      const Component = () => (
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer>
            {context => (
              <>
                {context && context.model ? (
                  <p data-testid="model">{JSON.stringify(context.model)}</p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </AutoForm>
      );
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component />);
      const renderedModel = JSON.parse(screen.getByTestId('model').innerHTML);

      expect(renderedModel).toEqual(model);
    });

    test('resets state `changedMap`', () => {
      // FIXME: AutoForm is not a valid Component.
      const Component = () => (
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer>
            {context => (
              <>
                {context && context.changedMap ? (
                  <p data-testid="changedMap">
                    {JSON.stringify(context.changedMap)}
                  </p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </AutoForm>
      );
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component />);
      const changedMap = JSON.parse(screen.getByTestId('changedMap').innerHTML);

      expect(changedMap).toEqual({});
    });

    test('resets state `changed`', () => {
      // FIXME: AutoForm is not a valid Component.
      const Component = () => (
        <AutoForm autosave model={model} schema={schema}>
          <context.Consumer>
            {context => (
              <>
                {context ? (
                  <p data-testid="changed">{JSON.stringify(context.changed)}</p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </AutoForm>
      );
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component />);
      const changed = JSON.parse(screen.getByTestId('changed').innerHTML);

      expect(changed).toEqual(false);
    });
  });
  describe('when update', () => {
    test('<AutoForm />, updates', () => {
      // FIXME: AutoForm is not a valid Component.
      render(
        <AutoForm schema={schema}>
          <context.Consumer>
            {context => (
              <>
                {context ? (
                  <p data-testid="model">{JSON.stringify(context.model)}</p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </AutoForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      const model = JSON.parse(screen.getByTestId('model').innerHTML);

      expect(model).toEqual({});
    });

    test('<AutoForm />, validates', () => {
      // FIXME: AutoForm is not a valid Component.
      const { rerender } = render(<AutoForm schema={schema} />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<AutoForm schema={schema} model={model} validate="onChange" />);
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
