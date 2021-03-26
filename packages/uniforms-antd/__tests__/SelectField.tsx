import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import React from 'react';
import { SelectField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<SelectField> - renders a select', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
});

test('<SelectField> - renders a select with correct disabled state', () => {
  const element = <SelectField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('disabled')).toBe(true);
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

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: Provide a valid option.
  expect(wrapper.find(Select).prop('onChange')!('b', null as any)).toBeFalsy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<SelectField> - renders a select with correct id (inherited)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('id')).toBeTruthy();
});

test('<SelectField> - renders a select with correct id (specified)', () => {
  const element = <SelectField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('id')).toBe('y');
});

test('<SelectField> - renders a select with correct name', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('name')).toBe('x');
});

test('<SelectField> - renders a select with correct options', () => {
  // @ts-expect-error Is open a valid prop?
  const element = <SelectField name="x" open />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('children')).toHaveLength(2);
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[0].props.value).toBe('a');
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[0].props.children).toBe('a');
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[1].props.value).toBe('b');
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[1].props.children).toBe('b');
});

test('<SelectField> - renders a select with correct options (transform)', () => {
  const element = (
    // @ts-expect-error Is open a valid prop?
    <SelectField name="x" open transform={x => x.toUpperCase()} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('children')).toHaveLength(2);
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[0].props.value).toBe('a');
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[0].props.children).toBe('A');
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[1].props.value).toBe('b');
  // @ts-expect-error Check children type.
  expect(wrapper.find(Select).prop('children')[1].props.children).toBe('B');
});

test('<SelectField> - renders a select with correct placeholder (implicit)', () => {
  const element = <SelectField name="x" placeholder="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('placeholder')).toBe('y');
  expect(wrapper.find(Select).prop('value')).toBe(undefined);
});

test('<SelectField> - renders a select with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe(undefined);
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

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('b');
});

test('<SelectField> - renders a select with correct value (specified)', () => {
  const element = <SelectField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('b');
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

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: Provide a valid option.
  expect(wrapper.find(Select).prop('onChange')!('b', null as any)).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

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

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: Provide a valid option.
  expect(wrapper.find(Select).prop('onChange')!('', null as any)).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', '');
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

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: Provide a valid option.
  expect(wrapper.find(Select).prop('onChange')!('b', null as any)).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a wrapper with unknown props', () => {
  const element = <SelectField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select).prop('data-x')).toBe('x');
  expect(wrapper.find(Select).prop('data-y')).toBe('y');
  expect(wrapper.find(Select).prop('data-z')).toBe('z');
});

test('<SelectField> - works with special characters', () => {
  mount(
    <SelectField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

test('<SelectField> - disabled items (options) based on predicate', () => {
  const allowedValues = ['a', 'b'];

  const element = (
    <SelectField name="x" disableItem={value => value === allowedValues[0]} />
  );
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues },
    }),
  );

  // FIXME: The `children` prop is not indexable on its own.
  const children: any = wrapper.find(Select).prop('children');
  expect(children).toHaveLength(2);
  expect(children[0].props.disabled).toBe(true);
  expect(children[1].props.disabled).toBe(false);
});

test('<SelectField checkboxes> - renders a set of checkboxes', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('value')).toBe('a');
  expect(wrapper.find(Radio).at(1).prop('value')).toBe('b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
  const element = <SelectField checkboxes name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('disabled')).toBe(true);
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

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('id')).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
  const element = <SelectField checkboxes name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('id')).toBe('y');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('name')).toBe('x');
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
    <SelectField
      checkboxes
      name="x"
      transform={(x: string) => x.toUpperCase()}
    />
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

  expect(wrapper.find(Radio.Group).prop('data-x')).toBe('x');
  expect(wrapper.find(Radio.Group).prop('data-y')).toBe('y');
  expect(wrapper.find(Radio.Group).prop('data-z')).toBe('z');
});

test('<SelectField checkboxes> - works with special characters', () => {
  mount(
    <SelectField checkboxes name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

test('<SelectField checkboxes> - disabled items (checkboxes) based on predicate', () => {
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
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues },
    }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('input').at(1).prop('disabled')).toBe(false);
});
