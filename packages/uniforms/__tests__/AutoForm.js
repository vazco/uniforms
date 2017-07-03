import React    from 'react';
import {mount}  from 'enzyme';

import AutoForm     from 'uniforms/AutoForm';
import connectField from 'uniforms/connectField';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('AutoForm', () => {
    const onChangeModel = jest.fn();
    const validator = jest.fn();
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const model = {a: '1'};
    const schema = {
        getDefinition:   () => ({type: String, defaultValue: ''}),
        messageForError: () => {},
        objectKeys:      () => ['a', 'b', 'c'],
        validator:       () => validator
    };

    beforeEach(() => {
        onChange.mockReset();
        onChangeModel.mockReset();
        onSubmit.mockReset();
        validator.mockReset();
    });

    describe('when changed', () => {
        const wrapper = mount(
            <AutoForm onChange={onChange} onChangeModel={onChangeModel} schema={schema} />
        );

        it('updates', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', '2');

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenLastCalledWith('a', '2');
        });

        it('calls `onChangeModel`', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', '2');

            expect(onChangeModel).toHaveBeenCalledTimes(1);
            expect(onChangeModel).toHaveBeenLastCalledWith({a: '2'});
        });
    });

    describe('when rendered', () => {
        it('calls `onChange` before render', () => {
            const field = () => null;
            const Field = connectField(field);

            mount(
                <AutoForm onChange={onChange} schema={schema} autoField={Field} model={model} />
            );

            expect(onChange).toHaveBeenCalledTimes(2);
            expect(onChange.mock.calls[0]).toEqual(expect.arrayContaining(['b', '']));
            expect(onChange.mock.calls[1]).toEqual(expect.arrayContaining(['c', '']));
        });

        it('skips `onSubmit` until rendered (`autosave` = true)', async () => {
            const wrapper = mount(
                <AutoForm onSubmit={onSubmit} schema={schema} autosave />
            );

            expect(onSubmit).not.toBeCalled();
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenLastCalledWith({a: 1});
        });
    });

    describe('when reset', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('reset `model`', () => {
            wrapper.instance().reset();

            expect(wrapper.instance().getChildContext().uniforms.model).toEqual({});
        });
    });

    describe('when updated', () => {
        const wrapper = mount(
            <AutoForm schema={schema} />
        );

        it('updates when changed', () => {
            wrapper.setProps({model: {}});

            expect(wrapper.instance().getChildContext().uniforms.model).toEqual({});
        });

        it('validates', () => {
            wrapper.setProps({model, validate: 'onChange'});

            expect(validator).toHaveBeenCalledTimes(1);
        });
    });
});
