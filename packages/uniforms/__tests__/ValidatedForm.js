/* eslint "no-console": 1 */

import React    from 'react';
import {mount}  from 'enzyme';

import ValidatedForm from 'uniforms/ValidatedForm';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('ValidatedForm', () => {
    const onChange   = jest.fn();
    const onSubmit   = jest.fn();
    const onValidate = jest.fn((model, error, next) => next());
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

    describe('on validation', () => {
        let wrapper, form;

        beforeEach(async () => {
            wrapper = mount(<ValidatedForm model={model} schema={schema} onValidate={onValidate} />);
            form = wrapper.instance();
        });

        it('validates (when `.validate` is called)', () => {
            form.validate();
            expect(validator).toHaveBeenCalledTimes(1);
        });

        it('correctly calls `validator`', () => {
            form.validate();
            expect(validator).toHaveBeenCalledTimes(1);
            expect(validator).toHaveBeenLastCalledWith(model);
        });

        it('updates error state with errors from `validator`', async () => {
            validator.mockImplementationOnce(() => {
                throw error;
            });
            form.validate().catch(() => {});
            await new Promise(resolve => process.nextTick(resolve));

            expect(wrapper.instance().getChildContext()).toHaveProperty('uniforms.error', error);
        });

        it('correctly calls `onValidate` when validation succeeds', () => {
            form.validate();
            expect(onValidate).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenLastCalledWith(model, null, expect.any(Function));
        });

        it('correctly calls `onValidate` when validation fails ', () => {
            validator.mockImplementation(() => {
                throw error;
            });
            form.validate();

            expect(onValidate).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenLastCalledWith(model, error, expect.any(Function));
        });

        it('lets `onValidate` suppress `validator` errors', async () => {
            validator.mockImplementationOnce(() => {
                throw error;
            });
            onValidate.mockImplementationOnce((m, e, next) => {
                next(null);
            });
            wrapper.find('form').simulate('submit');
            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('updates error state with async errors from `onValidate`', async () => {
            onValidate.mockImplementationOnce((m, e, next) => {
                next(error);
            });
            form.validate();
            await new Promise(resolve => process.nextTick(resolve));

            expect(wrapper.instance().getChildContext()).toHaveProperty('uniforms.error', error);
        });


        it('uses `modelTransform`s `validate` mode', () => {
            const transformedModel = {b: 1};
            const modelTransform = (mode, model) => mode === 'validate' ? transformedModel : model;
            wrapper.setProps({modelTransform});
            form.validate();
            expect(validator).toHaveBeenLastCalledWith(transformedModel);
            expect(onValidate).toHaveBeenLastCalledWith(transformedModel, null, expect.any(Function));
        });
    });

    describe('when submitted', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />);
        });

        it('calls `onSubmit` when validation succeeds', async () => {
            wrapper.find('form').simulate('submit');
            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        it('skips `onSubmit` when validation fails', async () => {
            validator.mockImplementation(() => {
                throw error;
            });
            wrapper.find('form').simulate('submit');
            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).not.toBeCalled();
        });

        it('updates error state with async errors from `onSubmit`', async () => {
            onSubmit.mockImplementationOnce(() => Promise.reject(error));
            wrapper.find('form').simulate('submit');
            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).toHaveBeenCalled();
            expect(wrapper.instance().getChildContext()).toHaveProperty('uniforms.error', error);
        });
    });

    describe('on change', () => {
        describe('in "onChange" mode', () => {
            it('validates', () => {
                const wrapper = mount(<ValidatedForm model={model} schema={schema} validate="onChange" />);
                wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

                expect(validator).toHaveBeenCalledTimes(1);
            });
        });

        describe('in "onSubmit" mode', () => {
            it('does not validate', () => {
                const wrapper = mount(<ValidatedForm model={model} schema={schema} validate="onSubmit" />);
                wrapper.instance().getChildContext().uniforms.onChange('key', 'value');

                expect(validator).not.toHaveBeenCalled();
            });
        });

        describe('in "onChangeAfterSubmit" mode', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(<ValidatedForm model={model} schema={schema} validate="onChangeAfterSubmit" />);
            });

            it('does not validates before submit', () => {
                wrapper.instance().getChildContext().uniforms.onChange('key', 'value');
                expect(validator).not.toHaveBeenCalled();
            });

            it('validates after submit', async () => {
                wrapper.find('form').simulate('submit');
                await new Promise(resolve => process.nextTick(resolve));

                validator.mockReset();
                wrapper.instance().getChildContext().uniforms.onChange('key', 'value');
                expect(validator).toHaveBeenCalledTimes(1);
            });
        });
    });


    describe('on reset', () => {
        it('removes `error`', () => {
            const wrapper = mount(<ValidatedForm model={model} onSubmit={onSubmit} schema={schema} />);
            validator.mockImplementationOnce(() => {
                throw new Error();
            });
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
                wrapper = mount(<ValidatedForm model={model} schema={schema} validate="onChange" />);
            });

            it('does not revalidate arbitrarily', () => {
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
                wrapper = mount(<ValidatedForm model={model} schema={schema} validate="onSubmit" />);
            });

            it('does not revalidate', () => {
                wrapper.setProps({model: anotherModel, validator: {}});

                expect(validator).not.toBeCalled();
            });
        });

        describe('in any mode', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(<ValidatedForm model={model} schema={schema} />);
            });

            it.skip('Reuses the validator between validations', () => {
                // ...
            });

            it.skip('uses the new validator settings if `validator` changes', () => {
                // ...
            });

            it('uses the new validator if `schema` changes', () => {
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
