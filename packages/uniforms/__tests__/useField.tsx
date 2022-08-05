import { fireEvent, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { AutoForm, BaseForm, connectField, useField } from 'uniforms';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

import { render } from '../__suites__';

const bridge = new JSONSchemaBridge(
  {
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: { type: 'object', properties: { c: { type: 'string' } } },
      d: { type: 'number', default: 4 },
    },
  },
  () => {},
);

function Test(rawProps: {
  children?: ReactNode;
  name: string;
  options?: Parameters<typeof useField>[2];
}) {
  const [props] = useField(rawProps.name, rawProps, rawProps.options);
  return <>{props.children}</>;
}

const TestComponent = connectField((props: Record<string, any>) => {
  return (
    <input
      value={props.value || ''}
      onChange={event => {
        props.onChange(event.target.value);
      }}
    />
  );
});

describe('useField', () => {
  test('is a function', () => {
    expect(useField).toBeInstanceOf(Function);
  });

  describe('when called with initialValue', () => {
    test('applies default value', () => {
      render(
        <AutoForm schema={bridge} data-testid="autoForm">
          <TestComponent name="d" />
        </AutoForm>,
        { schema: { type: SimpleSchema2Bridge } },
      );
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('value', '4');
    });

    test('does not apply default value after first change', () => {
      const { getByRole } = render(
        <AutoForm label schema={bridge} data-testid="autoForm">
          <TestComponent name="d" />
        </AutoForm>,
        { schema: { type: SimpleSchema2Bridge } },
      );

      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: null } });

      expect(input).toHaveAttribute('value', '');
    });
  });

  describe('when called with `absoluteName`', () => {
    test('works on top-level', () => {
      render(
        <BaseForm schema={bridge}>
          <Test name="a" options={{ absoluteName: true }} />
          <Test name="b" options={{ absoluteName: true }} />
          <Test name="b.c" options={{ absoluteName: true }} />
        </BaseForm>,
        { schema: { type: SimpleSchema2Bridge } },
      );
    });

    test('works nested', () => {
      render(
        <BaseForm schema={bridge}>
          <Test name="b">
            <Test name="a" options={{ absoluteName: true }} />
            <Test name="b" options={{ absoluteName: true }} />
            <Test name="b.c" options={{ absoluteName: true }} />
          </Test>
        </BaseForm>,
        { schema: { type: SimpleSchema2Bridge } },
      );
    });
  });
});
