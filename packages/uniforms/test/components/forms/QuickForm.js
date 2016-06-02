import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';

import {QuickForm} from 'uniforms';

describe('QuickForm', () => {
    class TestQuickForm extends QuickForm {
        getAutoField   = () => () => <i id="auto" />;
        getErrorsField = () => () => <i id="errors" />;
        getSubmitField = () => () => <i id="submit" />;
    }

    const schema = {
        getDefinition:   () => {},
        messageForError: () => {},
        objectKeys:      () => ['a', 'b', 'c'],
        validator:       () => {}
    };

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
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper).to.have.descendants('#auto');
        });

        it('renders `ErrorsField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper).to.have.descendants('#errors');
        });

        it('renders `SubmitField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper).to.have.descendants('#submit');
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
