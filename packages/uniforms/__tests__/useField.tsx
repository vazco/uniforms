import React, { ReactNode, useEffect } from 'react';
import { AutoForm, BaseForm, connectField, useField } from 'uniforms';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

import mount from './_mount';

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

  it('is a function', () => {
    expect(useField).toBeInstanceOf(Function);
  });

  describe('when called with initialValue', () => {
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

    it('applies default value', () => {
      const wrapper = mount(
        <AutoForm schema={bridge}>
          <TestComponent name="d" />
        </AutoForm>,
      );

      expect(wrapper.find('input').prop('value')).toBe(4);

      expect(
        wrapper
          .find('input')
          .simulate('change', { target: { value: undefined } }),
      ).toBeTruthy();
    });

    it('does not apply default value after first change', () => {
      const wrapper = mount(
        <AutoForm schema={bridge}>
          <TestComponent name="d" />
        </AutoForm>,
      );

      expect(
        wrapper
          .find('input')
          .simulate('change', { target: { value: undefined } }),
      ).toBeTruthy();

      expect(wrapper.find('input').prop('value')).toBe('');
    });
  });

  describe('Array component', () => {
    const bridge = new JSONSchemaBridge(
      {
        type: 'object',
        properties: {
          a: { type: 'string' },
          b: { type: 'array', items: { type: 'string' } },
        },
      },
      () => {},
    );
    const createArrayTestComponent = (valueHasChanged: jest.Mock) =>
      connectField((props: Record<string, any>) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          return valueHasChanged();
        }, [props.value]);
        return <div />;
      });
    const StringTestComponent = connectField((props: Record<string, any>) => {
      return (
        <input
          value={props.value || ''}
          onChange={event => {
            props.onChange(event.target.value);
          }}
        />
      );
    });
    it('should have been called once', () => {
      const valueHasChanged = jest.fn();
      const ArrayTestComponent = createArrayTestComponent(valueHasChanged);

      mount(
        <AutoForm schema={bridge}>
          <StringTestComponent name="a" />
          <ArrayTestComponent name="b" />
        </AutoForm>,
      );

      expect(valueHasChanged).toBeCalledTimes(1);
    });

    it('should have been called once despite other changes', () => {
      const valueHasChanged = jest.fn();
      const ArrayTestComponent = createArrayTestComponent(valueHasChanged);

      const wrapper = mount(
        <AutoForm schema={bridge}>
          <StringTestComponent name="a" />
          <ArrayTestComponent name="b" />
        </AutoForm>,
      );

      expect(
        wrapper
          .find('input')
          .simulate('change', { target: { value: 'hello' } }),
      ).toBeTruthy();
      expect(valueHasChanged).toBeCalledTimes(1);
    });
  });

  describe('when called with `absoluteName`', () => {
    it('works on top-level', () => {
      mount(
        <BaseForm schema={bridge}>
          <Test name="a" options={{ absoluteName: true }} />
          <Test name="b" options={{ absoluteName: true }} />
          <Test name="b.c" options={{ absoluteName: true }} />
        </BaseForm>,
      );
    });

    it('works nested', () => {
      mount(
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
