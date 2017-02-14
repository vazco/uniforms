import invariant from 'fbjs/lib/invariant';

import Bridge   from './Bridge';
import joinName from './joinName';

let graphql;
try {
    const r = require; // Silence Meteor missing module warning
    graphql = r('graphql');
} catch (_) { /* Ignore it. */ }

const extractFromNonNull = x => x && x.type instanceof graphql.GraphQLNonNull ? {...x, type: x.type.ofType} : x;

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
                invariant(definition.type instanceof graphql.GraphQLList, 'Field not found in schema: "%s"', name);
                definition = {type: extractFromNonNull(definition.type.ofType)};
            } else {
                definition = definition[next];
            }

            invariant(definition, 'Field not found in schema: "%s"', name);

            const isLast = array.length - 1 === index;

            if (isLast && !returnExtracted) {
                return definition;
            }

            const extracted = extractFromNonNull(definition);

            if (isLast && returnExtracted || !(extracted.type instanceof graphql.GraphQLObjectType)) {
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

        return this.extras[name] && this.extras[name].initialValue;
    }

    // eslint-disable-next-line complexity
    getProps (nameNormal, props = {}) {
        const nameGeneric = nameNormal.replace(/\.\d+/, '.$');

        const field = this.getField(nameGeneric, false);
        const fieldType = extractFromNonNull(field.type);

        const extra = {
            ...this.extras[nameGeneric],
            ...this.extras[nameNormal]
        };

        const ready = {
            label: '',
            required: field.type instanceof graphql.GraphQLNonNull,

            ...extra,
            ...props
        };

        if (props.label === true && extra.label) {
            ready.label = extra.label;
        } else if (props.label !== undefined && !props.label) {
            ready.label = '';
        }

        if (fieldType instanceof graphql.GraphQLScalarType && fieldType.name === 'Float') {
            ready.decimal = true;
        }

        if (ready.options) {
            if (!Array.isArray(ready.options)) {
                ready.transform = value => ready.options[value];
                ready.allowedValues = Object.keys(ready.options);
            } else {
                ready.transform = value => ready.options.find(option => option.value === value).label;
                ready.allowedValues = ready.options.map(option => option.value);
            }
        }

        return ready;
    }

    getSubfields (name) {
        if (!name) {
            return Object.keys(this.schema.getFields());
        }

        const fieldType = this.getField(name).type;

        if (fieldType instanceof graphql.GraphQLObjectType) {
            return Object.keys(fieldType.getFields());
        }

        return [];
    }

    getType (name) {
        const fieldType = this.getField(name).type;

        return (
            fieldType instanceof graphql.GraphQLList       ? Array  :
            fieldType instanceof graphql.GraphQLObjectType ? Object :
            fieldType instanceof graphql.GraphQLScalarType ?
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
