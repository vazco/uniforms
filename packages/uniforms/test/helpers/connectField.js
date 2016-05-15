import React    from 'react';
import {expect} from 'chai';
import {match}  from 'sinon';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {connectField}       from 'uniforms';
import {createSchemaBridge} from 'uniforms';

describe('connectField', () => {
    const error = new Error();
    const model = {field: 'Value'};
    const onChange = spy();
    const state = {label: true, disabled: false, placeholder: false};
    const schema = createSchemaBridge({
        getDefinition (name) {
            if (name === 'field') {
                return {
                    type: String,
                    label: 'Field'
                };
            }

            /* istanbul ignore else */
            if (name === 'field.subfield') {
                return {
                    type: Number,
                    label: 'SubField'
                };
            }
        },

        messageForError () {},

        objectKeys (name) {
            if (name === 'field') {
                return ['subfield'];
            }

            /* istanbul ignore else */
            if (name === 'field.subfield') {
                return [];
            }
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

            expect(Test).to.have.been.calledWithMatch({parent: {label: 'Field', field: {type: String}}});
        });

        it('hides parent field (false)', () => {
            const Field = connectField(Test, {includeParent: false});

            mount(
                <Field name="field.subfield" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(Test).to.have.not.been.calledWithMatch({parent: {label: 'Field', field: {type: String}}});
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

    context('when called with `includeDefault`', () => {
        it('includes default value (true)', () => {
            const Field = connectField(Test, {includeDefault: true});

            mount(
                <Field name="field" />,
                {context: {uniforms: {error, model: {}, name: [], schema, state, onChange}}}
            );

            expect(onChange).to.have.been.calledWith('field', '');
        });

        it('does nothing (false)', () => {
            const Field = connectField(Test, {includeDefault: false});

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

    context('when rendered', () => {
        beforeEach(() => {
            mount(
                <Field name="field" />,
                {context: {uniforms: {error, model, name: [], schema, state, onChange}}}
            );
        });

        it('have correct `disabled`', () => {
            expect(Test).to.have.been.calledWithMatch({disabled: false});
        });

        it('have correct `error`', () => {
            expect(Test).to.have.been.calledWithMatch({error: undefined});
        });

        it('have correct `field`', () => {
            expect(Test).to.have.been.calledWithMatch({field: {label: 'Field', type: String}});
        });

        it('have correct `fields`', () => {
            expect(Test).to.have.been.calledWithMatch({fields: ['subfield']});
        });

        it('have correct `label`', () => {
            expect(Test).to.have.been.calledWithMatch({label: 'Field'});
        });

        it('have correct `name`', () => {
            expect(Test).to.have.been.calledWithMatch({name: 'field'});
        });

        it('have correct `onChange`', () => {
            expect(Test).to.have.been.calledWithMatch({onChange: match.typeOf('function')});
        });

        it('have correct `parent`', () => {
            expect(Test).to.have.been.calledWithMatch({parent: null});
        });

        it('have correct `placeholder`', () => {
            expect(Test).to.have.been.calledWithMatch({placeholder: ''});
        });

        it('have correct `value`', () => {
            expect(Test).to.have.been.calledWithMatch({value: 'Value'});
        });
    });
});
