import {GraphQLString}  from 'graphql';
import {buildASTSchema} from 'graphql';
import {parse}          from 'graphql';

import GraphQLBridge from 'uniforms/GraphQLBridge';

describe('GraphQLBridge', () => {
    const schemaI = `
        input Author {
            id:        String!
            decimal:   Float
            firstName: String = "John"
            lastName:  String = "Doe"
            tags:      [String]!
        }

        input Category {
            owners: [Author!]
        }

        input Post {
            id:       Int!
            author:   Author!
            title:    String
            votes:    Int
            category: [Category!]!
        }

        # This is required by buildASTSchema
        type Query { anything: ID }
    `;

    const schemaT = schemaI.replace(/input/g, 'type').replace(/\s*=.+/g, '');

    const schemaData = {
        author: {component: 'div'},
        id: {
            allowedValues: [1, 2, 3],
            label: 'Post ID'
        },
        title: {
            initialValue: 'Some Title',
            options: [
                {label: 1, value: 'a'},
                {label: 2, value: 'b'},
                {label: 3, value: 'Some Title'}
            ]
        },
        votes: {
            initialValue: 44,
            options: {
                a: 1,
                b: 2,
                c: 44
            }
        }
    };

    const schemaValidator = jest.fn();

    const bridge  = new GraphQLBridge(buildASTSchema(parse(schemaI)).getType('Post'), schemaValidator, schemaData);
    const bridgeT = new GraphQLBridge(buildASTSchema(parse(schemaT)).getType('Post'), schemaValidator, schemaData);

    describe('#check()', () => {
        it('always returns false', () => {
            expect(GraphQLBridge.check()).not.toBeTruthy();
            expect(GraphQLBridge.check(bridge)).not.toBeTruthy();
            expect(GraphQLBridge.check(schemaI)).not.toBeTruthy();
            expect(GraphQLBridge.check(schemaT)).not.toBeTruthy();
        });
    });

    describe('#getError', () => {
        it('works without error', () => {
            expect(bridge.getError('title')).not.toBeTruthy();
        });

        it('works with invalid error', () => {
            expect(bridge.getError('title', {})).not.toBeTruthy();
            expect(bridge.getError('title', {invalid: true})).not.toBeTruthy();
        });

        it('works with correct error', () => {
            expect(bridge.getError('title', {details: [{name: 'title'}]})).toEqual({name: 'title'});
            expect(bridge.getError('title', {details: [{name: 'field'}]})).not.toBeTruthy();
        });
    });

    describe('#getErrorMessage', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessage('title')).not.toBeTruthy();
        });

        it('works with invalid error', () => {
            expect(bridge.getErrorMessage('title', {})).not.toBeTruthy();
            expect(bridge.getErrorMessage('title', {invalid: true})).not.toBeTruthy();
        });

        it('works with correct error', () => {
            expect(bridge.getErrorMessage('title', {details: [{name: 'title', message: '!'}]})).toBe('!');
            expect(bridge.getErrorMessage('title', {details: [{name: 'field', message: '$'}]})).not.toBeTruthy();
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
            expect(bridge.getErrorMessages({details: [{name: 'title', message: '!'}]})).toEqual(['!']);
            expect(bridge.getErrorMessages({details: [{name: 'field', message: '$'}]})).toEqual(['$']);
        });
    });

    describe('#getField', () => {
        it('return correct definition (input)', () => {
            expect(bridge.getField('author.firstName')).toEqual({
                defaultValue: 'John',
                description: '',
                name: 'firstName',
                type: GraphQLString
            });
        });

        it('return correct definition (type)', () => {
            expect(bridgeT.getField('author.firstName')).toEqual({
                args: [],
                deprecationReason: undefined,
                description: '',
                isDeprecated: false,
                name: 'firstName',
                type: GraphQLString
            });
        });

        it('throws on not found field', () => {
            expect(() => bridge.getField('x')).toThrow(/Field not found in schema/);
            expect(() => bridge.getField('author.x')).toThrow(/Field not found in schema/);
        });
    });

    describe('#getInitialValue', () => {
        it('works with arrays', () => {
            expect(bridge.getInitialValue('author.tags')).toEqual([]);
            expect(bridge.getInitialValue('author.tags', {initialCount: 1})).toEqual([undefined]);
        });

        it('works with objects', () => {
            expect(bridge.getInitialValue('author')).toEqual({});
        });

        it('works with undefined primitives', () => {
            expect(bridge.getInitialValue('id')).toEqual(undefined);
        });

        it('works with defined primitives', () => {
            expect(bridge.getInitialValue('votes')).toEqual(44);
        });

        it('works with default values', () => {
            expect(bridge.getInitialValue('author.firstName')).toEqual('John');
        });
    });

    describe('#getProps', () => {
        it('works with allowedValues', () => {
            expect(bridge.getProps('id')).toEqual({
                label: 'Post ID',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with allowedValues from props', () => {
            expect(bridge.getProps('id', {allowedValues: [1]})).toEqual({
                label: 'Post ID',
                required: true,
                allowedValues: [1]
            });
        });

        it('works with custom component', () => {
            expect(bridge.getProps('author')).toEqual({
                label: '',
                required: true,
                component: 'div'
            });
        });

        it('works with label (custom)', () => {
            expect(bridge.getProps('id', {label: 'ID'})).toEqual({
                label: 'ID',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with label (true)', () => {
            expect(bridge.getProps('id', {label: true})).toEqual({
                label: 'Post ID',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with label (falsy)', () => {
            expect(bridge.getProps('id', {label: null})).toEqual({
                label: '',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with Number type', () => {
            expect(bridge.getProps('author.decimal')).toEqual({
                label: '',
                required: false,
                decimal: true
            });
        });

        it('works with options (array)', () => {
            expect(bridge.getProps('title').transform('a')).toEqual(1);
            expect(bridge.getProps('title').transform('b')).toEqual(2);
            expect(bridge.getProps('title').allowedValues[0]).toEqual('a');
            expect(bridge.getProps('title').allowedValues[1]).toEqual('b');
        });

        it('works with options (object)', () => {
            expect(bridge.getProps('votes').transform('a')).toEqual(1);
            expect(bridge.getProps('votes').transform('b')).toEqual(2);
            expect(bridge.getProps('votes').allowedValues[0]).toEqual('a');
            expect(bridge.getProps('votes').allowedValues[1]).toEqual('b');
        });

        it('works with options from props', () => {
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).transform('c')).toEqual(1);
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).transform('d')).toEqual(2);
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).allowedValues[0]).toEqual('c');
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).allowedValues[1]).toEqual('d');
        });

        it('works with other props', () => {
            expect(bridge.getProps('category', {x: 1, y: 1})).toEqual({
                label: '',
                required: true,
                x: 1,
                y: 1
            });
        });
    });

    describe('#getSubfields', () => {
        it('works on top level', () => {
            expect(bridge.getSubfields()).toEqual([
                'id',
                'author',
                'title',
                'votes',
                'category'
            ]);
        });

        it('works with nested types', () => {
            expect(bridge.getSubfields('author')).toEqual([
                'id',
                'decimal',
                'firstName',
                'lastName',
                'tags'
            ]);
        });

        it('works with primitives', () => {
            expect(bridge.getSubfields('id')).toEqual([]);
            expect(bridge.getSubfields('author.id')).toEqual([]);
        });
    });

    describe('#getType', () => {
        it('works with any type', () => {
            expect(bridge.getType('author')).toEqual(Object);
            expect(bridge.getType('author.decimal')).toEqual(Number);
            expect(bridge.getType('author.firstName')).toEqual(String);
            expect(bridge.getType('author.id')).toEqual(String);
            expect(bridge.getType('author.lastName')).toEqual(String);
            expect(bridge.getType('author.tags')).toEqual(Array);
            expect(bridge.getType('author.tags.$')).toEqual(String);
            expect(bridge.getType('category')).toEqual(Array);
            expect(bridge.getType('category.$')).toEqual(Object);
            expect(bridge.getType('category.$.owners')).toEqual(Array);
            expect(bridge.getType('category.$.owners.$')).toEqual(Object);
            expect(bridge.getType('category.$.owners.$.decimal')).toEqual(Number);
            expect(bridge.getType('category.$.owners.$.firstName')).toEqual(String);
            expect(bridge.getType('category.$.owners.$.id')).toEqual(String);
            expect(bridge.getType('category.$.owners.$.lastName')).toEqual(String);
            expect(bridge.getType('category.$.owners.$.tags')).toEqual(Array);
            expect(bridge.getType('category.$.owners.$.tags.$')).toEqual(String);
            expect(bridge.getType('id')).toEqual(Number);
            expect(bridge.getType('title')).toEqual(String);
            expect(bridge.getType('votes')).toEqual(Number);
        });
    });

    describe('#getValidator', () => {
        it('calls correct validator', () => {
            expect(bridge.getValidator()).toEqual(schemaValidator);
        });
    });
});
