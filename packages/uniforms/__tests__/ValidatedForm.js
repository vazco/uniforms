import React    from 'react';
import {mount}  from 'enzyme';

import ValidatedForm from 'uniforms/ValidatedForm';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

// FIXME: This fail sometimes when ran simultaneously.
describe('ValidatedForm', () => {
    const onChange   = jest.fn();
    const onSubmit   = jest.fn();
    const onValidate = jest.fn();
    const validator  = jest.fn();

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
        onChange.mockReset();
        onSubmit.mockReset();
        onValidate.mockReset();
        validator.mockReset();
    });

    describe('when reset', () => {
        it('removes `error`', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            expect(validator).toHaveBeenCalled();
            expect(wrapper.instance().getChildContext().uniforms.error).toBeTruthy();

            wrapper.instance().reset();

            expect(wrapper.instance().getChildContext().uniforms.error).toBeNull();
        });
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
                <ValidatedForm error={error} model={model} schema={schema} onSubmit={onSubmit} />
            );

            wrapper.find('form').simulate('submit');

            await new Promise(resolve => process.nextTick(resolve));

            expect(onSubmit).not.toBeCalled();
        });

        it('revalidates with new model only if required', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} />
            );

            expect(validator).not.toBeCalled();

            wrapper.setProps({model});

            expect(validator).not.toBeCalled();
        });

        it('revalidates with new model', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} validate="onChange" />
            );

            expect(validator).not.toBeCalled();

            wrapper.setProps({model});

            expect(validator).toHaveBeenCalledTimes(1);
        });

        it('revalidates with new model only when changed', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} />
            );

            expect(validator).not.toBeCalled();

            wrapper.setProps({model});

            expect(validator).not.toBeCalled();
        });

        it('revalidates with new validator only if required', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} validate="onChange" />
            );

            expect(validator).not.toBeCalled();

            wrapper.setProps({model, validator: {}});

            expect(validator).toHaveBeenCalledTimes(1);
        });

        it('revalidates with new validator', () => {
            validator.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={{}} schema={schema} />
            );

            expect(validator).not.toBeCalled();

            wrapper.setProps({model, validator: {}});

            expect(validator).not.toBeCalled();
        });

        it('validates (onChange)', () => {
            validator.mockImplementation(() => {
                throw new Error();
            });

            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onChange={onChange} validate="onChange" />
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
                    schema={schema}
                    onValidate={onValidate}
                    validate="onChange"
                />
            );

            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(validator).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenCalledTimes(1);
            expect(onValidate).toHaveBeenLastCalledWith({a: 2, b: 1}, null, expect.any(Function));
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

    describe('when props changed', () => {
        it('calls correct validator', () => {
            const wrapper = mount(
                <ValidatedForm model={model} schema={schema} onSubmit={onSubmit} />
            );

            const alternativeValidator  = jest.fn();
            const alternativeSchema = {
                getDefinition   () {},
                messageForError () {},
                objectKeys      () {},
                validator () {
                    return alternativeValidator;
                }
            };

            wrapper.setProps({schema: alternativeSchema});

            wrapper.find('form').simulate('submit');

            expect(validator).toHaveBeenCalledTimes(0);
            expect(alternativeValidator).toHaveBeenCalledTimes(1);
        });
    });
});
