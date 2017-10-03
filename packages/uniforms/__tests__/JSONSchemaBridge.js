import JSONSchemaBridge from 'uniforms/JSONSchemaBridge';

describe('JSONSchemaBridge', () => {
    const schema = {
        $schema: 'http://json-schema.org/draft-06/schema#',
        definitions: {
            address: {
                type: 'object',
                properties: {
                    city:   {type: 'string'},
                    state:  {type: 'string'},
                    street: {type: 'string'}
                },
                required: ['street', 'city', 'state']
            },
            personalData: {
                type: 'object',
                properties: {
                    firstName: {$ref: '#/definitions/firstName'},
                    lastName:  {$ref: '#/definitions/firstName'}
                },
                required: ['lastName']
            },
            firstName: {type: 'string'},
            lastName: {type: 'string'}
        },
        type: 'object',
        properties: {
            age: {type: 'integer', uniforms: {component: 'span'}},
            billingAddress: {$ref: '#/definitions/address'},
            dateOfBirth: {
                type: 'string',
                format: 'date-time'
            },
            dateOfBirthTuple: {
                type: 'array',
                items: [{type: 'integer'}, {type: 'string'}, {type: 'integer'}]
            },
            email: {
                type: 'object',
                properties: {
                    work:   {type: 'string'},
                    other:  {type: 'string'}
                },
                required: ['work']
            },
            friends: {
                type: 'array',
                items: {
                    $ref: '#/definitions/personalData'
                }
            },
            personalData: {$ref: '#/definitions/personalData'},
            salary: {type: 'number'},
            shippingAddress: {
                allOf: [
                    {$ref: '#/definitions/address'},
                    {
                        properties: {
                            type: {enum: ['residential', 'business']}
                        },
                        required: ['type']
                    }
                ]
            }
        }
    };

    const bridge = new JSONSchemaBridge(schema);

    describe('#check()', () => {
        it('works correctly with schema', () => {
            expect(JSONSchemaBridge.check(schema)).toBeTruthy();
        });

        it('works correctly without schema', () => {
            expect(JSONSchemaBridge.check()).not.toBeTruthy();
        });
    });

    describe('#getField', () => {
        it('returns correct definition (flat)', () => {
            expect(bridge.getField('age')).toEqual(expect.objectContaining({type: 'integer'}));
        });

        it('returns correct definition (flat with $ref)', () => {
            expect(bridge.getField('billingAddress')).toEqual({
                properties: expect.objectContaining({
                    city: expect.any(Object),
                    state: expect.any(Object),
                    street: expect.any(Object)
                }),
                _isRequired: expect.any(Boolean),
                required: expect.arrayContaining(['street', 'city', 'state']),
                type: 'object'
            });
        });

        it('returns correct definition (nested)', () => {
            expect(bridge.getField('email.work')).toEqual(expect.objectContaining({type: 'string'}));
        });

        it('returns correct definition (nested with $ref)', () => {
            expect(bridge.getField('personalData.firstName')).toEqual(expect.objectContaining({type: 'string'}));
        });

        it('returns correct definition (array tuple)', () => {
            expect(bridge.getField('dateOfBirthTuple.1')).toEqual(expect.objectContaining({type: 'string'}));
        });

        it('returns correct definition (array flat $ref)', () => {
            expect(bridge.getField('friends.$')).toEqual(expect.objectContaining({
                type: expect.any(String)
            }));
        });

        it('returns correct definition (array flat $ref, nested property)', () => {
            expect(bridge.getField('friends.$.firstName')).toEqual(expect.objectContaining({type: 'string'}));
        });
    });

    describe('#getProps', () => {
        it('works with allowedValues', () => {
            expect(bridge.getProps('shippingAddress.type')).toEqual({
                label: 'Type',
                required: true,
                allowedValues: ['residential', 'business']
            });
        });

        it('works with allowedValues from props', () => {
            expect(bridge.getProps('shippingAddress.type', {allowedValues: [1]})).toEqual({
                label: 'Type',
                required: true,
                allowedValues: [1]
            });
        });

        it('works with custom component', () => {
            expect(bridge.getProps('age')).toEqual({
                label: 'Age',
                required: false,
                component: 'span'
            });
        });

        it('works with label (custom)', () => {
            expect(bridge.getProps('dateOfBirth', {label: 'Date of death'})).toEqual({
                label: 'Date of death',
                required: false
            });
        });

        it('works with label (true)', () => {
            expect(bridge.getProps('dateOfBirth', {label: true})).toEqual({
                label: 'Date of birth',
                required: false
            });
        });

        it('works with label (falsy)', () => {
            expect(bridge.getProps('dateOfBirth', {label: null})).toEqual({
                label: '',
                required: false
            });
        });

        it('works with Number type', () => {
            expect(bridge.getProps('salary')).toEqual({
                label: 'Salary',
                required: false,
                decimal: true
            });
        });
    });

    describe('#getSubfields', () => {
        it('works on top level', () => {
            expect(bridge.getSubfields()).toEqual([
                'age',
                'billingAddress',
                'dateOfBirth',
                'dateOfBirthTuple',
                'email',
                'friends',
                'personalData',
                'salary',
                'shippingAddress'
            ]);
        });

        it('works with nested types', () => {
            expect(bridge.getSubfields('shippingAddress')).toEqual(['city', 'state', 'street', 'type']);
        });

        it('works with primitives', () => {
            expect(bridge.getSubfields('personalData.firstName')).toEqual([]);
            expect(bridge.getSubfields('age')).toEqual([]);
        });
    });

    describe('#getType', () => {
        it('works with any type', () => {
            expect(bridge.getType('age')).toBe(Number);
            expect(bridge.getType('billingAddress')).toBe(Object);
            expect(bridge.getType('billingAddress.city')).toBe(String);
            expect(bridge.getType('billingAddress.state')).toBe(String);
            expect(bridge.getType('billingAddress.street')).toBe(String);
            expect(bridge.getType('dateOfBirth')).toBe(Date);
            expect(bridge.getType('dateOfBirthTuple')).toBe(Array);
            expect(bridge.getType('email')).toBe(Object);
            expect(bridge.getType('email.work')).toBe(String);
            expect(bridge.getType('email.other')).toBe(String);
            expect(bridge.getType('friends')).toBe(Array);
            expect(bridge.getType('friends.$')).toBe(Object);
            expect(bridge.getType('friends.$.firstName')).toBe(String);
            expect(bridge.getType('friends.$.lastName')).toBe(String);
            expect(bridge.getType('personalData')).toBe(Object);
            expect(bridge.getType('shippingAddress')).toBe(Object);
        });
    });

    describe('#getValidator', () => {
        it('calls correct validator', () => {
            expect(bridge.getValidator()).toBe(bridge.validator);
        });
    });
});
