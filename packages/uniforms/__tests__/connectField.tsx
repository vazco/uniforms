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

import { render } from '../__suites__/render';

describe('connectField', () => {
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

  const Test = (
    props: UnknownObject & {
      onChange: OnChange<string>;
      label?: string | React.ReactNode;
    },
  ) => {
    return props.children ? (
      <>
        {props.label ? <span data-testid="label">{props.label}</span> : null}
        <input
          data-testid="field"
          {...filterDOMProps(omit(props, 'children', 'label'))}
          onChange={event => props.onChange(event.target.value)}
        />
        {props.children}
      </>
    ) : (
      <>
        {props.label ? <span>{props.label}</span> : null}
        <input
          data-testid="field"
          {...filterDOMProps(omit(props, 'label'))}
          onChange={event => props.onChange(event.target.value)}
        />
      </>
    );
  };

  afterEach(() => {
    onChange.mockClear();
  });

  describe('when called', () => {
    it('creates component', () => {
      const Field = connectField(Test);

      expect(Field).toBeInstanceOf(Function);
      expect(Field.Component).toEqual(Test);
    });
  });

  describe('when called with `kind`', () => {
    it('does not set default value', () => {
      const Field = connectField(Test);

      expect(Field.options).toEqual(undefined);
    });

    it('includes options object with `kind` value (leaf)', () => {
      const Field = connectField(Test, { kind: 'leaf' });

      expect(Field.options).toEqual({ kind: 'leaf' });
    });

    it('includes options object with `kind` value (node)', () => {
      const Field = connectField(Test, { kind: 'node' });

      expect(Field.options).toEqual({ kind: 'node' });
    });
  });

  describe('when called with `initialValue`', () => {
    it('includes default value (true)', () => {
      const Field = connectField(Test, { initialValue: true });

      render(<Field name="field" />, schema, reactContext);

      expect(onChange).toBeCalledWith('field', {});
    });

    it('does nothing (false)', () => {
      const Field = connectField(Test, { initialValue: false });

      render(<Field name="field" />, schema, reactContext);

      expect(onChange).not.toBeCalled();
    });

    it('respects `required` (props)', () => {
      const Field = connectField(Test, { initialValue: true });

      render(<Field name="another" required />, schema, reactContext);

      expect(onChange).not.toBeCalled();
    });

    it('respects `required` (schema)', () => {
      const Field = connectField(Test, { initialValue: true });

      render(<Field name="another" />, schema, reactContext);

      expect(onChange).not.toBeCalled();
    });
  });

  describe('when rendered with value', () => {
    it('treats value as initial value', async () => {
      const Field = connectField(Test);

      render(
        <Field name="field" value="initialValueExample" />,
        schema,
        reactContext,
      );

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(onChange).toBeCalledWith('field', 'initialValueExample');
    });
  });

  describe('when rendered with label', () => {
    const labelA = <span>Label A</span>;
    const labelB = <span>Label B</span>;

    it.each([
      ['Props', '', 'Props'],
      ['Props', 'Schema', 'Props'],
      ['Props', undefined, 'Props'],
      ['', undefined, ''],
      ['', 'Schema', ''],
      ['', undefined, ''],
      [labelA, '', labelA],
      [labelA, 'Schema', labelA],
      [labelA, labelB, labelA],
      [labelA, undefined, labelA],
      [undefined, '', ''],
      [undefined, 'Schema', 'Schema'],
      [undefined, labelB, labelB],
      [undefined, undefined, ''],
    ])('resolves it correctly (%#)', (propLabel, schemaLabel, resultLabel) => {
      const schema = {
        another: { type: String, optional: true },
        field: { type: Object, label: schemaLabel },
        'field.subfield': { type: String, label: 'Subfield' },
      };

      const Field = connectField(Test);
      render(
        <Field name="field" label={propLabel} data-testid="field" />,
        // @ts-expect-error
        schema,
        reactContext,
      );

      if (resultLabel === labelA) {
        expect(screen.getByText('Label A')).toBeInTheDocument();
      } else if (resultLabel === labelB) {
        expect(screen.getByText('Label B')).toBeInTheDocument();
      } else {
        const result = resultLabel as string;

        if (result) {
          expect(screen.getByText(result)).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId('label')).toBe(null);
        }
      }
    });
  });

  describe('when rendered provides correct onChange', () => {
    it('is defaults to field name', () => {
      const Field = connectField(Test);

      render(<Field name="another" />, schema, reactContext);

      const value = 'some value';
      const input = screen.getByTestId('field');
      fireEvent.change(input, { target: { value } });

      expect(onChange).toBeCalledWith('another', value);
    });

    it('is able to set another field value', () => {
      const Field = connectField((props: any) => (
        <input
          data-testid="field"
          {...filterDOMProps(props)}
          onChange={event =>
            props.onChange(event.target.value, 'field.subfield')
          }
        />
      ));

      render(<Field name="another" />, schema, reactContext);

      const input = screen.getByTestId('field');
      const value = 'test';

      fireEvent.change(input, { target: { value } });

      expect(onChange).toBeCalledWith('field.subfield', value);
    });
  });

  it('works with nested labels', () => {
    const Field = connectField(Test);

    render(
      <Field name="field" label={null}>
        <Field name="" label="" />
        <Field name="" />
        <Field name="subfield" label="Other">
          <Field name="" />
        </Field>
        <Field name="subfield">
          <Field name="">
            <Field name="" label={null} />
            <Field name="" label="" />
          </Field>
        </Field>
      </Field>,
      schema,
      reactContext,
    );

    expect(screen.getAllByText('Field')).toHaveLength(2);
    expect(screen.getAllByText('Subfield')).toHaveLength(4);
    expect(screen.getAllByText('Other')).toHaveLength(1);
  });
});
