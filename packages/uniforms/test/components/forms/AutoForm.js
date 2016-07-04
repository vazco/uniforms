import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {AutoForm} from 'uniforms';

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

    context('when changed', () => {
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

    context('when rendered', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('skips `onSubmit` until rendered (`autosave` = true)', () => {
            expect(onSubmit.called).to.be.false;
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith({a: 1})).to.be.ok;
        });
    });

    context('when reset', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('reset `model`', () => {
            wrapper.instance().reset();

            expect(wrapper.instance().getChildContext().uniforms.model).to.be.deep.equal({});
        });
    });

    context('when updated', () => {
        const wrapper = mount(
            <AutoForm schema={schema} />
        );

        it('updates when changed', () => {
            wrapper.setProps({model: {}});

            expect(wrapper.instance().getChildContext().uniforms.model).to.be.deep.equal({});
        });

        it('validates', () => {
            wrapper.setProps({model});

            expect(validator.calledOnce).to.be.ok;
        });
    });
});
