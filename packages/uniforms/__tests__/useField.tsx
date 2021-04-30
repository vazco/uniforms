import React, { ReactNode } from 'react';
import { BaseForm, useField } from 'uniforms';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

import mount from './_mount';

describe('useField', () => {
  const bridge = new JSONSchemaBridge(
    {
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'object', properties: { c: { type: 'string' } } },
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
