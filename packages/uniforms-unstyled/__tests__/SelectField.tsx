import React from 'react';
import { SelectField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

test('<SelectField> - renders a select', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
});

test('<SelectField> - renders a select with correct disabled state', () => {
  const element = <SelectField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('disabled')).toBe(true);
});

test('<SelectField> - renders a select with correct readOnly state', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" readOnly />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'b' } }),
  ).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<SelectField> - renders a select with correct id (inherited)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('id')).toBeTruthy();
});

test('<SelectField> - renders a select with correct id (specified)', () => {
  const element = <SelectField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('id')).toBe('y');
});

test('<SelectField> - renders a select with correct name', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('name')).toBe('x');
});

test('<SelectField> - renders a select with correct options', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', ''],
    ['a', 'a'],
    ['b', 'b'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a select with correct options (transform)', () => {
  const element = <SelectField name="x" transform={x => x.toUpperCase()} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', ''],
    ['a', 'A'],
    ['b', 'B'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a select with correct placeholder (fallback)', () => {
  const element = <SelectField name="x" label="y" placeholder="" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: String, allowedValues: ['a', 'b'], optional: true },
    }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', 'y'],
    ['a', 'a'],
    ['b', 'b'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a select with correct placeholder (implicit)', () => {
  const element = <SelectField name="x" placeholder="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', 'y'],
    ['a', 'a'],
    ['b', 'b'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a select with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toBe('');
});

test('<SelectField> - renders a select with correct value (model)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toBe('b');
});

test('<SelectField> - renders a select with correct value (specified)', () => {
  const element = <SelectField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toBe('b');
});

test('<SelectField> - renders a select which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'b' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a select which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: '' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<SelectField> - renders a select which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'b' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a label', () => {
  const element = <SelectField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').prop('children')).toBe('y');
  expect(wrapper.find('label').prop('htmlFor')).toBe(
    wrapper.find('select').prop('id'),
  );
});

test('<SelectField> - renders a wrapper with unknown props', () => {
  const element = <SelectField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
  expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
  expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});

test('<SelectField> - works with special characters', () => {
  mount(
    <SelectField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

test('<SelectField checkboxes> - renders a set of checkboxes', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
  const element = <SelectField checkboxes name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('input').at(1).prop('disabled')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct readOnly state', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" readOnly />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('id')).toBeTruthy();
  expect(wrapper.find('input').at(1).prop('id')).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
  const element = <SelectField checkboxes name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('id')).toBe('y-YQ');
  expect(wrapper.find('input').at(1).prop('id')).toBe('y-Yg');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('name')).toBe('x');
  expect(wrapper.find('input').at(1).prop('name')).toBe('x');
});

test('<SelectField> - renders a select with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues: ['a', 'b'] },
    }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toStrictEqual([]);
});

test('<SelectField> - renders a multiselect with disabled options', () => {
  const element = <SelectField name="x" disableItem={value => value === 'b'} />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues: ['a', 'b'] },
    }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toStrictEqual([]);
  expect(wrapper.find('option').at(0).prop('disabled')).toBe(false);
  expect(wrapper.find('option').at(1).prop('disabled')).toBe(true);
});

test('<SelectField> - renders a select with correct value (model)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { model: { x: ['b'] } },
    ),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toStrictEqual(['b']);
});

test('<SelectField> - renders a select with correct value (specified)', () => {
  const element = <SelectField name="x" value={['b']} />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues: ['a', 'b'] },
    }),
  );

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('select').prop('value')).toStrictEqual(['b']);
});

test('<SelectField> - renders a select which correctly reacts on change (first value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
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

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'a' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['a']);
});

test('<SelectField> - renders a select which correctly reacts on change (next value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" value={['b']} />;
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

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'a' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['a', 'b']);
});

test('<SelectField> - renders a select which correctly reacts on change (uncheck) by value', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" value={['a']} />;
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

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'a' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField> - renders a select which correctly reacts on change (uncheck) by selectedIndex', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" value={['a']} />;
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

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper
      .find('select')
      .simulate('change', { target: { selectedIndex: -1 } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find('label').at(0).text()).toBe('a');
  expect(wrapper.find('label').at(1).text()).toBe('b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {
  const element = (
    <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find('label').at(0).text()).toBe('A');
  expect(wrapper.find('label').at(1).text()).toBe('B');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(false);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {
  const element = <SelectField checkboxes name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
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

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" value={['b']} />;
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

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<SelectField checkboxes> - renders a label', () => {
  const element = <SelectField checkboxes name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(3);
  expect(wrapper.find('label').at(0).text()).toBe('y');
});

test('<SelectField checkboxes> - renders a wrapper with unknown props', () => {
  const element = (
    <SelectField checkboxes name="x" data-x="x" data-y="y" data-z="z" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
  expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
  expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});

test('<SelectField checkboxes> - works with special characters', () => {
  mount(
    <SelectField checkboxes name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

test('<SelectField checkboxes> - renders a set of checkboxes with per-item props', () => {
  const allowedValues = ['a', 'b'];

  const element = (
    <SelectField
      checkboxes
      name="x"
      disableItem={value => value === allowedValues[0]}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('input').at(1).prop('disabled')).toBe(false);
});
