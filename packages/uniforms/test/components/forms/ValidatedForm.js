import React    from 'react';
import {expect} from 'chai';
import {match}  from 'sinon';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';
import {stub}   from 'sinon';

import {ValidatedForm} from 'uniforms';

describe('ValidatedForm', () => {
    let validator = stub();

    const onChange   = spy();
    const onSubmit   = spy();
    const onValidate = spy();

    const error = new Error();
    const model = {a: 1};
    const schema = {
        getDefinition   () {},
        messageForError () {},
        objectKeys      () {},
        validator () {
            return validator;
        }
    };

    beforeEach(() => {
        onChange.reset();
        onSubmit.reset();
        onValidate.reset();

        validator = stub();
    });

    context('when reset', () => {
        it('removes `error`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            wrapper.find('form').simulate('submit');

            expect(wrapper.instance().getChildContext().uniforms.error).to.be.ok;

            wrapper.instance().reset();

            expect(wrapper.instance().getChildContext().uniforms.error).to.be.null;
        });
    });

    context('when submitted', () => {
        it('calls `onSubmit` when valid', async () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(onSubmit.calledOnce).to.be.ok;
        });

        it('calls `onSubmit` with correct model', async () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('skips `onSubmit` when invalid', async () => {
            const wrapper = mount(
                <ValidatedForm error={error} model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(onSubmit.called).to.be.false;
        });

        it('revalidates with new model only if required', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} />
            );

            expect(validator.called).to.be.false;

            wrapper.setProps({model});

            expect(validator.called).to.be.false;
        });

        it('revalidates with new model', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} validate="onChange" />
            );

            expect(validator.called).to.be.false;

            wrapper.setProps({model});

            expect(validator.calledOnce).to.be.ok;
        });

        it('revalidates with new model only when changed', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} />
            );

            expect(validator.called).to.be.false;

            wrapper.setProps({model});

            expect(validator.called).to.be.false;
        });

        it('revalidates with new validator only if required', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} validate="onChange" />
            );

            expect(validator.called).to.be.false;

            wrapper.setProps({model, validator: {}});

            expect(validator.calledOnce).to.be.ok;
        });

        it('revalidates with new validator', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} />
            );

            expect(validator.called).to.be.false;

            wrapper.setProps({model, validator: {}});

            expect(validator.called).to.be.false;
        });

        it('validates (onChange)', () => {
            validator.throws();

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onChange={onChange} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            expect(validator.calledOnce).to.be.ok;
            expect(onChange.calledOnce).to.be.ok;
            expect(onChange.calledWith('key', 'value')).to.be.ok;
        });

        it('validates (onChangeAfterSubmit)', async () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();
            validator.onThirdCall().returns();

            const wrapper = mount(
                <ValidatedForm
                    model={model}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    schema={schema}
                    validate="onChangeAfterSubmit"
                />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(validator.calledOnce).to.be.ok;
            expect(onChange.called).to.be.false;
            expect(onSubmit.called).to.be.false;

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(validator).to.have.been.calledTwice;
            expect(onChange.calledOnce).to.be.ok;
            expect(onChange.calledWith('key', 'value')).to.be.ok;

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(validator).to.have.been.calledThrice;
            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith(model)).to.be.ok;
        });

        it('validates (onSubmit)', async () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();
            validator.onThirdCall().returns();

            const wrapper = mount(
                <ValidatedForm
                    model={model}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    schema={schema}
                    validate="onSubmit"
                />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(validator.calledOnce).to.be.ok;
            expect(onChange.called).to.be.false;
            expect(onSubmit.called).to.be.false;

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(validator.calledOnce).to.be.ok;
            expect(onChange.calledOnce).to.be.ok;
            expect(onChange.calledWith('key', 'value')).to.be.ok;

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => setTimeout(resolve, 5));

            expect(validator).to.have.been.calledTwice;
            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith(model)).to.be.ok;
        });
    });

    context('when validated', () => {
        it('calls `onValidate`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(validator.calledOnce).to.be.ok;
            expect(onValidate.calledOnce).to.be.ok;
            expect(onValidate.calledWith({a: 2}, null, match.instanceOf(Function))).to.be.ok;
        });

        it('calls `onValidate` (error)', () => {
            validator.throws(error);

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(validator.calledOnce).to.be.ok;
            expect(onValidate.calledOnce).to.be.ok;
            expect(onValidate.calledWith({a: 2}, error, match.instanceOf(Function))).to.be.ok;
        });

        it('works with async errors from `onValidate`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            const call = onValidate.getCall(0);
            call.args[2](error);

            expect(wrapper.instance().getChildContext()).to.have.deep.property('uniforms.error', error);
        });

        it('works with no errors from `onValidate`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            const call = onValidate.getCall(0);
            call.args[2]();

            expect(wrapper.instance().getChildContext()).to.have.deep.property('uniforms.error', null);
        });
    });
});
