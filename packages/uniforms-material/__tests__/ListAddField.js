import Done    from 'material-ui/svg-icons/action/done';
import React   from 'react';
import {mount} from 'enzyme';

import ListAddField from 'uniforms-material/ListAddField';

import createContext from './_createContext';
import touchTap from './_touchTap';

const parent = {
    maxCount: 3,
    value: []
};

test('<ListAddField> - works', () => {
    const element = <ListAddField name="x.$" parent={parent} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListAddField)).toHaveLength(1);
});

test('<ListAddField> - prevents onClick when disabled', () => {
    const onChange = jest.fn();

    const element = <ListAddField name="x.1" disabled parent={Object.assign({}, parent, {onChange})} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    touchTap(wrapper.find(ListAddField).childAt(0));
    expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - prevents onClick when limit reached', () => {
    const onChange = jest.fn();

    const element = <ListAddField name="x.1" parent={Object.assign({}, parent, {onChange, maxCount: 0})} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    touchTap(wrapper.find(ListAddField).childAt(0));
    expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - correctly reacts on click', () => {
    const onChange = jest.fn();

    const element = <ListAddField name="x.1" parent={Object.assign({}, parent, {onChange})} value="y" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    touchTap(wrapper.find(ListAddField).childAt(0));
    expect(onChange).toHaveBeenLastCalledWith(['y']);
});

test('<ListAddField> - renders correct icon', () => {
    const element = <ListAddField name="x.$" parent={parent} icon={Done} iconVisible />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(Done)).toHaveLength(1);
});
