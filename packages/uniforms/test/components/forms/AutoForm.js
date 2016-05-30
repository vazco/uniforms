import React    from 'react';
import {expect} from 'chai';
import {mount}  from 'enzyme';
import {spy}    from 'sinon';

import {AutoForm} from 'uniforms';

describe('AutoForm', () => {
    const validator = spy();
    const onChange = spy();
    const onSubmit = spy();
    const model = {a: 1};
    const schema = {
        getDefinition:   () => {},
        messageForError: () => {},
        objectKeys:      () => ['a', 'b', 'c'],
        validator:       () => validator
    };

    beforeEach(() => {
        validator.reset();
    });

    context('when changed', () => {
        const wrapper = mount(
            <AutoForm onChange={onChange} schema={schema} />
        );

        it('updates', () => {
            wrapper.instance().getChildContext().uniforms.onChange('a', 2);

            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith('a', 2);
        });
    });

    context('when rendered', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('skips `onSubmit` until rendered (`autosave` = true)', () => {
            expect(onSubmit).to.have.been.not.called;
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            expect(onSubmit).to.have.been.calledOnce;
            expect(onSubmit).to.have.been.calledWith({a: 1});
        });
    });

    context('when updated', () => {
        const wrapper = mount(
            <AutoForm schema={schema} />
        );

        it('updates when changed', () => {
            wrapper.setProps({model: {}});

            expect(validator).to.have.been.not.called;
        });

        it('validates', () => {
            wrapper.setProps({model});

            expect(validator).to.have.been.calledOnce;
        });
    });
});
