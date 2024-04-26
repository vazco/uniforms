import Select from 'antd/lib/select';
import React from 'react';
import { SelectField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<SelectField> - renders a select which correctly reacts on change (array)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" value={undefined} />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: Provide a valid option.
  expect(
    wrapper.find(Select).prop('onChange')!(['b'], null as any),
  ).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField> - renders a select (undefined values)', () => {
  const element = <SelectField name="x" value={[undefined, 'a', undefined]} />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues: ['a', 'b'] },
    }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).not.toContain(undefined);
  expect(wrapper.find(Select).prop('value')).toContain('a');
});
