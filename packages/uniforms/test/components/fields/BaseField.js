import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {BaseField}          from 'uniforms';
import {createSchemaBridge} from 'uniforms';

describe('BaseField', () => {
    class TestField extends BaseField {
        render () {
            return (
                <div {...this.getFieldProps()}>
                    {this.props.children}
                </div>
            );
        }
    }

    const error = {details: [{name: 'a'}]};
    const model = {a: {b: {c: 'example'}}};
    const onChange = spy();
    const state = {changed: false, changedMap: {}, label: true, disabled: false, placeholder: true};
    const schema = createSchemaBridge({
        getDefinition (name) {
            if (name === 'a' || name === 'a.b') {
                return {
                    type: Object,
                    label: name
                };
            }

            if (name === 'a.b.c') {
                return {
                    type: String,
                    label: name
                };
            }

            if (name === 'd') {
                return {
                    type: String,
                    defaultValue: 'D'
                };
            }

            if (name === 'e') {
                return {
                    type: String,
                    allowedValues: ['E']
                };
            }

            if (name === 'f') {
                return {
                    type: Number,
                    min: 42
                };
            }

            if (name === 'g') {
                return {
                    type: Number,
                    max: 42
                };
            }

            if (name === 'h') {
                return {
                    type: Number
                };
            }

            if (name === 'i') {
                return {
                    type: Date
                };
            }

            if (name === 'j') {
                return {
                    type: Array,
                    minCount: 3
                };
            }

            if (name === 'j.0') {
                return {
                    type: String
                };
            }

            if (name === 'k') {
                return {
                    type: Array
                };
            }

            if (name === 'k.0') {
                return {
                    type: String
                };
            }
        },

        messageForError () {
            return 'CorrectErrorMessage';
        },

        objectKeys (name) {
            if (name === 'a') {
                return ['b'];
            }

            if (name === 'a.b') {
                return ['c'];
            }

            return [];
        },

        validator () {}
    });

    afterEach(() => {
        onChange.reset();
    });

    context('child context', () => {
        const wrapper = mount(
            <TestField name="a" />,
            {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
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
            expect(context.uniforms).to.have.property('name').that.have.property(0, 'a');
        });

        it('have correct `schema`', () => {
            expect(context.uniforms).to.have.property('schema', schema);
        });

        it('have correct `state`', () => {
            expect(context.uniforms).to.have.property('state').that.is.an('object');
            expect(context.uniforms.state).to.have.property('label', true);
            expect(context.uniforms.state).to.have.property('disabled', false);
            expect(context.uniforms.state).to.have.property('placeholder', true);
        });

        it('have correct `onChange`', () => {
            expect(context.uniforms).to.have.property('onChange').that.is.a('function');
        });
    });

    context('when changed', () => {
        const wrapper = mount(
            <TestField name="a" />,
            {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
        );

        const props = wrapper.find('div').last().props();

        it('calls `onChange` once', () => {
            props.onChange({b: 1});

            expect(onChange).to.have.been.calledOnce;
        });

        it('calls `onChange` with correct name and value', () => {
            props.onChange({b: 1});

            expect(onChange).to.have.been.calledWith('a', {b: 1});
        });

        it('calls `onChange` with correct name and value (foreign field)', () => {
            props.onChange(1, 'a.b');

            expect(onChange).to.have.been.calledWith('a.b', 1);
        });
    });

    context('when nested', () => {
        const wrapper = mount(
            <TestField name="a">
                <TestField name="b">
                    <TestField name="c" />
                </TestField>
            </TestField>,
            {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
        );

        const props = wrapper.find('div').last().props();

        it('have correct `name`', () => {
            expect(props).to.have.property('name', 'a.b.c');
        });

        it('have correct `value`', () => {
            expect(props).to.have.property('value', 'example');
        });
    });

    context('when rendered', () => {
        const wrapper = mount(
            <TestField name="a" />,
            {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
        );

        const props = wrapper.find('div').props();

        it('have correct `changed`', () => {
            expect(props).to.have.property('changed', false);
        });

        it('have correct `disabled`', () => {
            expect(props).to.have.property('disabled', false);
        });

        it('have correct `error`', () => {
            expect(props).to.have.property('error', error.details[0]);
        });

        it('have correct `errorMessage`', () => {
            expect(props).to.have.property('errorMessage', 'CorrectErrorMessage');
        });

        it('have correct `field`', () => {
            expect(props).to.have.property('field').that.is.an('object');
            expect(props).to.have.property('field').that.is.deep.equal(schema.getField('a'));
        });

        it('have correct `findError`', () => {
            expect(props).to.have.property('findError').that.is.a('function');
            expect(props.findError('a')).to.deep.equal(props.error);
        });

        it('have correct `findField`', () => {
            expect(props).to.have.property('findField').that.is.a('function');
            expect(props.findField('a')).to.deep.equal(props.field);
        });

        it('have correct `findValue`', () => {
            expect(props).to.have.property('findValue').that.is.a('function');
            expect(props.findValue('a')).to.deep.equal(props.value);
        });

        it('have correct `fields`', () => {
            expect(props).to.have.property('fields').that.is.an('array');
            expect(props).to.have.property('fields').that.is.deep.equal(schema.getSubfields('a'));
        });

        it('have correct `id`', () => {
            expect(props).to.have.property('id').that.is.an('string');
        });

        it('have correct `label`', () => {
            expect(props).to.have.property('label', 'a');
        });

        it('have correct `name`', () => {
            expect(props).to.have.property('name', 'a');
        });

        it('have correct `onChange`', () => {
            expect(props).to.have.property('onChange').that.is.a('function');
        });

        it('have correct `parent`', () => {
            expect(props).to.have.property('parent', null);
        });

        it('have correct `placeholder`', () => {
            expect(props).to.have.property('placeholder', 'a');
        });

        it('have correct `value`', () => {
            expect(props).to.have.property('value', model.a);
        });
    });

    context('when rendered with invalid `name`', () => {
        it('throws correct error', () => {
            expect(() => {
                mount(
                    <TestField name="field" />,
                    {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
                );
            }).to.throw(Error, /Field not found in schema: 'field'/);
        });
    });

    context('when rendered with `id`', () => {
        it('have correct `id`', () => {
            const wrapper = mount(
                <TestField name="a" id="x" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('id', 'x');
        });
    });

    context('when rendered with `label`', () => {
        it('have correct `label` (true)', () => {
            const wrapper = mount(
                <TestField name="a" label />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('label', 'a');
        });

        it('have correct `label` (falsy value)', () => {
            const wrapper = mount(
                <TestField name="a" label={false} />,
                {context: {uniforms: {model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('label', '');
        });

        it('have correct `label` (null)', () => {
            const wrapper = mount(
                <TestField name="a" label={null} />,
                {context: {uniforms: {model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('label', null);
        });

        it('have correct `label` (string)', () => {
            const wrapper = mount(
                <TestField name="a" label="A" />,
                {context: {uniforms: {model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('label', 'A');
        });
    });

    context('when rendered with `placeholder`', () => {
        it('have correct `placeholder` (true)', () => {
            const wrapper = mount(
                <TestField name="a" placeholder />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('placeholder', 'a');
        });

        it('have correct `placeholder` (falsy value)', () => {
            const wrapper = mount(
                <TestField name="a" placeholder={false} />,
                {context: {uniforms: {model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('placeholder', '');
        });

        it('have correct `placeholder` (string)', () => {
            const wrapper = mount(
                <TestField name="a" placeholder="A" />,
                {context: {uniforms: {model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('placeholder', 'A');
        });
    });

    context('when rendered without value', () => {
        it('have correct `value` (defaultValue)', () => {
            const wrapper = mount(
                <TestField name="d" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value', 'D');
        });

        it('have correct `value` (allowedValues)', () => {
            const wrapper = mount(
                <TestField name="e" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value', 'E');
        });

        it('have correct `value` (min)', () => {
            const wrapper = mount(
                <TestField name="f" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value', 42);
        });

        it('have correct `value` (max)', () => {
            const wrapper = mount(
                <TestField name="g" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value', 42);
        });

        it('have correct `value` (Number)', () => {
            const wrapper = mount(
                <TestField name="h" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value', 0);
        });

        it('have correct `value` (Date)', () => {
            const wrapper = mount(
                <TestField name="i" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value').that.is.instanceOf(Date);
        });

        it('have correct `value` (minCount)', () => {
            const wrapper = mount(
                <TestField name="j" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value').that.is.deep.equal(['', '', '']);
        });

        it('have correct `value` (initialCount)', () => {
            const wrapper = mount(
                <TestField name="k" initialCount={2} />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );

            expect(wrapper.find('div').props()).to.have.property('value').that.is.deep.equal(['', '']);
        });
    });
});
