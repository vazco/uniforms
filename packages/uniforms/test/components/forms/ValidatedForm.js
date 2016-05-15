import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';
import {stub}   from 'sinon';

import {ValidatedForm} from 'uniforms';

describe('ValidatedForm', () => {
    const validator = stub();
    const onChange  = spy();
    const onSubmit  = spy();
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
        validator.reset();
    });

    context('when rendered', () => {
        const wrapper = mount(
            <ValidatedForm schema={schema} />
        );

        it('is <form>', () => {
            expect(wrapper).to.have.tagName('form');
        });
    });

    context('when submitted', () => {
        it('calls `onSubmit` when valid', () => {
            const wrapper = mount(
                <ValidatedForm error={error} model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            expect(onSubmit).to.have.not.been.called;
        });

        it('calls `onSubmit` with correct model', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            expect(onSubmit).to.have.been.calledWith(model);
        });

        it('revalidates with new model', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} />
            );

            expect(validator).to.have.been.not.called;

            wrapper.setProps({model});

            expect(validator).to.have.been.calledOnce;
        });

        it('revalidates with new model only when changed', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} />
            );

            expect(validator).to.have.been.not.called;

            wrapper.setProps({model});

            expect(validator).to.have.been.not.called;
        });

        it('revalidates with new validator', () => {
            validator.onFirstCall().throws();
            validator.onSecondCall().returns();

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} />
            );

            expect(validator).to.have.been.not.called;

            wrapper.setProps({model, validator: {}});

            expect(validator).to.have.been.calledOnce;
        });

        it('validates (onChange)', () => {
            validator.throws();

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onChange={onChange} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            expect(validator).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith('key', 'value');
        });

        it('validates (onChangeAfterSubmit)', () => {
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

            expect(validator).to.have.been.calledOnce;
            expect(onChange).to.have.been.not.called;
            expect(onSubmit).to.have.been.not.called;

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            expect(validator).to.have.been.calledTwice;
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith('key', 'value');

            wrapper.find('form').simulate('submit');

            expect(validator).to.have.been.calledThrice;
            expect(onSubmit).to.have.been.calledOnce;
            expect(onSubmit).to.have.been.calledWith(model);
        });

        it('validates (onSubmit)', () => {
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

            expect(validator).to.have.been.calledOnce;
            expect(onChange).to.have.been.not.called;
            expect(onSubmit).to.have.been.not.called;

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            expect(validator).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith('key', 'value');

            wrapper.find('form').simulate('submit');

            expect(validator).to.have.been.calledTwice;
            expect(onSubmit).to.have.been.calledOnce;
            expect(onSubmit).to.have.been.calledWith(model);
        });
    });
});
