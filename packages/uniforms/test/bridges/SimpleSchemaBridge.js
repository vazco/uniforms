import {expect} from 'chai';

import {SimpleSchemaBridge} from 'uniforms';

describe('Bridge', () => {
    const noop = () => {};
    const schema = {
        getDefinition (name) {
            // Simulate SimpleSchema.
            name = name.replace(/\d+/g, '$');

            return {
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
                'p.$':   {type: String, transform: noop},
                'r':     {type: String, uniforms: {options: {a: 1, b: 2}}},
                's':     {type: String, uniforms: {options: [{label: 1, value: 'a'}, {label: 2, value: 'b'}]}},
                't':     {type: String, uniforms: {options: () => ({a: 1, b: 2})}}
            }[name];
        },

        messageForError (type, name) {
            return `(${name})`;
        },

        objectKeys (name) {
            return {
                'a':   ['b'],
                'a.b': ['c']
            }[name] || [];
        },

        validator () {
            throw 'ValidationError';
        }
    };

    const bridge = new SimpleSchemaBridge(schema);

    context('#check()', () => {
        it('works correctly without schema', () => {
            expect(SimpleSchemaBridge.check()).to.be.falsy;
        });

        Object.keys(schema).forEach(method => {
            it(`works correctly without '${method}'`, () => {
                expect(SimpleSchemaBridge.check({...schema, [method]: null})).to.be.falsy;
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
            expect(bridge.getErrorMessage('a', {details: [{name: 'a', details: {value: 1}}]})).to.be.equal('(a)');
            expect(bridge.getErrorMessage('a', {details: [{name: 'b', details: {value: 1}}]})).to.be.falsy;
        });
    });

    context('#getErrorMessages', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessages()).to.be.deep.equal([]);
        });

        it('works with invalid error', () => {
            expect(bridge.getErrorMessages({})).to.be.deep.equal([]);
            expect(bridge.getErrorMessages({invalid: true})).to.be.deep.equal([]);
        });

        it('works with correct error', () => {
            expect(bridge.getErrorMessages({details: [{name: 'a', details: {value: 1}}]})).to.be.deep.equal(['(a)']);
            expect(bridge.getErrorMessages({details: [{name: 'b', details: {value: 1}}]})).to.be.deep.equal(['(b)']);
        });
    });

    context('#getField', () => {
        it('return correct definition', () => {
            expect(bridge.getField('a')).to.be.deep.equal(schema.getDefinition('a'));
        });

        it('throws on not found field', () => {
            expect(() => bridge.getField('x')).to.throw(/Field not found in schema/);
        });
    });

    context('#getInitialValue', () => {
        it('works with allowedValues', () => {
            expect(bridge.getInitialValue('e')).to.be.equal('E');
        });

        it('works with arrays', () => {
            expect(bridge.getInitialValue('k')).to.be.deep.equal([]);
        });

        it('works with arrays (minCount)', () => {
            expect(bridge.getInitialValue('j')).to.be.deep.equal(['', '', '']);
        });

        it('works with dates', () => {
            expect(bridge.getInitialValue('i')).to.be.instanceof(Date);
        });

        it('works with numbers', () => {
            expect(bridge.getInitialValue('h')).to.be.equal(0);
        });

        it('works with numbers (max)', () => {
            expect(bridge.getInitialValue('g')).to.be.equal(42);
        });

        it('works with numbers (min)', () => {
            expect(bridge.getInitialValue('f')).to.be.equal(42);
        });

        it('works with objects', () => {
            expect(bridge.getInitialValue('a')).to.be.deep.equal({});
        });

        it('works with strings', () => {
            expect(bridge.getInitialValue('a.b.c')).to.be.equal('');
        });
    });

    context('#getProps', () => {
        it('works with allowedValues', () => {
            expect(bridge.getProps('o', {})).to.be.deep.equal({required: true, allowedValues: ['O']});
        });

        it('works with allowedValues from props', () => {
            expect(bridge.getProps('o', {allowedValues: ['O']})).to.be.deep.equal({required: true});
        });

        it('works with custom component', () => {
            expect(bridge.getProps('l', {})).to.be.deep.equal({required: true, component: 'div'});
            expect(bridge.getProps('m', {})).to.be.deep.equal({required: true, component: noop});
        });

        it('works with custom component (field)', () => {
            expect(bridge.getProps('n', {})).to.be.deep.equal({required: true, component: 'div'});
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
            expect(bridge.getProps('p', {})).to.be.deep.equal({required: true, transform: noop});
        });

        it('works with transform from props', () => {
            expect(bridge.getProps('p', {transform: () => {}})).to.be.deep.equal({required: true});
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
            expect(() => bridge.getValidator()('a')).to.throw(/ValidationError/);
        });
    });
});
