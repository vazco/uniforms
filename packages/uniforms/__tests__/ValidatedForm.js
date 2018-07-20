import React    from 'react';
import {mount}  from 'enzyme';

import ValidatedForm from 'uniforms/ValidatedForm';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('ValidatedForm', () => {
    const onChange   = jest.fn();
    const onSubmit   = jest.fn();
    const onValidate = jest.fn((model, error, next) => {
        if (error) return;

        next();
    });
    const validator  = jest.fn();

    const error = new Error();
    const model = {a: 1};
    const schema = {
        getDefinition   () {},
        messageForError () {},
        objectKeys      () {},
        validator:      () => validator
    };

    beforeEach(() => {
        onValidate.mockClear();

        onChange.mockReset();
        onSubmit.mockReset();
        validator.mockReset();
    });

    describe('when submitted', () => {
        it('calls `onSubmit` when valid', async () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        it('calls `onSubmit` with correct model', async () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).toHaveBeenLastCalledWith(model);
        });

        it('skips `onSubmit` when invalid', async () => {
            const wrapper = mount(
                <ValidatedForm
                    error={error}
                    model={model}
                    onSubmit={onSubmit}
                    onValidate={onValidate}
                    schema={schema}
                />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).not.toBeCalled();
        });
        it('validates (onChange)', () => {
            const wrapper = mount(
                <ValidatedForm model={model} onChange={onChange} schema={schema} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenLastCalledWith('key', 'value');
        });

        it('validates (onChangeAfterSubmit)', async () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm
                    model={model}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onValidate={onValidate}
                    schema={schema}
                    validate="onChangeAfterSubmit"
                />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onChange).not.toBeCalled();
            expect(onSubmit).not.toBeCalled();

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            await new Promise(resolve => process.nextTick(resolve));

            expect(validator).toHaveBeenCalledTimes(2);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenLastCalledWith('key', 'value');

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(validator).toHaveBeenCalledTimes(3);
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenLastCalledWith(model);
        });

        it('validates (onSubmit)', async () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm
                    model={model}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onValidate={onValidate}
                    schema={schema}
                    validate="onSubmit"
                />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onChange).not.toBeCalled();
            expect(onSubmit).not.toBeCalled();

            wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

            await new Promise(resolve => process.nextTick(resolve));

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenLastCalledWith('key', 'value');

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(validator).toHaveBeenCalledTimes(2);
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenLastCalledWith(model);
        });
    });

    describe('when validated', () => {
        it('calls `onValidate`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenLastCalledWith({a: 2}, null, expect.any(Function));
        });

        it('calls `onValidate` (error)', () => {
            validator.mockImplementation(() => {
                throw error;
            });

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenLastCalledWith({a: 2}, error, expect.any(Function));
        });

        it('calls `onValidate` (`modelTransform`)', () => {
            const modelTransform = (mode, model) => {
                if (mode === 'validate') {
                    return {...model, b: 1};
                }

                return model;
            };

            const wrapper = mount(
                <ValidatedForm
                    model={model}
                    modelTransform={modelTransform}
                    onValidate={onValidate}
                    schema={schema}
                    validate="onChange"
                />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenLastCalledWith({a: 2, b: 1}, null, expect.any(Function));
        });

        it('works with async errors from `onSubmit`', async () => {
            onSubmit.mockImplementationOnce(() => Promise.reject(new Error()));

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(wrapper.instance().getChildContext()).toHaveProperty('uniforms.error', error);
        });

        it('works with async errors from `onValidate`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            const callArgs = onValidate.mock.calls[0];
            callArgs[2](error);

            expect(wrapper.instance().getChildContext()).toHaveProperty('uniforms.error', error);
        });

        it('works with no errors from `onValidate`', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onValidate={onValidate} validate="onChange" />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            const callArgs = onValidate.mock.calls[0];
            callArgs[2]();

            expect(wrapper.instance().getChildContext()).toHaveProperty('uniforms.error', null);
        });
    });

    describe('when reset', () => {
        it('removes `error`', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={model} onSubmit={onSubmit} schema={schema} />
            );

            wrapper.find('form').simulate('submit');

            expect(wrapper.instance().getChildContext().uniforms.error).toBeTruthy();

            wrapper.instance().reset();

            expect(wrapper.instance().getChildContext().uniforms.error).toBeNull();
        });
    });

    describe('when props are changed', () => {
        const anotherModel = {x: 2};

        describe('in "onChange" mode', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(
                    <ValidatedForm model={model} schema={schema} validate="onChange" />
                );
            });

            it('does not revalidate arbitrarily', () => {
                console.log('arb', wrapper);
                wrapper.setProps({anything: 'anything'});

                expect(validator).not.toBeCalled();
            });

            it('revalidates if `model` changes', () => {
                wrapper.setProps({model: anotherModel});

                expect(validator).toHaveBeenCalledTimes(1);
            });

            it('revalidates if `validator` changes', () => {
                wrapper.setProps({validator: {}});

                expect(validator).toHaveBeenCalledTimes(1);
            });
        });

        describe('in "onSubmit" mode', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(
                    <ValidatedForm model={model} schema={schema} validate="onSubmit" />
                );
            });

            it('does not revalidate', () => {
                wrapper.setProps({model: anotherModel, validator: {}});

                expect(validator).not.toBeCalled();
            });
        });

        describe('in any mode', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(
                    <ValidatedForm model={model} schema={schema} />
                );
            });

            // it('does not get a new validator arbitrarily', () => {
            //     ...
            // });

            // it('gets a new validator if `validator` changes', () => {
            //     ...
            // });

            it('calls the new validator if `schema` changes', () => {
                const alternativeValidator  = jest.fn();
                const alternativeSchema = {
                    getDefinition   () {},
                    messageForError () {},
                    objectKeys      () {},
                    validator:      () => alternativeValidator
                };

                wrapper.setProps({schema: alternativeSchema});

                wrapper.find('form').simulate('submit');

                expect(validator).not.toBeCalled();
                expect(alternativeValidator).toHaveBeenCalledTimes(1);
            });
        });

    });
});
