import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('SimpleSchemaBridge', () => {
  const noop = () => {};
  const schema = {
    getDefinition(name: string) {
      // Simulate SimpleSchema.
      name = name.replace(/\d+/g, '$');

      const field: Record<string, unknown> | undefined = {
        a: { type: Object, label: name },
        'a.b': { type: Object, label: name },
        'a.b.c': { type: String, label: name },
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
        m: { type: String, uniforms: noop },
        n: { type: String, uniforms: { component: 'div' } },
        o: { type: Array },
        'o.$': { type: String, allowedValues: ['O'] },
        p: { type: Array },
        'p.$': { type: String, uniforms: { transform: noop } },
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
        u: { type: Array, defaultValue: ['u'] },
        'u.$': { type: String },
        v: { type: Object, defaultValue: { a: 'a' } },
        'v.a': { type: String },
        w: { type: Array, defaultValue: [{ a: 'a' }] },
        'w.$': { type: Object },
        'w.$.a': { type: String },
      }[name];

      if (field) {
        return {
          label: name.split('.').join(' ').toUpperCase(),
          ...field,
        };
      }

      return undefined;
    },

    messageForError(type: string, name: string) {
      return `(${name})`;
    },

    objectKeys(name: 'a' | 'a.b') {
      return (
        {
          a: ['b'],
          'a.b': ['c'],
        }[name] || []
      );
    },

    validator() {
      return () => {
        throw 'ValidationError';
      };
    },
  };

  const bridge = new SimpleSchemaBridge(schema as any);

  describe('#getError', () => {
    it('works without error', () => {
      expect(bridge.getError('a', null)).toBe(null);
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
      ).toBe('(a)');
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
      ).toEqual(['(a)']);
      expect(
        bridge.getErrorMessages({
          details: [{ name: 'b', details: { value: 1 } }],
        }),
      ).toEqual(['(b)']);
    });
  });

  describe('#getField', () => {
    it('return correct definition', () => {
      expect(bridge.getField('a')).toEqual(schema.getDefinition('a'));
    });

    it('throws on not found field', () => {
      expect(() => bridge.getField('x')).toThrow(/Field not found in schema/);
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
      expect(bridge.getInitialValue('u')).toEqual(['u']);
    });

    it('works with arrays of objects (defaultValue)', () => {
      expect(bridge.getInitialValue('w')).toEqual([{ a: 'a' }]);
    });

    it('works with objects', () => {
      expect(bridge.getInitialValue('a')).toEqual({});
    });

    it('works with objects (defaultValue)', () => {
      expect(bridge.getInitialValue('v')).toEqual({ a: 'a' });
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
        component: noop,
      });
    });

    it('works with custom component (field)', () => {
      expect(bridge.getProps('n')).toEqual({
        label: 'N',
        required: true,
        component: 'div',
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
        transform: noop,
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
        label: 'AA',
        type: 'password',
        required: true,
      });
    });

    it('returns no field type', () => {
      expect(bridge.getProps('a')).not.toContain({ type: Object });
      expect(bridge.getProps('j')).not.toContain({ type: Array });
      expect(bridge.getProps('d')).not.toContain({ type: String });
      expect(bridge.getProps('f')).not.toContain({ type: Number });
      expect(bridge.getProps('i')).not.toContain({ type: Date });
    });
  });

  describe('#getSubfields', () => {
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
    });
  });

  describe('#getValidator', () => {
    it('calls correct validator', () => {
      const bridge = new SimpleSchemaBridge({
        ...schema,
        validator() {
          return (model: Record<string, any>) => {
            if (typeof model.x !== 'number') {
              throw new Error();
            }
          };
        },
      } as any);

      expect(bridge.getValidator()({})).not.toEqual(null);
      expect(bridge.getValidator({})({})).not.toEqual(null);
      expect(bridge.getValidator()({ x: 1 })).toEqual(null);
      expect(bridge.getValidator({})({ x: 1 })).toEqual(null);
    });
  });
});
