import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {BaseForm} from 'uniforms';

describe('BaseForm', () => {
    const error  = new Error();
    const model  = {$: [1], _: 1};
    const schema = {
        getError:         () => {},
        getErrorMessage:  () => {},
        getErrorMessages: () => {},
        getField:         () => ({type: String}),
        getInitialValue:  () => {},
        getProps:         () => {},
        getSubfields:     () => ['$', '_'],
        getType:          () => {},
        getValidator:     () => {}
    };

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
            expect(context.uniforms).to.have.property('schema');
            expect(context.uniforms.schema).to.have.property('schema', schema);
        });

        it('have correct `state`', () => {
            expect(context.uniforms).to.have.property('state').that.is.an('object');
            expect(context.uniforms.state).to.have.property('changed', false);
            expect(context.uniforms.state).to.have.property('changedMap').that.is.deep.equal({});
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

        it('updates schema bridge', () => {
            const schema2 = {...schema, getType: () => {}};

            wrapper.setProps({schema: schema2});

            const context = wrapper.instance().getChildContext();

            expect(context.uniforms).to.have.property('schema');
            expect(context.uniforms.schema).to.have.property('schema', schema2);
        });
    });

    context('when changed', () => {
        const wrapper = mount(
            <BaseForm model={model} schema={schema} onChange={onChange} onSubmit={onSubmit} />
        );

        it('updates `changed` and `changedMap`', () => {
            const context1 = wrapper.instance().getChildContext().uniforms.state;
            expect(context1).to.have.property('changed', false);
            expect(context1).to.have.property('changedMap').that.is.deep.equal({});

            wrapper.instance().getChildContext().uniforms.onChange('$', [1, 2]);

            const context2 = wrapper.instance().getChildContext().uniforms.state;
            expect(context2).to.have.property('changed', true);
            expect(context2).to.have.deep.property('changedMap.$.1', true);
            expect(context2).to.not.have.deep.property('changedMap.$.0');

            wrapper.instance().getChildContext().uniforms.onChange('a', [1]);

            const context3 = wrapper.instance().getChildContext().uniforms.state;
            expect(context3).to.have.property('changed', true);
            expect(context2).to.have.deep.property('changedMap.$.1', true);
            expect(context2).to.have.deep.property('changedMap.a.0', true);
            expect(context2).to.not.have.deep.property('changedMap.$.0');
        });

        it('autosaves correctly (`autosave` = true)', () => {
            wrapper.setProps({autosave: true});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onSubmit).to.have.been.calledOnce;
            expect(onSubmit).to.have.been.calledWith(model);
        });

        it('autosaves correctly (`autosave` = false)', () => {
            wrapper.setProps({autosave: false});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onSubmit).to.have.been.not.called;
        });

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
