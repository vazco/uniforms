import Form from 'antd/lib/form';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import { wrapField } from 'uniforms-antd';

import mount from './_mount';

it('<wrapField> - renders wrapper with label', () => {
  const element = wrapField({ label: 'Label' }, <div />);
  const wrapper = mount(element);

  // @ts-expect-error Correct label type.
  expect(wrapper.find(Form.Item).prop('label').props.children[0]).toBe('Label');
});

it('<wrapField> - renders wrapper with label and info', () => {
  const element = wrapField({ label: 'Label', info: 'Info' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Tooltip).prop('title')).toBe('Info');
});

it('<wrapField> - renders wrapper with an error message', () => {
  const error = new Error();
  const element = wrapField(
    { error, showInlineError: true, errorMessage: 'Error' },
    <div />,
  );
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('help')).toBe('Error');
});

it('<wrapField> - renders wrapper with an error status', () => {
  const element = wrapField({}, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('validateStatus')).toBe(undefined);
});

it('<wrapField> - renders wrapper with an error status (error)', () => {
  const error = new Error();
  const element = wrapField({ error }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('validateStatus')).toBe('error');
});

it('<wrapField> - renders wrapper with help text', () => {
  const element = wrapField({ help: 'Help' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('help')).toBe('Help');
});

it('<wrapField> - renders wrapper with extra text', () => {
  const element = wrapField({ extra: 'Extra' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('extra')).toBe('Extra');
});

it('<wrapField> - renders wrapper with extra style', () => {
  const element = wrapField({ wrapperStyle: {} }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('style')).toEqual({});
});

it('<wrapField> - renders wrapper with a custom validateStatus', () => {
  const element = wrapField({ validateStatus: 'success' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('validateStatus')).toBe('success');
});
