import React       from 'react';
import {afterEach} from 'mocha';
import {describe}  from 'mocha';
import {expect}    from 'chai';
import {it}        from 'mocha';
import {mount}     from 'enzyme';
import {spy}       from 'sinon';

import BaseField          from 'uniforms/BaseField';
import createSchemaBridge from 'uniforms/createSchemaBridge';
import nothing            from 'uniforms/nothing';
import randomIds          from 'uniforms/randomIds';

describe('BaseField', () => {
    const PropsComponent = () => nothing;

    class TestField extends BaseField {
        render () {
            return (
                <div>
                    <PropsComponent {...this.getFieldProps()} />
                    {this.props.children}
                </div>
            );
        }
    }

    const error1 = {details: [{name: 'a'}]};
    const error2 = {details: [{name: 'b'}]};
    const model = {a: {b: {c: 'example'}}};
    const onChange = spy();
    const randomId = randomIds();
    const state = {changed: !1, changedMap: {}, label: !0, disabled: !1, placeholder: !0, showInlineError: !0};
    const schema = createSchemaBridge({
        getDefinition (name) {
            // Simulate SimpleSchema.
            name = name.replace(/\d+/g, '$');

            return {
                'a':     {type: Object, label: name},
                'a.b':   {type: Object, label: name},
                'a.b.c': {type: String, label: name},
                'b':     {type: String},
                'd':     {type: String, defaultValue: 'D'},
                'e':     {type: String, allowedValues: ['E']},
                'f':     {type: Number, min: 42},
                'g':     {type: Number, max: 42},
                'h':     {type: Number},
                'i':     {type: Date},
                'j':     {type: Array, minCount: 3},
                'j.$':   {type: String},
                'k':     {type: Array},
                'k.$':   {type: String},
                'l':     {type: String, uniforms: {label: false}},
                'm':     {type: String, uniforms: {placeholder: false}}
            }[name];
        },

        messageForError () {
            return 'CorrectErrorMessage';
        },

        objectKeys (name) {
            return {
                'a':   ['b'],
                'a.b': ['c']
            }[name] || [];
        },

        validator () {}
    });

    const reactContextBase = {error: error1, model, name: [], randomId, schema, state, onChange};
    const reactContext1 = {context: {uniforms: {...reactContextBase}}};
    const reactContext2 = {context: {uniforms: {...reactContextBase, error: error2}}};
    const reactContext3 = {context: {uniforms: {...reactContextBase, error: {...error2}}}};
    const reactContext4 = {context: {uniforms: {...reactContextBase, name: ['a']}}};
    const reactContext5 = {context: {uniforms: {...reactContextBase, schema: Object.create(schema)}}};

    afterEach(() => {
        onChange.reset();
    });

    describe('child context', () => {
        const wrapper = mount(
            <TestField name="a" />,
            reactContext1
        );

        const context = wrapper.instance().getChildContext();

        it('exists', () => {
            expect(context).to.have.property('uniforms').that.is.an('object');
        });

        it('have correct `error`', () => {
            expect(context.uniforms).to.have.property('error', error1);
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
            expect(context.uniforms.state).to.have.property('showInlineError', true);
        });

        it('have correct `onChange`', () => {
            expect(context.uniforms).to.have.property('onChange').that.is.a('function');
        });
    });

    describe('when changed', () => {
        const wrapper = mount(
            <TestField name="a" />,
            reactContext1
        );

        const props = wrapper.find(PropsComponent).last().props();

        it('calls `onChange` once', () => {
            props.onChange({b: 1});

            expect(onChange.calledOnce).to.be.ok;
        });

        it('calls `onChange` with correct name and value', () => {
            props.onChange({b: 1});

            expect(onChange.calledWith('a', {b: 1})).to.be.ok;
        });

        it('calls `onChange` with correct name and value (foreign field)', () => {
            props.onChange(1, 'a.b');

            expect(onChange.calledWith('a.b', 1)).to.be.ok;
        });
    });

    describe('when nested', () => {
        const wrapper = mount(
            <TestField name="a">
                <TestField name="b">
                    <TestField name="c" />
                </TestField>
            </TestField>,
            reactContext1
        );

        const props = wrapper.find(PropsComponent).last().props();

        it('have correct `name`', () => {
            expect(props).to.have.property('name', 'a.b.c');
        });

        it('have correct `value`', () => {
            expect(props).to.have.property('value', 'example');
        });

        it('have unique `id`', () => {
            expect(props).to.have.property('id').that.is.not.equal(wrapper.find(TestField).first().props().id);
        });
    });

    describe('when rendered', () => {
        const wrapper = mount(
            <TestField name="a" />,
            reactContext1
        );

        const props = wrapper.find(PropsComponent).props();

        it('have correct `changed`', () => {
            expect(props).to.have.property('changed', false);
        });

        it('have correct `disabled`', () => {
            expect(props).to.have.property('disabled', false);
        });

        it('have correct `error`', () => {
            expect(props).to.have.property('error', error1.details[0]);
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

        it('have correct `showInlineError`', () => {
            expect(props).to.have.property('showInlineError', true);
        });

        it('have correct `value`', () => {
            expect(props).to.have.property('value', model.a);
        });
    });

    describe('when rendered with invalid `name`', () => {
        it('throws correct error', () => {
            expect(() => {
                mount(
                    <TestField name="field" />,
                    reactContext1
                );
            }).to.throw(Error, /Field not found in schema: "field"/);
        });
    });

    describe('when rendered with `id`', () => {
        it('have correct `id`', () => {
            const wrapper = mount(
                <TestField name="a" id="x" />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('id', 'x');
        });
    });

    describe('when rendered with `label`', () => {
        it('have correct `label` (true)', () => {
            const wrapper = mount(
                <TestField name="a" label />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('label', 'a');
        });

        it('have correct `label` (true and falsy value in schema)', () => {
            const wrapper = mount(
                <TestField name="l" label />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('label', '');
        });

        it('have correct `label` (falsy value)', () => {
            const wrapper = mount(
                <TestField name="a" label={false} />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('label', '');
        });

        it('have correct `label` (falsy value in schema)', () => {
            const wrapper = mount(
                <TestField name="l" />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('label', '');
        });

        it('have correct `label` (null)', () => {
            const wrapper = mount(
                <TestField name="a" label={null} />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('label', null);
        });

        it('have correct `label` (string)', () => {
            const wrapper = mount(
                <TestField name="a" label="A" />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('label', 'A');
        });
    });

    describe('when rendered with `placeholder`', () => {
        it('have correct `placeholder` (true)', () => {
            const wrapper = mount(
                <TestField name="a" placeholder />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('placeholder', 'a');
        });

        it('have correct `placeholder` (true and falsy value in schema)', () => {
            const wrapper = mount(
                <TestField name="m" placeholder />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('placeholder', '');
        });

        it('have correct `placeholder` (falsy value)', () => {
            const wrapper = mount(
                <TestField name="a" placeholder={false} />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('placeholder', '');
        });

        it('have correct `placeholder` (falsy value in schema)', () => {
            const wrapper = mount(
                <TestField name="m" />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('placeholder', '');
        });

        it('have correct `placeholder` (string)', () => {
            const wrapper = mount(
                <TestField name="a" placeholder="A" />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('placeholder', 'A');
        });
    });

    describe('when rendered without value', () => {
        it('have correct `value` (defaultValue)', () => {
            const wrapper = mount(
                <TestField name="d" />,
                reactContext1
            );

            expect(wrapper.find(PropsComponent).props()).to.have.property('value', 'D');
        });
    });

    describe('when rerendered', () => {
        it('have same `id`', () => {
            const wrapper = mount(
                <TestField name="d" />,
                reactContext1
            );

            const props1 = wrapper.find(PropsComponent).props();
            expect(props1).to.have.property('id').that.is.an('string');

            wrapper.setProps({name: 'e'});

            const props2 = wrapper.find(PropsComponent).props();
            expect(props2).to.have.property('id', props1.id);
        });

        it('updates on error change', () => {
            const wrapper = mount(
                <TestField name="a" />,
                reactContext1
            );

            const props1 = wrapper.find(PropsComponent).props();
            expect(props1).to.have.property('error', error1.details[0]);

            wrapper.setContext(reactContext2.context);

            const props2 = wrapper.find(PropsComponent).props();
            expect(props2).to.have.property('error').that.is.not.ok;

            wrapper.setContext(reactContext3.context);

            const props3 = wrapper.find(PropsComponent).props();
            expect(props3).to.have.property('error').that.is.not.ok;
        });

        it('updates on name change', () => {
            const wrapper = mount(
                <TestField name="b" />,
                reactContext1
            );

            const props1 = wrapper.find(PropsComponent).props();
            expect(props1).to.have.property('name', 'b');

            wrapper.setContext(reactContext4.context);

            const props2 = wrapper.find(PropsComponent).props();
            expect(props2).to.have.property('name', 'a.b');
        });

        it('updates on schema change', () => {
            const wrapper = mount(
                <TestField name="a" />,
                reactContext1
            );

            const props1 = wrapper.find(PropsComponent).props();

            wrapper.setContext(reactContext5.context);

            const props2 = wrapper.find(PropsComponent).props();

            [
                'changed',
                'changedMap',
                'disabled',
                'error',
                'errorMessage',
                'field',
                'fieldType',
                'fields',
                // 'findError', // It's a dynamic function.
                // 'findField', // It's a dynamic function.
                // 'findValue', // It's a dynamic function.
                'id',
                'label',
                'name',
                // 'onChange',  // It's a dynamic function.
                'parent',
                'placeholder',
                'required',
                'showInlineError',
                'value'
            ].forEach(prop => expect(props2).to.have.property(prop).that.is.deep.equal(props1[prop]));
        });
    });
});
