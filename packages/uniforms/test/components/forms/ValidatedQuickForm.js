import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {ValidatedQuickForm} from 'uniforms';

describe('ValidatedQuickForm', () => {
    const AutoField   = spy(() => null);
    const ErrorsField = spy(() => null);
    const SubmitField = spy(() => null);

    class TestValidatedQuickForm extends ValidatedQuickForm {
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

    const validator = spy();
    const schema = {
        objectKeys () {
            return ['a', 'b', 'c'];
        },
        validator () {
            return validator;
        }
    };

    beforeEach(() => {
        validator.reset();
        AutoField.reset();
        ErrorsField.reset();
        SubmitField.reset();
    });

    context('when rendered', () => {
        const wrapper = mount(
            <ValidatedQuickForm schema={schema} />
        );

        it('is <form>', () => {
            expect(wrapper).to.have.tagName('form');
        });
    });

    context('when rendered with custom fields', () => {
        it('renders `AutoField` for each field', () => {
            mount(
                <TestValidatedQuickForm schema={schema} />
            );

            expect(AutoField).to.have.callCount(3);
        });

        it('renders `ErrorsField`', () => {
            mount(
                <TestValidatedQuickForm schema={schema} />
            );

            expect(ErrorsField).to.have.been.calledOnce;
        });

        it('renders `SubmitField`', () => {
            mount(
                <TestValidatedQuickForm schema={schema} />
            );

            expect(SubmitField).to.have.been.calledOnce;
        });
    });

    context('when rendered with children', () => {
        const wrapper = mount(
            <ValidatedQuickForm schema={schema}>
                <div />
            </ValidatedQuickForm>
        );

        it('renders children', () => {
            expect(wrapper).to.have.exactly(1).descendants('div');
        });
    });
});
