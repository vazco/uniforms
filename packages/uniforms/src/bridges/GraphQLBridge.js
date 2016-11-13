import invariant           from 'invariant';
import {GraphQLList}       from 'graphql';
import {GraphQLNonNull}    from 'graphql';
import {GraphQLObjectType} from 'graphql';
import {GraphQLScalarType} from 'graphql';

import Bridge   from './Bridge';
import joinName from '../helpers/joinName';

const extractFromNonNull = x => x && x.type instanceof GraphQLNonNull ? {...x, type: x.type.ofType} : x;

export default class GraphQLBridge extends Bridge {
    constructor (schema, validator, extras = {}) {
        super();

        this.extras    = extras;
        this.schema    = schema;
        this.validator = validator;
    }

    // This bridge has 3 arguments, so it cannot be constructed implicite in the
    // createSchemaBridge.
    static check (/* schema */) {
        return false;
    }

    getError (name, error) {
        return (
            error &&
            error.details &&
            error.details.find &&
            error.details.find(error => error.name === name)
        );
    }

    getErrorMessage (name, error) {
        const scopedError = this.getError(name, error);
        if (scopedError) {
            return scopedError.message;
        }

        return '';
    }

    getErrorMessages (error) {
        if (error) {
            if (Array.isArray(error.details)) {
                return error.details.map(error => error.message);
            }

            if (error.message) {
                return [error.message];
            }
        }

        if (error !== undefined) {
            return [error];
        }

        return [];
    }

    getField (name, returnExtracted = true) {
        return joinName(null, name).reduce((definition, next, index, array) => {
            if (next === '$') {
                invariant(definition.type instanceof GraphQLList, 'Field not found in schema: "%s"', name);
                definition = {type: extractFromNonNull(definition.type.ofType)};
            } else {
                definition = definition[next];
            }

            invariant(definition, 'Field not found in schema: "%s"', name);

            if (array.length - 1 === index && !returnExtracted) {
                return definition;
            }

            const extracted = extractFromNonNull(definition);

            if (array.length - 1 === index && returnExtracted || !(extracted.type instanceof GraphQLObjectType)) {
                return extracted;
            }

            invariant(extracted.type.getFields, 'Field not found in schema: "%s"', name);

            return extracted.type.getFields();
        }, this.schema.getFields());
    }

    getInitialValue (name, props = {}) {
        const type = this.getType(name);

        if (type === Array) {
            return [...Array(props.initialCount || 0)].map(() => undefined);
        }

        if (type === Object) {
            return {};
        }

        return undefined;
    }

    // eslint-disable-next-line complexity
    getProps (nameNormal, props = {}) {
        const nameGeneric = nameNormal.replace(/\.\d+/, '.$');

        const field = this.getField(nameGeneric, false);
        const fieldType = extractFromNonNull(field.type);

        let computed = {
            label: '',
            required: field.type instanceof GraphQLNonNull,

            ...this.extras[nameGeneric],
            ...this.extras[nameNormal],
            ...props
        };

        if (fieldType instanceof GraphQLScalarType && fieldType.name === 'Float') {
            computed.decimal = true;
        }

        if (computed.options) {
            if (!Array.isArray(computed.options)) {
                computed = {
                    ...computed,
                    transform: value => computed.options[value],
                    allowedValues: Object.keys(computed.options)
                };
            } else {
                computed = {
                    ...computed,
                    transform: value => computed.options.find(option => option.value === value).label,
                    allowedValues: computed.options.map(option => option.value)
                };
            }
        }

        return computed;
    }

    getSubfields (name) {
        if (!name) {
            return Object.keys(this.schema.getFields());
        }

        const fieldType = this.getField(name).type;

        if (fieldType instanceof GraphQLObjectType) {
            return Object.keys(fieldType.getFields());
        }

        return [];
    }

    getType (name) {
        const fieldType = this.getField(name).type;

        return (
            fieldType instanceof GraphQLList       ? Array  :
            fieldType instanceof GraphQLObjectType ? Object :
            fieldType instanceof GraphQLScalarType ?
                fieldType.name === 'Int'    ? Number :
                fieldType.name === 'Float'  ? Number :
                fieldType.name === 'String' ? String :
                fieldType :
            fieldType
        );
    }

    getValidator (/* options */) {
        return this.validator;
    }
}
