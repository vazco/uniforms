import React        from 'react';
import {beforeEach} from 'mocha';
import {describe}   from 'mocha';
import {expect}     from 'chai';
import {it}         from 'mocha';
import {mount}      from 'enzyme';
import {spy}        from 'sinon';

import AutoForm from 'uniforms/AutoForm';

describe('AutoForm', () => {
    const onChangeModel = spy();
    const validator = spy();
    const onChange = spy();
    const onSubmit = spy();
    const model = {a: 1};
    const schema = {
        getDefinition:   () => {},
        messageForError: () => {},
        objectKeys:      () => ['a', 'b', 'c'],
        validator:       () => validator
    };

    beforeEach(() => {
        onChange.reset();
        onChangeModel.reset();
        onSubmit.reset();
        validator.reset();
    });

    describe('when changed', () => {
        const wrapper = mount(
            <AutoForm onChange={onChange} onChangeModel={onChangeModel} schema={schema} />
        );

        it('updates', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(onChange.calledOnce).to.be.ok;
            expect(onChange.calledWith('a', 2)).to.be.ok;
        });

        it('calls `onChangeModel`', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(onChangeModel.calledOnce).to.be.ok;
            expect(onChangeModel.calledWith({a: 2})).to.be.ok;
        });
    });

    describe('when rendered', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('skips `onSubmit` until rendered (`autosave` = true)', async () => {
            expect(onSubmit.called).to.be.false;
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith({a: 1})).to.be.ok;
        });
    });

    describe('when reset', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('reset `model`', () => {
            wrapper.instance().reset();

            expect(wrapper.instance().getChildContext().uniforms.model).to.be.deep.equal({});
        });
    });

    describe('when updated', () => {
        const wrapper = mount(
            <AutoForm schema={schema} />
        );

        it('updates when changed', () => {
            wrapper.setProps({model: {}});

            expect(wrapper.instance().getChildContext().uniforms.model).to.be.deep.equal({});
        });

        it('validates', () => {
            wrapper.setProps({model, validate: 'onChange'});

            expect(validator.calledOnce).to.be.ok;
        });
    });
});
