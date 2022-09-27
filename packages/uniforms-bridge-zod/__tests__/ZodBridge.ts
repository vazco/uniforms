import { ZodBridge } from 'uniforms-bridge-zod';
import { array, number, object, string } from 'zod';

describe('ZodBridge', () => {
  describe('#getField', () => {
    it('works with root schema', () => {
      const schema = object({});
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('')).toBe(schema);
    });

    it('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('b')).toBe(schema.shape.b);
    });

    it('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toEqual(schema.shape.a);
      expect(bridge.getField('a.$')).toEqual(schema.shape.a.element);
      expect(bridge.getField('a.$.$')).toEqual(schema.shape.a.element.element);
    });

    it('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getField('a')).toBe(schema.shape.a);
      expect(bridge.getField('a.b')).toBe(schema.shape.a.shape.b);
      expect(bridge.getField('a.b.c')).toBe(schema.shape.a.shape.b.shape.c);
    });
  });

  describe('#getSubfields', () => {
    it('works with empty objects', () => {
      const schema = object({});
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields()).toEqual([]);
    });

    it('works with non-empty objects', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields()).toEqual(['a', 'b']);
    });

    it('works with simple types', () => {
      const schema = object({ a: string(), b: number() });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual([]);
      expect(bridge.getSubfields('b')).toEqual([]);
    });

    it('works with arrays', () => {
      const schema = object({ a: array(array(string())) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual(['$']);
      expect(bridge.getSubfields('a.$')).toEqual(['$']);
      expect(bridge.getSubfields('a.$.$')).toEqual([]);
    });

    it('works with nested objects', () => {
      const schema = object({ a: object({ b: object({ c: string() }) }) });
      const bridge = new ZodBridge(schema);
      expect(bridge.getSubfields('a')).toEqual(['b']);
      expect(bridge.getSubfields('a.b')).toEqual(['c']);
      expect(bridge.getSubfields('a.b.c')).toEqual([]);
    });
  });
});
