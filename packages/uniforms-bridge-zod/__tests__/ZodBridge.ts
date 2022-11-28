import { ZodBridge } from 'uniforms-bridge-zod';
import {
  any,
  array,
  bigint,
  boolean,
  date,
  discriminatedUnion,
  enum as enum_,
  function as function_,
  instanceof as instanceof_,
  intersection,
  lazy,
  literal,
  map,
  nan,
  nativeEnum,
  never,
  null as null_,
  number,
  object,
  optional,
  promise,
  record,
  set,
  string,
  tuple,
  undefined as undefined_,
  union,
  unknown,
} from 'zod';

describe('ZodBridge', () => {
  describe('#getError', () => {
    test('works without error', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getError('a', null)).toBe(null);
      expect(bridge.getError('a', undefined)).toBe(null);
    });

    test('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({});
      const issues = error?.issues;
      expect(bridge.getError('a', error)).toBe(issues?.[0]);
      expect(bridge.getError('b', error)).toBe(issues?.[1]);
    });

    test('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({ a: [['x', 'y', 0], [1]] });
      const issues = error?.issues;
      expect(bridge.getError('a', error)).toBe(null);
      expect(bridge.getError('a.0', error)).toBe(null);
      expect(bridge.getError('a.0.0', error)).toBe(null);
      expect(bridge.getError('a.0.1', error)).toBe(null);
      expect(bridge.getError('a.0.2', error)).toBe(issues?.[0]);
      expect(bridge.getError('a.1.0', error)).toBe(issues?.[1]);
    });

    test('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({ a: { b: { c: 1 } } });
      const issues = error?.issues;
      expect(bridge.getError('a', error)).toBe(null);
      expect(bridge.getError('a.b', error)).toBe(null);
      expect(bridge.getError('a.b.c', error)).toBe(issues?.[0]);
    });
  });

  describe('#getErrorMessage', () => {
    test('works without error', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getErrorMessage('a', null)).toBe('');
      expect(bridge.getErrorMessage('a', undefined)).toBe('');
    });

    test('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({});
      const issues = error?.issues;
      expect(bridge.getErrorMessage('a', error)).toBe(issues?.[0].message);
      expect(bridge.getErrorMessage('b', error)).toBe(issues?.[1].message);
    });

    test('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({ a: [['x', 'y', 0], [1]] });
      const issues = error?.issues;
      expect(bridge.getErrorMessage('a', error)).toBe('');
      expect(bridge.getErrorMessage('a.0', error)).toBe('');
      expect(bridge.getErrorMessage('a.0.0', error)).toBe('');
      expect(bridge.getErrorMessage('a.0.1', error)).toBe('');
      expect(bridge.getErrorMessage('a.0.2', error)).toBe(issues?.[0].message);
      expect(bridge.getErrorMessage('a.1.0', error)).toBe(issues?.[1].message);
    });

    test('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({ a: { b: { c: 1 } } });
      const issues = error?.issues;
      expect(bridge.getErrorMessage('a', error)).toBe('');
      expect(bridge.getErrorMessage('a.b', error)).toBe('');
      expect(bridge.getErrorMessage('a.b.c', error)).toBe(issues?.[0].message);
    });
  });

  describe('#getErrorMessages', () => {
    test('works without error', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getErrorMessages(null)).toEqual([]);
      expect(bridge.getErrorMessages(undefined)).toEqual([]);
    });

    test('works with generic error', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getErrorMessages(new Error('Error'))).toEqual(['Error']);
    });

    test('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({});
      const messages = error?.issues?.map(issue => issue.message);
      expect(bridge.getErrorMessages(error)).toEqual(messages);
    });

    test('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({ a: [['x', 'y', 0], [1]] });
      const messages = error?.issues?.map(issue => issue.message);
      expect(bridge.getErrorMessages(error)).toEqual(messages);
    });

    test('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      const error = bridge.getValidator()({ a: { b: { c: 1 } } });
      const messages = error?.issues?.map(issue => issue.message);
      expect(bridge.getErrorMessages(error)).toEqual(messages);
    });
  });

  describe('#getField', () => {
    test('works with root schema', () => {
      const schema = object({});
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('')).toBe(schema);
    });

    test('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('b')).toBe(schema.shape.b);
    });

    test('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('a.$')).toBe(schema.shape.a.element);
      expect(bridge.getField('a.$.$')).toBe(schema.shape.a.element.element);
    });

    test('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('a.b')).toBe(schema.shape.a.shape.b);
      expect(bridge.getField('a.b.c')).toBe(schema.shape.a.shape.b.shape.c);
    });

    test('works with default', () => {
      const schema = object({ a: object({ b: string() }).default({ b: 'x' }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('a.b')).toBe(
        schema.shape.a.removeDefault().shape.b,
      );
    });

    test('works with optional', () => {
      const schema = object({ a: optional(object({ b: string() })) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('a.b')).toBe(schema.shape.a.unwrap().shape.b);
    });
  });

  describe('#getInitialValue', () => {
    test('works with array', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual([]);
      expect(bridge.getInitialValue('a.0')).toEqual([]);
      expect(bridge.getInitialValue('a.0.0')).toEqual(undefined);
    });

    test('works with array (min length)', () => {
      const schema = object({ a: array(array(string()).min(1)).min(2) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual([[], []]);
      expect(bridge.getInitialValue('a.0')).toEqual([]);
      expect(bridge.getInitialValue('a.0.0')).toEqual(undefined);
    });

    test('works with boolean', () => {
      const schema = object({ a: boolean() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual(undefined);
    });

    test('works with date', () => {
      const schema = object({ a: date() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual(undefined);
    });

    test('works with enum (array)', () => {
      const schema = object({ a: enum_(['x', 'y', 'z']) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual('x');
    });

    test('works with enum (native, numbers)', () => {
      enum Test {
        x,
        y,
        z,
      }

      const schema = object({ a: nativeEnum(Test) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual(0);
    });

    test('works with enum (native, string)', () => {
      enum Test {
        x = 'x',
        y = 'y',
        z = 'z',
      }

      const schema = object({ a: nativeEnum(Test) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual('x');
    });

    test('works with number', () => {
      const schema = object({ a: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual(undefined);
    });

    test('works with object', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual({ b: {} });
      expect(bridge.getInitialValue('a.b')).toEqual({});
      expect(bridge.getInitialValue('a.b.c')).toEqual(undefined);
    });

    test('works with default', () => {
      const schema = object({ a: string().default('x') });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual('x');
    });

    test('works with optional', () => {
      const schema = object({ a: optional(string()) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual(undefined);
    });

    test('works with string', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getInitialValue('a')).toEqual(undefined);
    });
  });

  describe('#getProps', () => {
    test('works with array', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: true });
      expect(bridge.getProps('a.0')).toEqual({ label: '0', required: true });
      expect(bridge.getProps('a.0.0')).toEqual({ label: '0', required: true });
    });

    test('works with array (maxCount)', () => {
      const schema = object({ a: array(array(string())).max(1) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        label: 'A',
        required: true,
        maxCount: 1,
      });
    });

    test('works with array (minCount)', () => {
      const schema = object({ a: array(array(string())).min(1) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        label: 'A',
        required: true,
        minCount: 1,
      });
    });

    test('works with boolean', () => {
      const schema = object({ a: boolean() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: true });
    });

    test('works with date', () => {
      const schema = object({ a: date() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: true });
    });

    test('works with enum (array)', () => {
      const schema = object({ a: enum_(['x', 'y', 'z']) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        allowedValues: ['x', 'y', 'z'],
        label: 'A',
        required: true,
      });
    });

    test('works with enum (native, number)', () => {
      enum Test {
        x,
        y,
        z,
      }

      const schema = object({ a: nativeEnum(Test) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        allowedValues: [0, 1, 2],
        label: 'A',
        required: true,
      });
    });

    test('works with enum (native, string)', () => {
      enum Test {
        x = 'x',
        y = 'y',
        z = 'z',
      }

      const schema = object({ a: nativeEnum(Test) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        allowedValues: ['x', 'y', 'z'],
        label: 'A',
        required: true,
      });
    });

    test('works with number', () => {
      const schema = object({ a: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        label: 'A',
        required: true,
        decimal: true,
      });
    });

    test('works with number (int)', () => {
      const schema = object({ a: number().int() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: true });
    });

    test('works with number (max)', () => {
      const schema = object({ a: number().max(1) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        label: 'A',
        required: true,
        decimal: true,
        max: 1,
      });
    });

    test('works with number (min)', () => {
      const schema = object({ a: number().min(1) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        label: 'A',
        required: true,
        decimal: true,
        min: 1,
      });
    });

    test('works with number (multipleOf)', () => {
      const schema = object({ a: number().int().multipleOf(7) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({
        label: 'A',
        required: true,
        step: 7,
      });
    });

    test('works with object', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: true });
      expect(bridge.getProps('a.b')).toEqual({ label: 'B', required: true });
      expect(bridge.getProps('a.b.c')).toEqual({ label: 'C', required: true });
    });

    test('works with default', () => {
      const schema = object({ a: string().default('x') });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: false });
    });

    test('works with optional', () => {
      const schema = object({ a: optional(string()) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: false });
    });

    test('works with string', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getProps('a')).toEqual({ label: 'A', required: true });
    });
  });

  describe('#getSubfields', () => {
    test('works with empty objects', () => {
      const schema = object({});
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields()).toEqual([]);
    });

    test('works with non-empty objects', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields()).toEqual(['a', 'b']);
    });

    test('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual([]);
      expect(bridge.getSubfields('b')).toEqual([]);
    });

    test('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual(['$']);
      expect(bridge.getSubfields('a.$')).toEqual(['$']);
      expect(bridge.getSubfields('a.$.$')).toEqual([]);
    });

    test('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual(['b']);
      expect(bridge.getSubfields('a.b')).toEqual(['c']);
      expect(bridge.getSubfields('a.b.c')).toEqual([]);
    });

    test('works with optional', () => {
      const schema = object({ a: object({ b: string() }).default({ b: 'x' }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual(['b']);
      expect(bridge.getSubfields('a.b')).toEqual([]);
    });

    test('works with optional', () => {
      const schema = object({ a: optional(object({ b: string() })) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual(['b']);
      expect(bridge.getSubfields('a.b')).toEqual([]);
    });
  });

  describe('#getType', () => {
    test('works with array', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(Array);
    });

    test('works with boolean', () => {
      const schema = object({ a: boolean() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(Boolean);
    });

    test('works with date', () => {
      const schema = object({ a: date() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(Date);
    });

    test('works with enum (array)', () => {
      const schema = object({ a: enum_(['x', 'y', 'z']) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(String);
    });

    test('works with enum (native, number)', () => {
      enum Test {
        x,
        y,
        z,
      }

      const schema = object({ a: nativeEnum(Test) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(Number);
    });

    test('works with enum (native, string)', () => {
      enum Test {
        x = 'x',
        y = 'y',
        z = 'z',
      }

      const schema = object({ a: nativeEnum(Test) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(String);
    });

    test('works with number', () => {
      const schema = object({ a: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(Number);
    });

    test('works with object', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(Object);
    });

    test('works with default', () => {
      const schema = object({ a: string().default('x') });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(String);
    });

    test('works with optional', () => {
      const schema = object({ a: optional(string()) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(String);
    });

    test('works with string', () => {
      const schema = object({ a: string() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getType('a')).toBe(String);
    });

    it.each([
      ['any', any()],
      ['bigint', bigint()],
      [
        'discriminatedUnion',
        discriminatedUnion('type', [
          object({ type: literal('a') }),
          object({ type: literal('b') }),
        ]),
      ],
      ['function', function_()],
      ['intersection', intersection(number(), string())],
      ['instanceof', instanceof_(Date)],
      ['lazy', lazy(() => string())],
      ['literal', literal('a')],
      ['map', map(string(), string())],
      ['nan', nan()],
      ['never', never()],
      ['null', null_()],
      ['promise', promise(string())],
      ['record', record(string())],
      ['set', set(string())],
      ['tuple', tuple([])],
      ['undefined', undefined_()],
      ['union', union([number(), string()])],
      ['unknown', unknown()],
    ])('throws on %s', (type, fieldSchema) => {
      const schema = object({ a: fieldSchema });
      const bridge = new ZodBridge(schema);
      const error = 'Field "a" has an unknown type';
      expect(() => bridge.getType('a')).toThrowError(error);
    });
  });

  describe('#getValidator', () => {
    test('return a function', () => {
      const schema = object({});
      const bridge = new ZodBridge(schema);
      const validator = bridge.getValidator();
      expect(validator).toEqual(expect.any(Function));
      expect(validator({})).toEqual(null);
    });
  });
});
