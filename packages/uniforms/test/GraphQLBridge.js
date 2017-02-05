import {GraphQLString}  from 'graphql';
import {buildASTSchema} from 'graphql';
import {describe}       from 'mocha';
import {expect}         from 'chai';
import {it}             from 'mocha';
import {parse}          from 'graphql';
import {stub}           from 'sinon';

import GraphQLBridge from 'uniforms/GraphQLBridge';

describe('GraphQLBridge', () => {
    const schema = `
        type Author {
            id:        String!
            decimal:   Float
            firstName: String
            lastName:  String
            tags:      [String]!
        }

        type Category {
            owners: [Author!]
        }

        type Post {
            id:       Int!
            author:   Author!
            title:    String
            votes:    Int
            category: [Category!]!
        }

        # This is required by buildASTSchema
        type Query { anything: ID }
    `;

    const schemaData = {
        author: {
            initialValue: 'Jobs',
            component: 'div'
        },
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
            initialValue: '44',
            options: {
                a: 1,
                b: 2,
                c: 44
            }
        }
    };
    const schemaType = buildASTSchema(parse(schema)).getType('Post');
    const schemaValidator = stub();

    const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaData);

    describe('#check()', () => {
        it('always returns false', () => {
            expect(GraphQLBridge.check()).to.be.not.ok;
            expect(GraphQLBridge.check(bridge)).to.be.not.ok;
            expect(GraphQLBridge.check(schema)).to.be.not.ok;
        });
    });

    describe('#getError', () => {
        it('works without error', () => {
            expect(bridge.getError('title')).to.be.not.ok;
        });

        it('works with invalid error', () => {
            expect(bridge.getError('title', {})).to.be.not.ok;
            expect(bridge.getError('title', {invalid: true})).to.be.not.ok;
        });

        it('works with correct error', () => {
            expect(bridge.getError('title', {details: [{name: 'title'}]})).to.be.deep.equal({name: 'title'});
            expect(bridge.getError('title', {details: [{name: 'field'}]})).to.be.not.ok;
        });
    });

    describe('#getErrorMessage', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessage('title')).to.be.not.ok;
        });

        it('works with invalid error', () => {
            expect(bridge.getErrorMessage('title', {})).to.be.not.ok;
            expect(bridge.getErrorMessage('title', {invalid: true})).to.be.not.ok;
        });

        it('works with correct error', () => {
            expect(bridge.getErrorMessage('title', {details: [{name: 'title', message: '!'}]})).to.be.equal('!');
            expect(bridge.getErrorMessage('title', {details: [{name: 'field', message: '$'}]})).to.be.not.ok;
        });
    });

    describe('#getErrorMessages', () => {
        it('works without error', () => {
            expect(bridge.getErrorMessages()).to.be.deep.equal([]);
        });

        it('works with other errors', () => {
            expect(bridge.getErrorMessages('correct')).to.be.deep.equal(['correct']);
            expect(bridge.getErrorMessages(999999999)).to.be.deep.equal([999999999]);
        });

        it('works with Error', () => {
            expect(bridge.getErrorMessages(new Error('correct'))).to.be.deep.equal(['correct']);
        });

        it('works with ValidationError', () => {
            expect(bridge.getErrorMessages({details: [{name: 'title', message: '!'}]})).to.deep.equal(['!']);
            expect(bridge.getErrorMessages({details: [{name: 'field', message: '$'}]})).to.deep.equal(['$']);
        });
    });

    describe('#getField', () => {
        it('return correct definition', () => {
            expect(bridge.getField('title')).to.be.deep.equal({
                args: [],
                deprecationReason: undefined,
                description: '',
                isDeprecated: false,
                name: 'title',
                type: GraphQLString
            });
        });

        it('throws on not found field', () => {
            expect(() => bridge.getField('x')).to.throw(/Field not found in schema/);
            expect(() => bridge.getField('author.x')).to.throw(/Field not found in schema/);
        });
    });

    describe('#getInitialValue', () => {
        it('works with arrays', () => {
            expect(bridge.getInitialValue('author.tags')).to.be.deep.equal([]);
            expect(bridge.getInitialValue('author.tags', {initialCount: 1})).to.be.deep.equal([undefined]);
        });

        it('works with objects', () => {
            expect(bridge.getInitialValue('author')).to.be.deep.equal({});
        });

        it('works with undefined primitives', () => {
            expect(bridge.getInitialValue('id')).to.be.equal(undefined);
        });

        it('works with defined primitives', () => {
            expect(bridge.getInitialValue('votes')).to.be.equal('44');
        });
    });

    describe('#getProps', () => {
        it('works with allowedValues', () => {
            expect(bridge.getProps('id')).to.be.deep.equal({
                label: 'Post ID',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with allowedValues from props', () => {
            expect(bridge.getProps('id', {allowedValues: [1]})).to.be.deep.equal({
                label: 'Post ID',
                required: true,
                allowedValues: [1]
            });
        });

        it('works with custom component', () => {
            expect(bridge.getProps('author')).to.be.deep.equal({
                label: '',
                required: true,
                initialValue: 'Jobs',
                component: 'div'
            });
        });

        it('works with label (custom)', () => {
            expect(bridge.getProps('id', {label: 'ID'})).to.be.deep.equal({
                label: 'ID',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with label (true)', () => {
            expect(bridge.getProps('id', {label: true})).to.be.deep.equal({
                label: 'Post ID',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with label (falsy)', () => {
            expect(bridge.getProps('id', {label: null})).to.be.deep.equal({
                label: '',
                required: true,
                allowedValues: [1, 2, 3]
            });
        });

        it('works with Number type', () => {
            expect(bridge.getProps('author.decimal')).to.be.deep.equal({
                label: '',
                required: false,
                decimal: true
            });
        });

        it('works with options (array)', () => {
            expect(bridge.getProps('title').transform('a')).to.be.equal(1);
            expect(bridge.getProps('title').transform('b')).to.be.equal(2);
            expect(bridge.getProps('title').allowedValues[0]).to.be.equal('a');
            expect(bridge.getProps('title').allowedValues[1]).to.be.equal('b');
        });

        it('works with options (object)', () => {
            expect(bridge.getProps('votes').transform('a')).to.be.equal(1);
            expect(bridge.getProps('votes').transform('b')).to.be.equal(2);
            expect(bridge.getProps('votes').allowedValues[0]).to.be.equal('a');
            expect(bridge.getProps('votes').allowedValues[1]).to.be.equal('b');
        });

        it('works with options from props', () => {
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).transform('c')).to.be.equal(1);
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).transform('d')).to.be.equal(2);
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).allowedValues[0]).to.be.equal('c');
            expect(bridge.getProps('votes', {options: {c: 1, d: 2}}).allowedValues[1]).to.be.equal('d');
        });

        it('works with other props', () => {
            expect(bridge.getProps('category', {x: 1, y: 1})).to.be.deep.equal({
                label: '',
                required: true,
                x: 1,
                y: 1
            });
        });
    });

    describe('#getSubfields', () => {
        it('works on top level', () => {
            expect(bridge.getSubfields()).to.be.deep.equal([
                'id',
                'author',
                'title',
                'votes',
                'category'
            ]);
        });

        it('works with nested types', () => {
            expect(bridge.getSubfields('author')).to.be.deep.equal([
                'id',
                'decimal',
                'firstName',
                'lastName',
                'tags'
            ]);
        });

        it('works with primitives', () => {
            expect(bridge.getSubfields('id')).to.be.deep.equal([]);
            expect(bridge.getSubfields('author.id')).to.be.deep.equal([]);
        });
    });

    describe('#getType', () => {
        it('works with any type', () => {
            expect(bridge.getType('author')).to.be.equal(Object);
            expect(bridge.getType('author.decimal')).to.be.equal(Number);
            expect(bridge.getType('author.firstName')).to.be.equal(String);
            expect(bridge.getType('author.id')).to.be.equal(String);
            expect(bridge.getType('author.lastName')).to.be.equal(String);
            expect(bridge.getType('author.tags')).to.be.equal(Array);
            expect(bridge.getType('author.tags.$')).to.be.equal(String);
            expect(bridge.getType('category')).to.be.equal(Array);
            expect(bridge.getType('category.$')).to.be.equal(Object);
            expect(bridge.getType('category.$.owners')).to.be.equal(Array);
            expect(bridge.getType('category.$.owners.$')).to.be.equal(Object);
            expect(bridge.getType('category.$.owners.$.decimal')).to.be.equal(Number);
            expect(bridge.getType('category.$.owners.$.firstName')).to.be.equal(String);
            expect(bridge.getType('category.$.owners.$.id')).to.be.equal(String);
            expect(bridge.getType('category.$.owners.$.lastName')).to.be.equal(String);
            expect(bridge.getType('category.$.owners.$.tags')).to.be.equal(Array);
            expect(bridge.getType('category.$.owners.$.tags.$')).to.be.equal(String);
            expect(bridge.getType('id')).to.be.equal(Number);
            expect(bridge.getType('title')).to.be.equal(String);
            expect(bridge.getType('votes')).to.be.equal(Number);
        });
    });

    describe('#getValidator', () => {
        it('calls correct validator', () => {
            expect(bridge.getValidator()).to.equal(schemaValidator);
        });
    });
});
