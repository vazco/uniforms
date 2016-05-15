import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {QuickForm} from 'uniforms';

describe('QuickForm', () => {
    const AutoField   = spy(() => null);
    const ErrorsField = spy(() => null);
    const SubmitField = spy(() => null);

    class TestQuickForm extends QuickForm {
        getAutoField () {
            return AutoField;
        }

        getErrorsField () {
            return ErrorsField;
        }

        getSubmitField () {
            return SubmitField;
        }
    }

    const schema = {
        getDefinition   () {},
        messageForError () {},
        objectKeys      () {return ['a', 'b', 'c'];},
        validator       () {}
    };

    beforeEach(() => {
        AutoField.reset();
        ErrorsField.reset();
        SubmitField.reset();
    });

    context('when rendered', () => {
        const wrapper = mount(
            <QuickForm schema={schema} />
        );

        it('is <form>', () => {
            expect(wrapper).to.have.tagName('form');
        });
    });

    context('when rendered with custom fields', () => {
        it('renders `AutoField` for each field', () => {
            mount(
                <TestQuickForm schema={schema} />
            );

            expect(AutoField).to.have.callCount(3);
        });

        it('renders `ErrorsField`', () => {
            mount(
                <TestQuickForm schema={schema} />
            );

            expect(ErrorsField).to.have.been.calledOnce;
        });

        it('renders `SubmitField`', () => {
            mount(
                <TestQuickForm schema={schema} />
            );

            expect(SubmitField).to.have.been.calledOnce;
        });
    });

    context('when rendered with children', () => {
        const wrapper = mount(
            <QuickForm schema={schema}>
                <div />
            </QuickForm>
        );

        it('renders children', () => {
            expect(wrapper).to.have.exactly(1).descendants('div');
        });
    });
});
