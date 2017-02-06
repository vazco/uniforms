import React       from 'react';
import {Component} from 'react';
import {describe}  from 'mocha';
import {expect}    from 'chai';
import {it}        from 'mocha';
import {mount}     from 'enzyme';

import QuickForm from 'uniforms/QuickForm';

describe('QuickForm', () => {
    /* eslint-disable react/display-name */
    class TestQuickForm extends QuickForm {
        getAutoField   = () => () => <i className="auto" />;
        getErrorsField = () => () => <i className="errors" />;
        getSubmitField = () => () => <i className="submit" />;
    }
    /* eslint-enable react/display-name */

    const schema = {
        getDefinition:   () => {},
        messageForError: () => {},
        objectKeys:      () => ['a', 'b', 'c'],
        validator:       () => {}
    };

    describe('when rendered with custom fields', () => {
        it('renders `AutoField` for each field', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper.find('.auto')).to.have.length.above(0);
        });

        it('renders `ErrorsField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper.find('.errors')).to.have.length.above(0);
        });

        it('renders `SubmitField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} />
            );

            expect(wrapper.find('.submit')).to.have.length.above(0);
        });
    });

    describe('when rendered with custom fields in `props`', () => {
        it('renders `AutoField` for each field', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField={() => <i className="autoOverride" />} />
            );

            expect(wrapper.find('.autoOverride')).to.have.length.above(0);
        });

        it('renders `ErrorsField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} errorsField={() => <i className="errorsOverride" />} />
            );

            expect(wrapper.find('.errorsOverride')).to.have.length.above(0);
        });

        it('renders `SubmitField`', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} submitField={() => <i className="submitOverride" />} />
            );

            expect(wrapper.find('.submitOverride')).to.have.length.above(0);
        });

        it('works with string', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField="code" />
            );

            expect(wrapper.find('code')).to.have.length.above(0);
        });

        it('works with elements', () => {
            class Code extends Component {
                render = () => <code />
            }

            const wrapper = mount(
                <TestQuickForm schema={schema} autoField={Code} />
            );

            expect(wrapper.find('code')).to.have.length.above(0);
        });

        it('works with functions', () => {
            const wrapper = mount(
                <TestQuickForm schema={schema} autoField={() => <code />} />
            );

            expect(wrapper.find('code')).to.have.length.above(0);
        });
    });

    describe('when rendered with children', () => {
        const wrapper = mount(
            <QuickForm schema={schema}>
                <div />
            </QuickForm>
        );

        it('renders children', () => {
            expect(wrapper.find('div')).to.have.length(1);
        });
    });
});
