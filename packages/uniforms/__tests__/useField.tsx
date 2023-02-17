import { fireEvent, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { AutoForm, BaseForm, connectField, useField } from 'uniforms';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

import { render } from '../__suites__';

describe('useField', () => {
  const bridge = new JSONSchemaBridge(
    {
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'object', properties: { c: { type: 'string' } } },
        d: { type: 'number', default: 4 },
      },
    },
    () => null,
  );

  function Test(rawProps: {
    children?: ReactNode;
    name: string;
    options?: Parameters<typeof useField>[2];
  }) {
    const [props] = useField(rawProps.name, rawProps, rawProps.options);
    return <>{props.children}</>;
  }

  it('is a function', () => {
    expect(useField).toBeInstanceOf(Function);
  });

  describe('when called with initialValue', () => {
    type Props = { onChange: (value?: string) => void; value?: string };
    const TestComponent = connectField((props: Props) => {
      return (
        <input
          value={props.value || ''}
          onChange={event => {
            props.onChange(event.target.value);
          }}
        />
      );
    });

    it('applies default value', () => {
      render(
        <AutoForm schema={bridge}>
          <TestComponent name="d" />
        </AutoForm>,
      );
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('value', '4');
    });

    it('does not apply default value after first change', () => {
      render(
        <AutoForm label schema={bridge}>
          <TestComponent name="d" />
        </AutoForm>,
      );

      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: null } });

      expect(input).toHaveAttribute('value', '');
    });
  });

  describe('when called with `absoluteName`', () => {
    it('works on top-level', () => {
      render(
        <BaseForm schema={bridge}>
          <Test name="a" options={{ absoluteName: true }} />
          <Test name="b" options={{ absoluteName: true }} />
          <Test name="b.c" options={{ absoluteName: true }} />
        </BaseForm>,
      );
    });

    it('works nested', () => {
      render(
        <BaseForm schema={bridge}>
          <Test name="b">
            <Test name="a" options={{ absoluteName: true }} />
            <Test name="b" options={{ absoluteName: true }} />
            <Test name="b.c" options={{ absoluteName: true }} />
          </Test>
        </BaseForm>,
      );
    });
  });
});
