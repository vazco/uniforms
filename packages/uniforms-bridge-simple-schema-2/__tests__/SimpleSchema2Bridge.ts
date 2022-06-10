import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

describe('SimpleSchema2Bridge', () => {
  const noopComponent = () => null;
  const noopTransform = () => {};
  const schema = new SimpleSchema({
    a: { type: Object },
    'a.b': { type: Object },
    'a.b.c': { type: String },
    aa: { type: String, uniforms: { type: 'password' } },
    d: { type: String, defaultValue: 'D' },
    e: { type: String, allowedValues: ['E'] },
    f: { type: Number, min: 42 },
    g: { type: Number, max: 42 },
    h: { type: Number },
    i: { type: Date },
    j: { type: Array, minCount: 3 },
    'j.$': { type: String },
    k: { type: Array },
    'k.$': { type: String },
    l: { type: String, uniforms: 'div' },
    m: { type: String, uniforms: noopComponent },
    n: { type: String, uniforms: { component: 'div' } },
    o: { type: Array },
    'o.$': { type: String, allowedValues: ['O'] },
    p: { type: Array },
    'p.$': { type: String, uniforms: { transform: noopTransform } },
    r: { type: String, uniforms: { options: { a: 1, b: 2 } } },
    s: {
      type: String,
      uniforms: {
        options: [
          { label: 1, value: 'a' },
          { label: 2, value: 'b' },
        ],
      },
    },
    t: { type: String, uniforms: { options: () => ({ a: 1, b: 2 }) } },
    u: { type: SimpleSchema.Integer },
    w: { type: new SimpleSchema({ x: String }) },
    x: { type: String, autoValue: () => '$setOnInsert:hack!' },
    y: { type: Array, defaultValue: ['y'] },
    'y.$': String,
    z: { type: Object, defaultValue: { a: 'a' } },
    'z.a': String,
    zs: { type: Array, defaultValue: [{ a: 'a' }] },
    'zs.$': { type: Object },
    'zs.$.a': String,
  });

  const bridge = new SimpleSchema2Bridge(schema);

  describe('#getError', () => {
    it('works without error', () => {
      expect(bridge.getError('a', undefined)).toBe(null);
    });

    it('works with invalid error', () => {
      expect(bridge.getError('a', {})).toBe(null);
      expect(bridge.getError('a', { invalid: true })).toBe(null);
    });

    it('works with correct error', () => {
      expect(bridge.getError('a', { details: [{ name: 'a' }] })).toEqual({
        name: 'a',
      });
      expect(bridge.getError('a', { details: [{ name: 'b' }] })).toBe(null);
    });
  });

  describe('#getErrorMessage', () => {
    it('works without error', () => {
      expect(bridge.getErrorMessage('a', undefined)).toBe('');
    });

    it('works with invalid error', () => {
      expect(bridge.getErrorMessage('a', {})).toBe('');
      expect(bridge.getErrorMessage('a', { invalid: true })).toBe('');
    });

    it('works with correct error', () => {
      expect(
        bridge.getErrorMessage('a', {
          details: [{ name: 'a', details: { value: 1 } }],
        }),
      ).toBe('a is invalid');
      expect(
        bridge.getErrorMessage('a', {
          details: [{ name: 'b', details: { value: 1 } }],
        }),
      ).toBe('');
    });
  });

  describe('#getErrorMessages', () => {
    it('works without error', () => {
      expect(bridge.getErrorMessages(null)).toEqual([]);
      expect(bridge.getErrorMessages(undefined)).toEqual([]);
    });

    it('works with other errors', () => {
      expect(bridge.getErrorMessages('correct')).toEqual(['correct']);
      expect(bridge.getErrorMessages(999999999)).toEqual([999999999]);
    });

    it('works with Error', () => {
      expect(bridge.getErrorMessages(new Error('correct'))).toEqual([
        'correct',
      ]);
    });

    it('works with ValidationError', () => {
      expect(
        bridge.getErrorMessages({
          details: [{ name: 'a', details: { value: 1 } }],
        }),
      ).toEqual(['a is invalid']);
      expect(
        bridge.getErrorMessages({
          details: [{ name: 'b', details: { value: 1 } }],
        }),
      ).toEqual(['b is invalid']);
    });
  });

  describe('#getField', () => {
    it('return correct definition', () => {
      const definition = schema.getDefinition('a');
      const definitionComposed = { ...definition, ...definition.type[0] };

      expect(bridge.getField('a')).toEqual(definitionComposed);
    });

    it('return correct definition (`autoValue` hack)', () => {
      const definition = schema.getDefinition('x');
      const definitionComposed = {
        ...definition,
        ...definition.type[0],
        defaultValue: '$setOnInsert:hack!',
      };

      expect(bridge.getField('x')).toEqual(definitionComposed);
    });

    it('throws on not found field', () => {
      expect(() => bridge.getField('xxx')).toThrow(/Field not found in schema/);
    });
  });

  describe('#getInitialValue', () => {
    it('works with arrays', () => {
      expect(bridge.getInitialValue('k')).toEqual([]);
    });

    it('works with arrays (initialCount)', () => {
      expect(bridge.getInitialValue('k', { initialCount: 1 })).toEqual([
        undefined,
      ]);
    });

    it('works with arrays (minCount)', () => {
      expect(bridge.getInitialValue('j')).toEqual([
        undefined,
        undefined,
        undefined,
      ]);
    });

    it('works with arrays (defaultValue)', () => {
      expect(bridge.getInitialValue('y')).toEqual(['y']);
    });

    it('works with arrays of objects (defaultValue)', () => {
      expect(bridge.getInitialValue('zs')).toEqual([{ a: 'a' }]);
    });

    it('works with objects', () => {
      expect(bridge.getInitialValue('a')).toEqual({ b: {} });
    });

    it('works with objects (defaultValue)', () => {
      expect(bridge.getInitialValue('z')).toEqual({ a: 'a' });
    });
  });

  describe('#getProps', () => {
    it('works with allowedValues', () => {
      expect(bridge.getProps('o')).toEqual({
        label: 'O',
        required: true,
        allowedValues: ['O'],
      });
    });

    it('works with allowedValues from props', () => {
      expect(bridge.getProps('o', { allowedValues: ['O'] })).toEqual({
        label: 'O',
        required: true,
      });
    });

    it('works with custom component', () => {
      expect(bridge.getProps('l')).toEqual({
        label: 'L',
        required: true,
        component: 'div',
      });
      expect(bridge.getProps('m')).toEqual({
        label: 'M',
        required: true,
        component: noopComponent,
      });
    });

    it('works with custom component (field)', () => {
      expect(bridge.getProps('n')).toEqual({
        label: 'N',
        required: true,
        component: 'div',
      });
    });

    it('works with Number type', () => {
      expect(bridge.getProps('h')).toEqual({
        label: 'H',
        required: true,
        decimal: true,
      });
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
      expect(
        bridge.getProps('s', { options: { c: 1, d: 2 } }).transform('c'),
      ).toBe(1);
      expect(
        bridge.getProps('s', { options: { c: 1, d: 2 } }).transform('d'),
      ).toBe(2);
      expect(
        bridge.getProps('s', { options: { c: 1, d: 2 } }).allowedValues[0],
      ).toBe('c');
      expect(
        bridge.getProps('s', { options: { c: 1, d: 2 } }).allowedValues[1],
      ).toBe('d');
    });

    it('works with transform', () => {
      expect(bridge.getProps('p')).toEqual({
        label: 'P',
        required: true,
        transform: noopTransform,
      });
    });

    it('works with transform from props', () => {
      expect(bridge.getProps('p', { transform: () => {} })).toEqual({
        label: 'P',
        required: true,
      });
    });

    it('works with type', () => {
      expect(bridge.getProps('aa')).toEqual({
        label: 'Aa',
        type: 'password',
        required: true,
      });
    });

    it('returns no field type', () => {
      expect(bridge.getProps('a')).not.toHaveProperty('type');
      expect(bridge.getProps('j')).not.toHaveProperty('type');
      expect(bridge.getProps('d')).not.toHaveProperty('type');
      expect(bridge.getProps('f')).not.toHaveProperty('type');
      expect(bridge.getProps('i')).not.toHaveProperty('type');
    });
  });

  describe('#getSubfields', () => {
    it('works on top level', () => {
      expect(bridge.getSubfields()).toEqual([
        'a',
        'aa',
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
        'w',
        'x',
        'y',
        'z',
        'zs',
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
      const schema = new SimpleSchema({ x: { type: Number } });
      const bridge = new SimpleSchema2Bridge(schema);

      expect(bridge.getValidator()({})).not.toEqual(null);
      expect(bridge.getValidator({})({})).not.toEqual(null);
      expect(bridge.getValidator()({ x: 1 })).toEqual(null);
      expect(bridge.getValidator({})({ x: 1 })).toEqual(null);
    });
  });
});
