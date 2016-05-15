import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {BaseForm}           from 'uniforms';
import {createSchemaBridge} from 'uniforms';

describe('BaseForm', () => {
    const error    = new Error();
    const model    = {_: 1};
    const _schema  = {
        getDefinition   () {return {type: String};},
        messageForError () {},
        objectKeys      () {return ['_'];},
        validator       () {}
    };
    const schema   = createSchemaBridge(_schema);
    const onChange = spy();
    const onSubmit = spy();

    afterEach(() => {
        onChange.reset();
        onSubmit.reset();
    });

    context('child context', () => {
        const wrapper = mount(
            <BaseForm error={error} model={model} schema={schema} />
        );

        const context = wrapper.instance().getChildContext();

        it('exists', () => {
            expect(context).to.have.property('uniforms').that.is.an('object');
        });

        it('have correct `error`', () => {
            expect(context.uniforms).to.have.property('error', error);
        });

        it('have correct `model`', () => {
            expect(context.uniforms).to.have.property('model', model);
        });

        it('have correct `name`', () => {
            expect(context.uniforms).to.have.property('name').that.is.an('array');
            expect(context.uniforms).to.have.property('name').that.is.empty;
        });

        it('have correct `schema`', () => {
            expect(context.uniforms).to.have.property('schema', schema);
        });

        it('have correct `state`', () => {
            expect(context.uniforms).to.have.property('state').that.is.an('object');
            expect(context.uniforms.state).to.have.property('label', true);
            expect(context.uniforms.state).to.have.property('disabled', false);
            expect(context.uniforms.state).to.have.property('placeholder', false);
        });

        it('have correct `onChange`', () => {
            expect(context.uniforms).to.have.property('onChange').that.is.a('function');
        });
    });

    context('when rendered', () => {
        const wrapper = mount(
            <BaseForm className="name" schema={schema}>
                <div />
                <div />
                <div />
            </BaseForm>
        );

        it('is <form>', () => {
            expect(wrapper).to.have.tagName('form');
        });

        it('have correct props', () => {
            expect(wrapper).to.have.prop('className', 'name');
        });

        it('have correct children', () => {
            expect(wrapper).to.be.not.empty;
            expect(wrapper).to.have.exactly(3).descendants('div');
        });
    });

    context('when rerendered', () => {
        const wrapper = mount(
            <BaseForm model={model} schema={_schema} onChange={onChange} />
        );

        wrapper.setProps({schema});

        const context = wrapper.instance().getChildContext();

        it('creates new schema bridge', () => {
            expect(context.uniforms).to.have.property('schema', schema);
        });
    });

    context('when changed', () => {
        const wrapper = mount(
            <BaseForm model={model} schema={schema} onChange={onChange} />
        );

        it('calls `onChange` with correct name and value', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith('a', 1);
        });

        it('cancels `onChange` event', () => {
            wrapper.find('form').simulate('change');

            expect(onChange).to.have.been.not.called;
        });

        it('does nothing without `onChange`', () => {
            wrapper.setProps({onChange: undefined});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onChange).to.have.been.not.called;
        });
    });

    context('when submitted', () => {
        const wrapper = mount(
            <BaseForm model={model} schema={schema} onSubmit={onSubmit} />
        );

        it('calls `onSubmit` once', () => {
            wrapper.find('form').simulate('submit');

            expect(onSubmit).to.have.been.calledOnce;
        });

        it('calls `onSubmit` with correct model', () => {
            wrapper.find('form').simulate('submit');

            expect(onSubmit).to.have.been.calledWith(model);
        });

        it('does nothing without `onSubmit`', () => {
            wrapper.setProps({onSubmit: undefined});
            wrapper.find('form').simulate('submit');

            expect(onSubmit).to.have.been.not.called;
        });
    });
});
