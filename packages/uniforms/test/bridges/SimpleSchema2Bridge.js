import SimpleSchema from 'simpl-schema';
import {expect}     from 'chai';

import {SimpleSchema2Bridge} from 'uniforms';

describe('SimpleSchema2Bridge', () => {
    const noop = () => {};
    const schema = new SimpleSchema({
        'a':     {type: Object, label: name},
        'a.b':   {type: Object, label: name},
        'a.b.c': {type: String, label: name},
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
        'l':     {type: String, uniforms: 'div'},
        'm':     {type: String, uniforms: noop},
        'n':     {type: String, uniforms: {component: 'div'}},
        'o':     {type: Array},
        'o.$':   {type: String, allowedValues: ['O']},
        'p':     {type: Array},
        'p.$':   {type: String, uniforms: {transform: noop}},
        'r':     {type: String, uniforms: {options: {a: 1, b: 2}}},
        's':     {type: String, uniforms: {options: [{label: 1, value: 'a'}, {label: 2, value: 'b'}]}},
        't':     {type: String, uniforms: {options: () => ({a: 1, b: 2})}}
    });

    const bridge = new SimpleSchema2Bridge(schema);

    context('#check()', () => {
        it('works correctly without schema', () => {
            expect(SimpleSchema2Bridge.check()).to.be.falsy;
        });

        Object.keys(schema).forEach(method => {
            it(`works correctly without '${method}'`, () => {
                expect(SimpleSchema2Bridge.check({...schema, [method]: null})).to.be.falsy;
            });
        });
    });

    context('#getError', () => {
        it('works without error', () => {
            expect(bridge.getError('a')).to.be.falsy;
        });

        it('works with invalid error', () => {
            expect(bridge.getError('a', {})).to.be.falsy;
            expect(bridge.getError('a', {invalid: true})).to.be.falsy;
        });

        it('works with correct error', () => {
            expect(bridge.getError('a', {details: [{name: 'a'}]})).to.be.deep.equal({name: 'a'});
            expect(bridge.getError('a', {details: [{name: 'b'}]})).to.be.falsy;
        });
    });

    context('#getErrorMessage', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessage('a')).to.be.falsy;
        });

        it('works with invalid error', () => {
            expect(bridge.getErrorMessage('a', {})).to.be.falsy;
            expect(bridge.getErrorMessage('a', {invalid: true})).to.be.falsy;
        });

        it('works with correct error', () => {
            expect(bridge.getErrorMessage('a', {details: [{name: 'a', details: {value: 1}}]})).to.be.ok;
            expect(bridge.getErrorMessage('a', {details: [{name: 'b', details: {value: 1}}]})).to.be.falsy;
        });
    });

    context('#getErrorMessages', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessages()).to.be.deep.equal([]);
        });

        it('works with other errors', () => {
            expect(bridge.getErrorMessages('correct')).to.be.deep.equal(['correct']);
            expect(bridge.getErrorMessages(999999999)).to.be.deep.equal([999999999]);
        });

        it('works with Error', () => {
            expect(bridge.getErrorMessages(new Error('correct'))).to.be.deep.equal(['correct']);
        });

        it('works with ValidationError', () => {
            expect(bridge.getErrorMessages({details: [{name: 'a', details: {value: 1}}]})).to.have.length(1);
            expect(bridge.getErrorMessages({details: [{name: 'b', details: {value: 1}}]})).to.have.length(1);
        });
    });

    context('#getField', () => {
        it('return correct definition', () => {
            const definition = schema.getDefinition('a');
            const definitionComposed = {...definition, ...definition.type[0]};

            expect(bridge.getField('a')).to.be.deep.equal(definitionComposed);
        });

        it('throws on not found field', () => {
            expect(() => bridge.getField('x')).to.throw(/Field not found in schema/);
        });
    });

    context('#getInitialValue', () => {
        it('works with arrays', () => {
            expect(bridge.getInitialValue('k')).to.be.deep.equal([]);
        });

        it('works with objects', () => {
            expect(bridge.getInitialValue('a')).to.be.deep.equal({});
        });
    });

    context('#getProps', () => {
        it('works with allowedValues', () => {
            expect(bridge.getProps('o', {})).to.be.deep.equal({label: 'O', required: true, allowedValues: ['O']});
        });

        it('works with allowedValues from props', () => {
            expect(bridge.getProps('o', {allowedValues: ['O']})).to.be.deep.equal({label: 'O', required: true});
        });

        it('works with custom component', () => {
            expect(bridge.getProps('l', {})).to.be.deep.equal({label: 'L', required: true, component: 'div'});
            expect(bridge.getProps('m', {})).to.be.deep.equal({label: 'M', required: true, component: noop});
        });

        it('works with custom component (field)', () => {
            expect(bridge.getProps('n', {})).to.be.deep.equal({label: 'N', required: true, component: 'div'});
        });

        it('works with options (array)', () => {
            expect(bridge.getProps('s', {}).transform('a')).to.be.equal(1);
            expect(bridge.getProps('s', {}).transform('b')).to.be.equal(2);
            expect(bridge.getProps('s', {}).allowedValues[0]).to.be.equal('a');
            expect(bridge.getProps('s', {}).allowedValues[1]).to.be.equal('b');
        });

        it('works with options (function)', () => {
            expect(bridge.getProps('t', {}).transform('a')).to.be.equal(1);
            expect(bridge.getProps('t', {}).transform('b')).to.be.equal(2);
            expect(bridge.getProps('t', {}).allowedValues[0]).to.be.equal('a');
            expect(bridge.getProps('t', {}).allowedValues[1]).to.be.equal('b');
        });

        it('works with options (object)', () => {
            expect(bridge.getProps('r', {}).transform('a')).to.be.equal(1);
            expect(bridge.getProps('r', {}).transform('b')).to.be.equal(2);
            expect(bridge.getProps('r', {}).allowedValues[0]).to.be.equal('a');
            expect(bridge.getProps('r', {}).allowedValues[1]).to.be.equal('b');
        });

        it('works with options from props', () => {
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).transform('c')).to.be.equal(1);
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).transform('d')).to.be.equal(2);
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).allowedValues[0]).to.be.equal('c');
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).allowedValues[1]).to.be.equal('d');
        });

        it('works with transform', () => {
            expect(bridge.getProps('p', {})).to.be.deep.equal({label: 'P', required: true, transform: noop});
        });

        it('works with transform from props', () => {
            expect(bridge.getProps('p', {transform: () => {}})).to.be.deep.equal({label: 'P', required: true});
        });
    });

    context('#getSubfields', () => {
        it('works with objects', () => {
            expect(bridge.getSubfields('a')).to.be.deep.equal(['b']);
            expect(bridge.getSubfields('a.b')).to.be.deep.equal(['c']);
        });

        it('works with primitives', () => {
            expect(bridge.getSubfields('d')).to.be.deep.equal([]);
            expect(bridge.getSubfields('e')).to.be.deep.equal([]);
        });
    });

    context('#getType', () => {
        it('works with any type', () => {
            expect(bridge.getType('a')).to.be.equal(Object);
            expect(bridge.getType('j')).to.be.equal(Array);
            expect(bridge.getType('d')).to.be.equal(String);
            expect(bridge.getType('f')).to.be.equal(Number);
            expect(bridge.getType('i')).to.be.equal(Date);
        });
    });

    context('#getValidator', () => {
        it('calls correct validator', () => {
            expect(() => bridge.getValidator()({})).to.throw();
        });
    });
});
