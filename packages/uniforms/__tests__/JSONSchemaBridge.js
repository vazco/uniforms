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
            age: {type: 'integer'},
            billingAddress: {$ref: '#/definitions/address'},
            dateOfBirth: {
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
            expect(bridge.getField('dateOfBirth.1')).toEqual(expect.objectContaining({type: 'string'}));
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
});
