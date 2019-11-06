import React from 'react';
import { mount } from 'enzyme';
import { wrapField } from 'uniforms-bootstrap3';

test('<wrapField> - renders wrapper with correct class', () => {
  const element = wrapField({ wrapClassName: 'container' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find('.container')).toHaveLength(1);
});

test('<wrapField> - renders help block', () => {
  const element = wrapField({ help: 'Hint' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find('.help-block').text()).toBe('Hint');
});

test('<wrapField> - renders help block with specified class', () => {
  const element = wrapField(
    { help: 'Hint', helpClassName: 'text-hint' },
    <div />
  );
  const wrapper = mount(element);

  expect(wrapper.find('.help-block.text-hint')).toHaveLength(1);
});

test('<wrapField> - renders error block', () => {
  const error = new Error();
  const element = wrapField(
    { error, showInlineError: true, errorMessage: 'Error' },
    <div />
  );
  const wrapper = mount(element);

  expect(wrapper.find('.help-block').text()).toBe('Error');
});

test('<wrapField> - renders error block (feedbackable)', () => {
  const error = new Error();
  const element = wrapField({ error, feedbackable: true }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find('.form-control-feedback')).toHaveLength(1);
});

test('<wrapField> - renders error block (showInlineError=false)', () => {
  const error = new Error();
  const element = wrapField(
    { error, showInlineError: false, errorMessage: 'Error' },
    <div />
  );
  const wrapper = mount(element);

  expect(wrapper.find('.help-block')).toHaveLength(0);
});

test('<wrapField> - label has custom class (String)', () => {
  const element = wrapField(
    {
      label: 'A field label',
      labelClassName: 'custom-label-class'
    },
    <div />
  );
  const wrapper = mount(element);

  expect(wrapper.find('label.custom-label-class')).toHaveLength(1);
});

test('<wrapField> - label has custom class (Array[String])', () => {
  const element = wrapField(
    {
      label: 'A field label',
      labelClassName: ['custom-1', 'custom-2']
    },
    <div />
  );
  const wrapper = mount(element);

  expect(wrapper.find('label.custom-1.custom-2')).toHaveLength(1);
});
