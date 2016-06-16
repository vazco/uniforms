import React       from 'react';
import {Component} from 'react';
import {expect}    from 'chai';
import {mount}     from 'enzyme';

import {QuickForm} from 'uniforms';

describe('QuickForm', () => {
    class TestQuickForm extends QuickForm {
        getAutoField   = () => () => <i className="auto" />;
        getErrorsField = () => () => <i className="errors" />;
        getSubmitField = () => () => <i className="submit" />;
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

            expect(wrapper).to.have.descendants('.auto');
        });

        it('renders `ErrorsField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper).to.have.descendants('.errors');
        });

        it('renders `SubmitField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper).to.have.descendants('.submit');
        });
    });

    context('when rendered with custom fields in `props`', () => {
        it('renders `AutoField` for each field', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField={() => <i className="autoOverride" />} />
            );

            expect(wrapper).to.have.descendants('.autoOverride');
        });

        it('renders `ErrorsField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} errorsField={() => <i className="errorsOverride" />} />
            );

            expect(wrapper).to.have.descendants('.errorsOverride');
        });

        it('renders `SubmitField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} submitField={() => <i className="submitOverride" />} />
            );

            expect(wrapper).to.have.descendants('.submitOverride');
        });

        it('works with string', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField="code" />
            );

            expect(wrapper).to.have.descendants('code');
        });

        it('works with elements', () => {
            class Code extends Component {render = () => <code />}
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField={Code} />
            );

            expect(wrapper).to.have.descendants('code');
        });

        it('works with functions', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField={() => <code />} />
            );

            expect(wrapper).to.have.descendants('code');
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
