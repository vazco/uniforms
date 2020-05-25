import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

describe('JSONSchemaBridge', () => {
  const schema = {
    $schema: 'http://json-schema.org/draft-06/schema#',
    definitions: {
      address: {
        type: 'object',
        properties: {
          city: { type: 'string', uniforms: { label: false, required: false } },
          state: {
            type: 'string',
            options: [
              { label: 'Alabama', value: 'AL' },
              { label: 'Alaska', value: 'AK' },
              { label: 'Arkansas', value: 'AR' },
            ],
          },
          street: { type: 'string' },
        },
        required: ['street', 'city', 'state'],
      },
      personalData: {
        type: 'object',
        properties: {
          firstName: { $ref: '#/definitions/firstName' },
          lastName: { $ref: '#/definitions/firstName' },
        },
        required: ['lastName'],
      },
      firstName: { type: 'string', default: 'John' },
      lastName: { type: 'string' },
      recursive: {
        type: 'object',
        properties: {
          field: { type: 'string' },
          recursive: { $ref: '#/definitions/recursive' },
        },
      },
    },
    type: 'object',
    properties: {
      age: { type: 'integer', uniforms: { component: 'span' }, default: 24 },
      billingAddress: { $ref: '#/definitions/address' },
      custom: { type: 'custom' },
      dateOfBirth: {
        type: 'string',
        format: 'date-time',
      },
      dateOfBirthTuple: {
        type: 'array',
        items: [{ type: 'integer' }, { type: 'string' }, { type: 'integer' }],
      },
      email: {
        type: 'object',
        properties: {
          work: { type: 'string' },
          other: { type: 'string' },
        },
        required: ['work'],
      },
      friends: {
        type: 'array',
        items: {
          $ref: '#/definitions/personalData',
        },
      },
      hasAJob: { type: 'boolean', title: 'Currently Employed' },
      invalid: { type: 'null' },
      personalData: { $ref: '#/definitions/personalData' },
      salary: {
        type: 'number',
        options: {
          low: 6000,
          medium: 12000,
          height: 18000,
        },
      },
      shippingAddress: {
        allOf: [
          { $ref: '#/definitions/address' },
          {
            properties: {
              type: { enum: ['residential', 'business'] },
            },
            required: ['type'],
          },
        ],
      },
      complexNames: {
        type: 'object',
        properties: {
          a: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                b: {
                  type: 'object',
                  properties: {
                    'c-d': {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          "f/'g": { type: 'string', pattern: '[0-9]{5}' },
                          'h/"i': { type: 'string', pattern: '[0-9]{5}' },
                          'j\'/"k': { type: 'string', pattern: '[0-9]{5}' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      password: { type: 'string', uniforms: { type: 'password' } },
      passwordNumeric: { type: 'number', uniforms: { type: 'password' } },
      recursive: { $ref: '#/definitions/recursive' },
    },
    required: ['dateOfBirth'],
  };

  const validator = jest.fn();
  const bridge = new JSONSchemaBridge(schema, validator);

  describe('#constructor()', () => {
    it('sets schema correctly when has top level type of object', () => {
      expect(bridge.schema).toEqual(schema);
    });

    it('sets schema correctly when has top level $ref', () => {
      const localSchema = {
        definitions: schema.definitions,
        $ref: '#/definitions/personalData',
      };
      const localBridge = new JSONSchemaBridge(localSchema, validator);
      expect(localBridge.schema).toEqual({
        ...localSchema,
        ...localSchema.definitions.personalData,
      });
    });

    it('falls back to input schema', () => {
      const localSchema = { definitions: schema.definitions };
      const localBridge = new JSONSchemaBridge(localSchema, validator);
      expect(localBridge.schema).toEqual(localSchema);
    });
  });

  describe('#check()', () => {
    it('always returns false', () => {
      expect(JSONSchemaBridge.check()).not.toBeTruthy();
      expect(JSONSchemaBridge.check(bridge)).not.toBeTruthy();
      expect(JSONSchemaBridge.check(schema)).not.toBeTruthy();
      expect(JSONSchemaBridge.check(validator)).not.toBeTruthy();
    });
  });

  describe('#getError', () => {
    it('works without error', () => {
      expect(bridge.getError('age')).not.toBeTruthy();
    });

    it('works with invalid error', () => {
      expect(bridge.getError('age', {})).not.toBeTruthy();
      expect(bridge.getError('age', { invalid: true })).not.toBeTruthy();
    });

    it('works with correct error (data path)', () => {
      const error = { details: [{ dataPath: '.x' }] };
      expect(bridge.getError('x', error)).toEqual(error.details[0]);
      expect(bridge.getError('y', error)).toEqual(undefined);
    });

    it('works with correct error (data path at root)', () => {
      const error = {
        details: [
          {
            dataPath: '',
            keyword: 'required',
            message: "should have required property 'x'",
            params: { missingProperty: 'x' },
            schemaPath: '#/required',
          },
        ],
      };

      expect(bridge.getError('x', error)).toEqual(error.details[0]);
      expect(bridge.getError('y', error)).toEqual(undefined);
    });

    it('works with correct error (data path of parent)', () => {
      const error = {
        details: [
          {
            dataPath: '.x',
            keyword: 'required',
            message: "should have required property 'y'",
            params: { missingProperty: 'y' },
            schemaPath: '#/properties/x/required',
          },
        ],
      };

      expect(bridge.getError('x.x', error)).toEqual(undefined);
      expect(bridge.getError('x.y', error)).toEqual(error.details[0]);
      expect(bridge.getError('y.x', error)).toEqual(undefined);
    });

    it('works with correct error (complex data paths)', () => {
      const pairs = [
        ["a.0.b.c-d.0.f/'g", ".complexNames.a[0].b['c-d'][0]['f/\\'g']"],
        ['a.0.b.c-d.0.h/"i', ".complexNames.a[0].b['c-d'][0]['h/\"i']"],
        ['a.0.b.c-d.0.j\'/"k~', ".complexNames.a[0].b['c-d'][0]['j\\'/\"k~']"],
      ];

      pairs.forEach(([name, dataPath]) => {
        const error = { details: { dataPath } };
        expect(bridge.getError(name, error)).toEqual(error.details[0]);
      });
    });

    it('works with correct error (complex data paths - JSON pointers)', () => {
      const pairs = [
        ["a.0.b.c-d.0.f/'g", "/complexNames/a/0/b/c-d/0/f~1'g"],
        ['a.0.b.c-d.0.h/"i', '/complexNames/a/0/b/c-d/0/h~1"i'],
        ['a.0.b.c-d.0.j\'/"k~', '/complexNames/a/0/b/c-d/0/j\'~1"k~0'],
      ];

      pairs.forEach(([name, dataPath]) => {
        const error = { details: { dataPath } };
        expect(bridge.getError(name, error)).toEqual(error.details[0]);
      });
    });
  });

  describe('#getErrorMessage', () => {
    it('works without error', () => {
      expect(bridge.getErrorMessage('age')).not.toBeTruthy();
    });

    it('works with invalid error', () => {
      expect(bridge.getErrorMessage('age', {})).not.toBeTruthy();
      expect(bridge.getErrorMessage('age', { invalid: true })).not.toBeTruthy();
    });

    it('works with correct error', () => {
      expect(
        bridge.getErrorMessage('age', {
          details: [{ dataPath: '.age', message: 'Zing!' }],
        }),
      ).toBe('Zing!');
      expect(
        bridge.getErrorMessage('age', {
          details: [{ dataPath: '.field', message: 'Ignore!' }],
        }),
      ).not.toBeTruthy();
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
      expect(bridge.getErrorMessages(new Error('correct'))).toEqual([
        'correct',
      ]);
    });

    it('works with ValidationError', () => {
      expect(
        bridge.getErrorMessages({
          details: [{ dataPath: '.age', message: 'Zing!' }],
        }),
      ).toEqual(['Zing!']);
      expect(
        bridge.getErrorMessages({
          details: [{ dataPath: '.field', message: 'Ignore!' }],
        }),
      ).toEqual(['Ignore!']);
    });
  });

  describe('#getField', () => {
    it('returns correct definition (flat)', () => {
      expect(bridge.getField('age')).toEqual({
        type: 'integer',
        default: 24,
        uniforms: { component: 'span' },
      });
    });

    it('returns correct definition (flat with $ref)', () => {
      expect(bridge.getField('billingAddress')).toEqual({
        properties: expect.objectContaining({
          city: { type: 'string', uniforms: { label: false, required: false } },
          state: {
            type: 'string',
            options: [
              { label: 'Alabama', value: 'AL' },
              { label: 'Alaska', value: 'AK' },
              { label: 'Arkansas', value: 'AR' },
            ],
          },
          street: { type: 'string' },
        }),
        required: ['street', 'city', 'state'],
        type: 'object',
      });
    });

    it('returns correct definition (nested)', () => {
      expect(bridge.getField('email.work')).toEqual({ type: 'string' });
    });

    it('returns correct definition (nested with $ref)', () => {
      expect(bridge.getField('personalData.firstName')).toEqual({
        default: 'John',
        type: 'string',
      });
    });

    it('returns correct definition (array tuple)', () => {
      expect(bridge.getField('dateOfBirthTuple.1')).toEqual({ type: 'string' });
    });

    it('returns correct definition (array flat $ref)', () => {
      expect(bridge.getField('friends.$')).toEqual(
        expect.objectContaining({ type: expect.any(String) }),
      );
    });

    it('returns correct definition (array flat $ref, nested property)', () => {
      expect(bridge.getField('friends.$.firstName')).toEqual({
        default: 'John',
        type: 'string',
      });
    });

    it('returns correct definition when schema has top level $ref', () => {
      const localBridge = new JSONSchemaBridge(
        { definitions: schema.definitions, $ref: '#/definitions/personalData' },
        validator,
      );

      expect(localBridge.getField('firstName')).toEqual({
        default: 'John',
        type: 'string',
      });
    });

    it('throws when resolving field schema is not possible', () => {
      const localBridge = new JSONSchemaBridge(
        { definitions: schema.definitions, $ref: '#/definitions/personalData' },
        validator,
      );

      expect(() => localBridge.getField('invalid')).toThrow(
        /Field not found in schema/,
      );
    });

    it('throws when resolving field schema is not possible (with allOf with $ref field)', () => {
      expect(() => bridge.getField('shippingAddress.street.invalid')).toThrow(
        /Field not found in schema/,
      );
    });

    it('throws when resolving field schema is not possible (with allOf with $ref field without properties prop)', () => {
      const localBridge = new JSONSchemaBridge(
        {
          definitions: schema.definitions,
          properties: {
            container: {
              allOf: [
                {
                  required: ['type'],
                },
              ],
            },
          },
        },
        validator,
      );

      expect(() => localBridge.getField('container.invalid')).toThrow(
        /Field not found in schema/,
      );
    });

    it('returns correct definition (allOf with $ref)', () => {
      expect(bridge.getField('shippingAddress.street')).toEqual({
        type: 'string',
      });
    });
  });

  describe('#getInitialValue', () => {
    it('works with arrays', () => {
      expect(bridge.getInitialValue('friends')).toEqual([]);
      expect(bridge.getInitialValue('friends', { initialCount: 1 })).toEqual([
        {},
      ]);
      expect(
        bridge.getInitialValue('friends.0.firstName', { initialCount: 1 }),
      ).toBe('John');
    });

    it('works with objects', () => {
      expect(bridge.getInitialValue('billingAddress')).toEqual({});
    });

    it('works with undefined primitives', () => {
      expect(bridge.getInitialValue('salary')).toBe(undefined);
    });

    it('works with defined primitives', () => {
      expect(bridge.getInitialValue('age')).toBe(24);
    });

    it('works with default values', () => {
      expect(bridge.getInitialValue('personalData.firstName')).toBe('John');
    });
  });

  describe('#getProps', () => {
    it('works with allowedValues', () => {
      expect(bridge.getProps('shippingAddress.type')).toEqual({
        allowedValues: ['residential', 'business'],
        label: 'Type',
        required: true,
      });
    });

    it('works with allowedValues from props', () => {
      expect(
        bridge.getProps('shippingAddress.type', { allowedValues: [1] }),
      ).toEqual({
        allowedValues: ['residential', 'business'],
        label: 'Type',
        required: true,
      });
    });

    it('works with custom component', () => {
      expect(bridge.getProps('age')).toEqual({
        component: 'span',
        label: 'Age',
        required: false,
      });
    });

    it('works with label (custom)', () => {
      expect(bridge.getProps('dateOfBirth', { label: 'Death' })).toEqual({
        label: 'Date of birth',
        required: true,
      });
    });

    it('works with label (true)', () => {
      expect(bridge.getProps('dateOfBirth', { label: true })).toEqual({
        label: 'Date of birth',
        required: true,
      });
    });

    it('works with property title as default label', () => {
      expect(bridge.getProps('hasAJob', { label: true })).toEqual({
        allowedValues: undefined,
        label: 'Currently Employed',
        options: undefined,
        placeholder: undefined,
        required: false,
      });
    });

    it('works with label (falsy)', () => {
      expect(bridge.getProps('billingAddress.city')).toEqual({
        label: '',
        required: false,
      });

      expect(bridge.getProps('dateOfBirth', { label: null })).toEqual({
        label: 'Date of birth',
        required: true,
      });
    });

    it('works with placeholder (custom)', () => {
      expect(bridge.getProps('email.work', { placeholder: 'Email' })).toEqual({
        label: 'Work',
        required: true,
      });
    });

    it('works with placeholder (true)', () => {
      expect(bridge.getProps('email.work', { placeholder: true })).toEqual({
        label: 'Work',
        required: true,
      });
    });

    it('works with placeholder (falsy)', () => {
      expect(bridge.getProps('email.work', { placeholder: null })).toEqual({
        label: 'Work',
        required: true,
      });
    });

    it('works with placeholder (label falsy)', () => {
      expect(
        bridge.getProps('email.work', { label: null, placeholder: true }),
      ).toEqual({
        label: 'Work',
        required: true,
      });

      expect(
        bridge.getProps('email.work', { label: false, placeholder: true }),
      ).toEqual({
        label: 'Work',
        required: true,
      });
    });

    it('works with Number type', () => {
      expect(bridge.getProps('salary')).toEqual({
        allowedValues: ['low', 'medium', 'height'],
        decimal: true,
        label: 'Salary',
        options: expect.anything(),
        required: false,
        transform: expect.anything(),
      });
    });

    it('works with options (array)', () => {
      expect(bridge.getProps('billingAddress.state').transform('AL')).toBe(
        'Alabama',
      );
      expect(bridge.getProps('billingAddress.state').transform('AK')).toBe(
        'Alaska',
      );
      expect(bridge.getProps('billingAddress.state').allowedValues[0]).toBe(
        'AL',
      );
      expect(bridge.getProps('billingAddress.state').allowedValues[1]).toBe(
        'AK',
      );
    });

    it('works with options (object)', () => {
      expect(bridge.getProps('salary').transform('low')).toBe(6000);
      expect(bridge.getProps('salary').transform('medium')).toBe(12000);
      expect(bridge.getProps('salary').allowedValues[0]).toBe('low');
      expect(bridge.getProps('salary').allowedValues[1]).toBe('medium');
    });

    it('works with options from props', () => {
      const props = { options: { minimal: 4000, avarage: 8000 } };
      expect(bridge.getProps('salary', props).transform('minimal')).toBe(4000);
      expect(bridge.getProps('salary', props).transform('avarage')).toBe(8000);
      expect(bridge.getProps('salary', props).allowedValues[0]).toBe('minimal');
      expect(bridge.getProps('salary', props).allowedValues[1]).toBe('avarage');
    });

    it('works with type', () => {
      expect(bridge.getProps('password')).toEqual({
        label: 'Password',
        required: false,
        type: 'password',
      });

      expect(bridge.getProps('passwordNumeric')).toEqual({
        label: 'Password numeric',
        required: false,
        decimal: true,
        type: 'password',
      });
    });

    it('works with other props', () => {
      expect(bridge.getProps('personalData.firstName', { x: 1, y: 1 })).toEqual(
        {
          label: 'First name',
          required: false,
        },
      );
    });
  });

  describe('#getSubfields', () => {
    it('works on top level', () => {
      expect(bridge.getSubfields()).toEqual([
        'age',
        'billingAddress',
        'custom',
        'dateOfBirth',
        'dateOfBirthTuple',
        'email',
        'friends',
        'hasAJob',
        'invalid',
        'personalData',
        'salary',
        'shippingAddress',
        'complexNames',
        'password',
        'passwordNumeric',
        'recursive',
      ]);
    });

    it('works with nested types', () => {
      expect(bridge.getSubfields('shippingAddress')).toEqual([
        'city',
        'state',
        'street',
        'type',
      ]);
    });

    it('works with recursive types', () => {
      expect(bridge.getSubfields('recursive')).toEqual(['field', 'recursive']);
      expect(bridge.getSubfields('recursive.recursive')).toEqual([
        'field',
        'recursive',
      ]);
    });

    it('works with primitives', () => {
      expect(bridge.getSubfields('personalData.firstName')).toEqual([]);
      expect(bridge.getSubfields('age')).toEqual([]);
    });

    it('works when schema has top level $ref', () => {
      const localBridge = new JSONSchemaBridge(
        { definitions: schema.definitions, $ref: '#/definitions/address' },
        validator,
      );

      expect(localBridge.getSubfields()).toEqual(['city', 'state', 'street']);
    });

    it('works on top level when schema does not have properties', () => {
      const localBridge = new JSONSchemaBridge(
        { definitions: schema.definitions, $ref: '#/definitions/lastName' },
        validator,
      );

      expect(localBridge.getSubfields()).toEqual([]);
    });
  });

  describe('#getType', () => {
    it('works with any type', () => {
      expect(bridge.getType('age')).toBe(Number);
      expect(bridge.getType('billingAddress')).toBe(Object);
      expect(bridge.getType('billingAddress.city')).toBe(String);
      expect(bridge.getType('billingAddress.state')).toBe(String);
      expect(bridge.getType('billingAddress.street')).toBe(String);
      expect(bridge.getType('custom')).toBe('custom');
      expect(bridge.getType('dateOfBirth')).toBe(Date);
      expect(bridge.getType('dateOfBirthTuple')).toBe(Array);
      expect(bridge.getType('email')).toBe(Object);
      expect(bridge.getType('email.work')).toBe(String);
      expect(bridge.getType('email.other')).toBe(String);
      expect(bridge.getType('friends')).toBe(Array);
      expect(bridge.getType('friends.$')).toBe(Object);
      expect(bridge.getType('friends.$.firstName')).toBe(String);
      expect(bridge.getType('friends.$.lastName')).toBe(String);
      expect(bridge.getType('hasAJob')).toBe(Boolean);
      expect(() => bridge.getType('invalid')).toThrow(
        /can not be represented as a type null/,
      );
      expect(bridge.getType('personalData')).toBe(Object);
      expect(bridge.getType('salary')).toBe(Number);
      expect(bridge.getType('shippingAddress')).toBe(Object);
    });
  });

  describe('#getValidator', () => {
    it('calls correct validator', () => {
      expect(bridge.getValidator()).toBe(validator);
    });
  });
});
