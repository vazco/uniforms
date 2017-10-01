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
            }
        },
        type: 'object',
        properties: {
            billingAddress: {$ref: '#/definitions/address'},
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
            expect(bridge.getField('shippingAddress.city')).toEqual(expect.objectContaining({type: 'string'}));
        });
    });
});
