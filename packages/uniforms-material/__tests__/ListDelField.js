import Done    from 'material-ui/svg-icons/action/done';
import React   from 'react';
import {mount} from 'enzyme';

import ListDelField from 'uniforms-material/ListDelField';

import createContext from './_createContext';
import touchTap from './_touchTap';

const parent = {
    maxCount: 3,
    minCount: 0,
    value: ['x', 'y', 'z']
};

test('<ListDelField> - works', () => {
    const element = <ListDelField name="x.1" parent={parent} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListDelField)).toHaveLength(1);
});

test('<ListDelField> - prevents onClick when disabled', () => {
    const onChange = jest.fn();

    const element = <ListDelField name="x.1" disabled parent={Object.assign({}, parent, {onChange})} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    touchTap(wrapper.find(ListDelField).childAt(0));
    expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - prevents onClick when limit reached', () => {
    const onChange = jest.fn();

    const element = <ListDelField name="x.1" parent={Object.assign({}, parent, {onChange, minCount: 3})} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    touchTap(wrapper.find(ListDelField).childAt(0));
    expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - correctly reacts on click', () => {
    const onChange = jest.fn();

    const element = <ListDelField name="x.1" parent={Object.assign({}, parent, {onChange})} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    touchTap(wrapper.find(ListDelField).childAt(0));
    expect(onChange).toHaveBeenLastCalledWith(['x', 'z']);
});

test('<ListDelField> - renders correct icon', () => {
    const element = <ListDelField name="x.1" parent={parent} icon={Done} iconVisible />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(Done)).toHaveLength(1);
});
