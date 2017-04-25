import SimpleSchema from 'simpl-schema';

import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';

describe('SimpleSchema2Bridge', () => {
    const noop = () => {};
    const schema = new SimpleSchema({
        'a':     {type: Object},
        'a.b':   {type: Object},
        'a.b.c': {type: String},
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
        't':     {type: String, uniforms: {options: () => ({a: 1, b: 2})}},
        'u':     {type: SimpleSchema.Integer},
        'w':     {type: new SimpleSchema({x: String})}
    });

    const bridge = new SimpleSchema2Bridge(schema);

    describe('#check()', () => {
        it('works correctly with schema', () => {
            expect(SimpleSchema2Bridge.check(schema)).toBeTruthy();
        });

        it('works correctly without schema', () => {
            expect(SimpleSchema2Bridge.check()).not.toBeTruthy();
        });

        Object.keys(schema).forEach(method => {
            it(`works correctly without '${method}'`, () => {
                expect(SimpleSchema2Bridge.check({...schema, [method]: null})).not.toBeTruthy();
            });
        });
    });

    describe('#getError', () => {
        it('works without error', () => {
            expect(bridge.getError('a')).not.toBeTruthy();
        });

        it('works with invalid error', () => {
            expect(bridge.getError('a', {})).not.toBeTruthy();
            expect(bridge.getError('a', {invalid: true})).not.toBeTruthy();
        });

        it('works with correct error', () => {
            expect(bridge.getError('a', {details: [{name: 'a'}]})).toEqual({name: 'a'});
            expect(bridge.getError('a', {details: [{name: 'b'}]})).not.toBeTruthy();
        });
    });

    describe('#getErrorMessage', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessage('a')).not.toBeTruthy();
        });

        it('works with invalid error', () => {
            expect(bridge.getErrorMessage('a', {})).not.toBeTruthy();
            expect(bridge.getErrorMessage('a', {invalid: true})).not.toBeTruthy();
        });

        it('works with correct error', () => {
            expect(bridge.getErrorMessage('a', {details: [{name: 'a', details: {value: 1}}]})).toBeTruthy();
            expect(bridge.getErrorMessage('a', {details: [{name: 'b', details: {value: 1}}]})).not.toBeTruthy();
        });
    });

    describe('#getErrorMessages', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessages()).toEqual([]);
        });

        it('works with other errors', () => {
            expect(bridge.getErrorMessages('correct')).toEqual(['correct']);
            expect(bridge.getErrorMessages(999999999)).toEqual([999999999]);
        });

        it('works with Error', () => {
            expect(bridge.getErrorMessages(new Error('correct'))).toEqual(['correct']);
        });

        it('works with ValidationError', () => {
            expect(bridge.getErrorMessages({details: [{name: 'a', details: {value: 1}}]})).toHaveLength(1);
            expect(bridge.getErrorMessages({details: [{name: 'b', details: {value: 1}}]})).toHaveLength(1);
        });
    });

    describe('#getField', () => {
        it('return correct definition', () => {
            const definition = schema.getDefinition('a');
            const definitionComposed = {...definition, ...definition.type[0]};

            expect(bridge.getField('a')).toEqual(definitionComposed);
        });

        it('throws on not found field', () => {
            expect(() => bridge.getField('x')).toThrow(/Field not found in schema/);
        });
    });

    describe('#getInitialValue', () => {
        it('works with arrays', () => {
            expect(bridge.getInitialValue('k')).toEqual([]);
            expect(bridge.getInitialValue('k', {initialCount: 1})).toEqual([undefined]);
        });

        it('works with objects', () => {
            expect(bridge.getInitialValue('a')).toEqual({});
        });
    });

    describe('#getProps', () => {
        it('works with allowedValues', () => {
            expect(bridge.getProps('o')).toEqual({label: 'O', required: true, allowedValues: ['O']});
        });

        it('works with allowedValues from props', () => {
            expect(bridge.getProps('o', {allowedValues: ['O']})).toEqual({label: 'O', required: true});
        });

        it('works with custom component', () => {
            expect(bridge.getProps('l')).toEqual({label: 'L', required: true, component: 'div'});
            expect(bridge.getProps('m')).toEqual({label: 'M', required: true, component: noop});
        });

        it('works with custom component (field)', () => {
            expect(bridge.getProps('n')).toEqual({label: 'N', required: true, component: 'div'});
        });

        it('works with Number type', () => {
            expect(bridge.getProps('h')).toEqual({label: 'H', required: true, decimal: true});
        });

        it('works with options (array)', () => {
            expect(bridge.getProps('s').transform('a')).toBe(1);
            expect(bridge.getProps('s').transform('b')).toBe(2);
            expect(bridge.getProps('s').allowedValues[0]).toBe('a');
            expect(bridge.getProps('s').allowedValues[1]).toBe('b');
        });

        it('works with options (function)', () => {
            expect(bridge.getProps('t').transform('a')).toBe(1);
            expect(bridge.getProps('t').transform('b')).toBe(2);
            expect(bridge.getProps('t').allowedValues[0]).toBe('a');
            expect(bridge.getProps('t').allowedValues[1]).toBe('b');
        });

        it('works with options (object)', () => {
            expect(bridge.getProps('r').transform('a')).toBe(1);
            expect(bridge.getProps('r').transform('b')).toBe(2);
            expect(bridge.getProps('r').allowedValues[0]).toBe('a');
            expect(bridge.getProps('r').allowedValues[1]).toBe('b');
        });

        it('works with options from props', () => {
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).transform('c')).toBe(1);
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).transform('d')).toBe(2);
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).allowedValues[0]).toBe('c');
            expect(bridge.getProps('s', {options: {c: 1, d: 2}}).allowedValues[1]).toBe('d');
        });

        it('works with transform', () => {
            expect(bridge.getProps('p')).toEqual({label: 'P', required: true, transform: noop});
        });

        it('works with transform from props', () => {
            expect(bridge.getProps('p', {transform: () => {}})).toEqual({label: 'P', required: true});
        });
    });

    describe('#getSubfields', () => {
        it('works on top level', () => {
            expect(bridge.getSubfields()).toEqual([
                'a',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'r',
                's',
                't',
                'u',
                'w'
            ]);
        });

        it('works with nested schemas', () => {
            expect(bridge.getSubfields('w')).toEqual(['x']);
        });

        it('works with objects', () => {
            expect(bridge.getSubfields('a')).toEqual(['b']);
            expect(bridge.getSubfields('a.b')).toEqual(['c']);
        });

        it('works with primitives', () => {
            expect(bridge.getSubfields('d')).toEqual([]);
            expect(bridge.getSubfields('e')).toEqual([]);
        });
    });

    describe('#getType', () => {
        it('works with any type', () => {
            expect(bridge.getType('a')).toBe(Object);
            expect(bridge.getType('j')).toBe(Array);
            expect(bridge.getType('d')).toBe(String);
            expect(bridge.getType('f')).toBe(Number);
            expect(bridge.getType('i')).toBe(Date);
            expect(bridge.getType('u')).toBe(Number);
            expect(bridge.getType('w')).toBe(Object);
        });
    });

    describe('#getValidator', () => {
        it('calls correct validator', () => {
            expect(() => bridge.getValidator()({})).toThrow();
            expect(() => bridge.getValidator({})({})).toThrow();
        });
    });
});
