import Form from 'antd/lib/form';
import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { mount } from 'enzyme';

import wrapField from 'uniforms-antd/wrapField';

test('<wrapField> - renders wrapper with label', () => {
  const element = wrapField({ label: 'Label' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('label').props.children[0]).toBe('Label');
});

test('<wrapField> - renders wrapper with label and info', () => {
  const element = wrapField({ label: 'Label', info: 'Info' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Tooltip).prop('title')).toBe('Info');
});

test('<wrapField> - renders wrapper with an error message', () => {
  const error = new Error();
  const element = wrapField(
    { error, showInlineError: true, errorMessage: 'Error' },
    <div />
  );
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('help')).toBe('Error');
});

test('<wrapField> - renders wrapper with an error status', () => {
  const element = wrapField({}, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('validateStatus')).toBe(undefined);
});

test('<wrapField> - renders wrapper with an error status (error)', () => {
  const error = new Error();
  const element = wrapField({ error }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('validateStatus')).toBe('error');
});

test('<wrapField> - renders wrapper with help text', () => {
  const element = wrapField({ help: 'Help' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('help')).toBe('Help');
});

test('<wrapField> - renders wrapper with extra text', () => {
  const element = wrapField({ extra: 'Extra' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(Form.Item).prop('extra')).toBe('Extra');
});
