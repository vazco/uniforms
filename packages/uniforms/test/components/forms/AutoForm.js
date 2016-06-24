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

            expect(onChange.calledOnce).to.be.ok;
            expect(onChange.calledWith('a', 2)).to.be.ok;
        });
    });

    context('when rendered', () => {
        const wrapper = mount(
            <AutoForm onSubmit={onSubmit} schema={schema} autosave />
        );

        it('skips `onSubmit` until rendered (`autosave` = true)', () => {
            expect(onSubmit.called).to.be.false;
            wrapper.instance().getChildContext().uniforms.onChange('a', 1);
            expect(onSubmit.calledOnce).to.be.ok;
            expect(onSubmit.calledWith({a: 1})).to.be.ok;
        });
    });

    context('when updated', () => {
        const wrapper = mount(
            <AutoForm schema={schema} />
        );

        it('updates when changed', () => {
            wrapper.setProps({model: {}});

            expect(validator.called).to.be.false;
        });

        it('validates', () => {
            wrapper.setProps({model});

            expect(validator.calledOnce).to.be.ok;
        });
    });
});
