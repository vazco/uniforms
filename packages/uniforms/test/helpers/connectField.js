import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {connectField}       from 'uniforms';
import {createSchemaBridge} from 'uniforms';

describe('connectField', () => {
    const error = new Error();
    const onChange = spy();
    const state = {changed: false, changedMap: {}, label: true, disabled: false, placeholder: false};
    const schema = createSchemaBridge({
        getDefinition (name) {
            return {
                'field':          {type: Object, label: 'Field'},
                'field.subfield': {type: Number, label: 'Subfield'}
            }[name];
        },

        messageForError () {},

        objectKeys (name) {
            return {
                'field':          ['subfield'],
                'field.subfield': []
            }[name];
        },

        validator () {}
    });

    const Test = spy(() => null);
    const Field = connectField(Test);

    beforeEach(() => {
        Test.reset();
        onChange.reset();
    });

    context('when called', () => {
        it('creates component', () => {
            const Field = connectField(Test);

            expect(Field).to.be.function;
        });
    });

    context('when called with `baseField`', () => {
        it('inherits from `baseField`', () => {
            /* istanbul ignore next */
            class Class {}

            Class.property1 = 1;
            Class.property2 = 2;

            const Field = connectField(Test, {baseField: Class});

            expect(Field).to.have.property('property1', 1);
            expect(Field).to.have.property('property2', 2);
        });
    });

    context('when called with `includeParent`', () => {
        it('provides parent field (true)', () => {
            const Field = connectField(Test, {includeParent: true});

            mount(
                <Field name="field.subfield" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(Test).to.have.been.calledWithMatch({parent: {label: 'Field', field: {type: Object}}});
        });

        it('hides parent field (false)', () => {
            const Field = connectField(Test, {includeParent: false});

            mount(
                <Field name="field.subfield" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(Test).to.have.not.been.calledWithMatch({parent: {label: 'Field', field: {type: Object}}});
        });
    });

    context('when called with `includeInChain`', () => {
        it('is in chain (true)', () => {
            const Field1 = connectField(props => props.children, {includeInChain: true});
            const Field2 = connectField(Test);

            mount(
                <Field1 name="field">
                    <Field2 name="subfield" />
                </Field1>,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(Test).to.have.been.calledWithMatch({name: 'field.subfield'});
        });

        it('is not in chain (false)', () => {
            const Field1 = connectField(props => props.children, {includeInChain: false});
            const Field2 = connectField(Test);

            mount(
                <Field1 name="field">
                    <Field2 name="field.subfield" />
                </Field1>,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(Test).to.have.been.calledWithMatch({name: 'field.subfield'});
        });
    });

    context('when called with `initialValue`', () => {
        it('includes default value (true)', () => {
            const Field = connectField(Test, {initialValue: true});

            mount(
                <Field name="field" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(onChange).to.have.been.calledWith('field', {});
        });

        it('does nothing (false)', () => {
            const Field = connectField(Test, {initialValue: false});

            mount(
                <Field name="field" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(onChange).to.have.been.not.called;
        });
    });

    context('when called with `mapProps`', () => {
        it('provides mapped props', () => {
            const Field = connectField(Test, {mapProps: () => ({a: 1})});

            mount(
                <Field name="field" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(Test).to.have.been.calledWith({a: 1});
        });
    });
});
