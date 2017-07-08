import React   from 'react';
import {mount} from 'enzyme';

import wrapField from 'uniforms-bootstrap4/wrapField';

test('<wrapField> - renders wrapper with correct class', () => {
    const element = wrapField({wrapClassName: 'container'}, <div />);
    const wrapper = mount(element);

    expect(wrapper.find('.container')).toHaveLength(1);
});

test('<wrapField> - renders help block', () => {
    const element = wrapField({help: 'Hint'}, <div />);
    const wrapper = mount(element);

    expect(wrapper.find('.form-text').text()).toBe('Hint');
});

test('<wrapField> - renders help block with specified class', () => {
    const element = wrapField({help: 'Hint', helpClassName: 'text-hint'}, <div />);
    const wrapper = mount(element);

    expect(wrapper.find('.text-hint')).toHaveLength(1);
});

test('<wrapField> - renders error block', () => {
    const error = new Error();
    const element = wrapField({error, showInlineError: true, errorMessage: 'Error'}, <div />);
    const wrapper = mount(element);

    expect(wrapper.find('.text-danger').text()).toBe('Error');
});

test('<wrapField> - renders error block (showInlineError=false)', () => {
    const error = new Error();
    const element = wrapField({error, showInlineError: false, errorMessage: 'Error'}, <div />);
    const wrapper = mount(element);

    expect(wrapper.find('.text-danger')).toHaveLength(0);
});

