import { fireEvent, screen } from '@testing-library/react';
import omit from 'lodash/omit';
import React from 'react';
import {
  BaseForm,
  Context,
  OnChange,
  UnknownObject,
  connectField,
  filterDOMProps,
  randomIds,
} from 'uniforms';

import { render } from './render';

export function testConnectField() {
  const onChange = jest.fn();

  const schema = {
    another: { type: String, optional: true },
    field: { type: Object, label: 'Field' },
    'field.subfield': { type: String, label: 'Subfield' },
  };

  const reactContext = {
    changed: false,
    changedMap: {},
    error: undefined,
    model: {},
    name: [],
    onChange,
    onSubmit() {},
    randomId: randomIds(),
    state: {
      disabled: false,
      readOnly: false,
      showInlineError: true,
    },
    submitted: false,
    submitting: false,
    validating: false,
    formRef: {} as BaseForm<UnknownObject>,
  } as Partial<Context<any>>;

  const Test = (props: UnknownObject & { onChange: OnChange<string> }) => {
    return props.children ? (
      <>
        <input
          data-testid="field"
          {...filterDOMProps(omit(props, 'children'))}
          onChange={event => props.onChange(event.target.value)}
        />
        {props.children}
      </>
    ) : (
      <input
        data-testid="field"
        {...filterDOMProps(props)}
        onChange={event => props.onChange(event.target.value)}
      />
    );
  };

  beforeEach(() => {
    onChange.mockClear();
  });

  test('connectField - when called, creates component', () => {
    const Field = connectField(Test);

    expect(Field).toBeInstanceOf(Function);
    expect(Field.Component).toEqual(Test);
  });

  test('connectField - when called, does not set default value', () => {
    const Field = connectField(Test);

    expect(Field.options).toEqual(undefined);
  });

  test('connectField - when called with `kind`, includes options object with `kind` value (leaf)', () => {
    const Field = connectField(Test, { kind: 'leaf' });

    expect(Field.options).toEqual({ kind: 'leaf' });
  });

  test('connectField - when called with `kind`, includes options object with `kind` value (node)', () => {
    const Field = connectField(Test, { kind: 'node' });

    expect(Field.options).toEqual({ kind: 'node' });
  });

  test('connectField - when called with `initialValue`, includes default value (true)', () => {
    const Field = connectField(Test, { initialValue: true });

    render(<Field name="field" />, schema, reactContext);

    expect(onChange).toBeCalledWith('field', {});
  });

  test('connectField - when called with `initialValue`, does nothing (false)', () => {
    const Field = connectField(Test, { initialValue: false });

    render(<Field name="field" />, schema, reactContext);

    expect(onChange).not.toBeCalled();
  });

  test('connectField - when called with `initialValue`, respects `required` (props)', () => {
    const Field = connectField(Test, { initialValue: true });

    render(<Field name="another" required />, schema, reactContext);

    expect(onChange).not.toBeCalled();
  });

  test('connectField - when called with `initialValue`, respects `required` (schema)', () => {
    const Field = connectField(Test, { initialValue: true });

    render(<Field name="another" />, schema, reactContext);

    expect(onChange).not.toBeCalled();
  });

  test('connectField - when rendered with value, treats value as initial value', async () => {
    const Field = connectField(Test);

    render(
      <Field name="field" value="initialValueExample" />,
      schema,
      reactContext,
    );

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(onChange).toBeCalledWith('field', 'initialValueExample');
  });

  test('connectField - when rendered provides correct onChange, is defaults to field name', () => {
    const Field = connectField(Test);

    render(<Field name="another" />, schema, reactContext);

    const value = 'some value';
    const input = screen.getByTestId('field');
    fireEvent.change(input, {
      target: { value },
    });

    expect(onChange).toBeCalledWith('another', value);
  });

  test('connectField - when rendered provides correct onChange, is able to set another field value', () => {
    const Field = connectField((props: any) => (
      <input
        data-testid="field"
        {...filterDOMProps(props)}
        onChange={event => props.onChange(event.target.value, 'field.subfield')}
      />
    ));

    render(<Field name="another" />, schema, reactContext);

    const input = screen.getByTestId('field');
    const value = 'test';

    fireEvent.change(input, {
      target: { value },
    });

    expect(onChange).toBeCalledWith('field.subfield', value);
  });

  test('connectField - works with nested labels', () => {
    const Field = connectField(Test);

    render(
      <Field name="field" label={null} data-testid="1">
        <Field name="" label="" data-testid="2" />
        <Field name="" data-testid="3" />
        <Field name="subfield" label="Other" data-testid="4">
          <Field name="" data-testid="5" />
        </Field>
        <Field name="subfield" data-testid="6">
          <Field name="" data-testid="7">
            <Field name="" label={null} data-testid="8" />
            <Field name="" label="" data-testid="9" />
          </Field>
        </Field>
      </Field>,
      schema,
      reactContext,
    );

    expect(screen.getByTestId('1')).toHaveAttribute('label', 'Field');
    expect(screen.getByTestId('2')).toHaveAttribute('label', '');
    expect(screen.getByTestId('3')).toHaveAttribute('label', 'Field');
    expect(screen.getByTestId('4')).toHaveAttribute('label', 'Other');
    expect(screen.getByTestId('5')).toHaveAttribute('label', 'Subfield');
    expect(screen.getByTestId('6')).toHaveAttribute('label', 'Subfield');
    expect(screen.getByTestId('7')).toHaveAttribute('label', 'Subfield');
    expect(screen.getByTestId('8')).toHaveAttribute('label', 'Subfield');
    expect(screen.getByTestId('9')).toHaveAttribute('label', '');
  });

  test('connectField - when rendered with label', async () => {
    const array = [
      ['Props', '', 'Props'],
      ['Props', 'Schema', 'Props'],
      ['Props', undefined, 'Props'],
      ['', undefined, ''],
      ['', 'Schema', ''],
      ['', undefined, ''],
      [undefined, '', ''],
      [undefined, 'Schema', 'Schema'],
      [undefined, undefined, ''],
    ];

    array.map(([propLabel, schemaLabel, resultLabel], index) => {
      const schema = {
        another: { type: String, optional: true },
        field: { type: Object, label: schemaLabel },
        'field.subfield': { type: String, label: 'Subfield' },
      };

      const Field = connectField(Test);
      render(
        <Field name="field" label={propLabel} data-testid={index.toString()} />,
        schema,
        reactContext,
      );

      expect(screen.getByTestId(index.toString())).toHaveAttribute(
        'label',
        resultLabel,
      );
    });
  });
}
