import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';
import {stub}   from 'sinon';

import {BaseForm} from 'uniforms';

describe('BaseForm', () => {
    const noop   = () => {};
    const error  = new Error();
    const model  = {$: [1], _: 1};
    const schema = {
        getError:         noop,
        getErrorMessage:  noop,
        getErrorMessages: noop,
        getField:         noop,
        getInitialValue:  noop,
        getProps:         noop,
        getSubfields:     noop,
        getType:          noop,
        getValidator:     noop
    };

    const onChange        = spy();
    const onSubmit        = stub();
    const onSubmitSuccess = spy();
    const onSubmitFailure = spy();

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
            expect(context.uniforms.state).to.have.property('changed', false);
            expect(context.uniforms.state).to.have.property('changedMap').that.is.deep.equal({});
            expect(context.uniforms.state).to.have.property('label', true);
            expect(context.uniforms.state).to.have.property('disabled', false);
            expect(context.uniforms.state).to.have.property('placeholder', false);
            expect(context.uniforms.state).to.have.property('showInlineError', false);
        });

        it('have correct `onChange`', () => {
            expect(context.uniforms).to.have.property('onChange').that.is.a('function');
        });
    });

    context('when rendered', () => {
        const wrapper = mount(
            <BaseForm
                className="name"
                disabled
                label={false}
                placeholder
                schema={schema}
                showInlineError
            >
                <div />
                <div />
                <div />
            </BaseForm>
        );

        it('is <form>', () => {
            expect(wrapper.find('form')).to.have.length(1);
        });

        it('have correct props', () => {
            expect(wrapper.props()).to.have.property('className', 'name');
            expect(wrapper.props()).to.have.property('noValidate', true);
        });

        it('have correct children', () => {
            expect(wrapper).to.be.not.empty;
            expect(wrapper.find('div')).to.have.length(3);
        });

        it('have correct `resetCount`', () => {
            expect(wrapper.state('resetCount')).to.equal(0);
        });

        it('have correct `state`', () => {
            const context = wrapper.instance().getChildContext();

            expect(context.uniforms).to.have.property('state').that.is.an('object');
            expect(context.uniforms.state).to.have.property('label', false);
            expect(context.uniforms.state).to.have.property('disabled', true);
            expect(context.uniforms.state).to.have.property('placeholder', true);
            expect(context.uniforms.state).to.have.property('showInlineError', true);
        });

        it('updates schema bridge', () => {
            const schema2 = {...schema, getType: () => {}};

            wrapper.setProps({schema: schema2});

            const context = wrapper.instance().getChildContext();

            expect(context.uniforms).to.have.property('schema', schema2);
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
            expect(context2).to.have.deep.property('changedMap.$').that.is.ok;
            expect(context2).to.have.deep.property('changedMap.$.1').that.is.ok;
        });

        it('autosaves correctly (`autosave` = true)', () => {
            wrapper.setProps({autosave: true});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('autosaves are not delayed', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);
            wrapper.instance().getChildContext().uniforms.onChange('a', 3);

            expect(onSubmit.calledThrice).to.be.ok;
            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('autosaves can be delayed', async () => {
            wrapper.setProps({autosaveDelay: 10});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);
            wrapper.instance().getChildContext().uniforms.onChange('a', 3);

            await new Promise(resolve => setTimeout(resolve, 25));

            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('autosaves can be delayed (longer)', async () => {
            wrapper.setProps({autosaveDelay: 10});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);
            wrapper.instance().getChildContext().uniforms.onChange('a', 3);

            await new Promise(resolve => setTimeout(resolve, 25));

            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);
            wrapper.instance().getChildContext().uniforms.onChange('a', 3);

            await new Promise(resolve => setTimeout(resolve, 25));

            expect(onSubmit.calledTwice).to.be.ok;
            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('autosaves correctly (`autosave` = false)', () => {
            wrapper.setProps({autosave: false});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onSubmit.called).to.be.false;
        });

        it('calls `onChange` with correct name and value', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onChange.calledOnce).to.be.ok;
            expect(onChange.calledWith('a', 1)).to.be.ok;
        });

        it('cancels `onChange` event', () => {
            wrapper.find('form').simulate('change');

            expect(onChange.called).to.be.false;
        });

        it('does nothing without `onChange`', () => {
            wrapper.setProps({onChange: undefined});
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);

            expect(onChange.called).to.be.false;
        });
    });

    context('when reset', () => {
        const wrapper = mount(
            <BaseForm schema={schema} />
        );

        it('increase `resetCount`', () => {
            wrapper.instance().reset();

            expect(wrapper.state('resetCount')).to.equal(1);
        });
    });

    context('when submitted', () => {
        const wrapper = mount(
            <BaseForm model={model} schema={schema} onSubmit={onSubmit} />
        );

        it('calls `onSubmit` once', () => {
            wrapper.find('form').simulate('submit');

            expect(onSubmit.calledOnce).to.be.ok;
        });

        it('calls `onSubmit` with correct model', () => {
            wrapper.find('form').simulate('submit');

            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('does nothing without `onSubmit`', () => {
            wrapper.setProps({onSubmit: undefined});
            wrapper.find('form').simulate('submit');

            expect(onSubmit.called).to.be.false;
        });

        it('calls `onSubmitSuccess` when `onSubmit` resolves', async () => {
            onSubmit.onFirstCall().returns(Promise.resolve());

            const wrapper = mount(
                <BaseForm model={model} schema={schema} onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(onSubmitSuccess.calledOnce).to.be.ok;
        });

        it('calls `onSubmitFailure` when `onSubmit` rejects', async () => {
            onSubmit.onFirstCall().returns(Promise.reject());

            const wrapper = mount(
                <BaseForm model={model} schema={schema} onSubmit={onSubmit} onSubmitFailure={onSubmitFailure} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(onSubmitFailure.calledOnce).to.be.ok;
        });
    });
});
