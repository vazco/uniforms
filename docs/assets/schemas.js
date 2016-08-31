import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const schema = strings => strings[0].replace(/([\r\n]+) {4}/g, '$1');
const schemas = {
    'Example - address': schema`{
        street: {
            type: String,
            max: 100
        },

        city: {
            type: String,
            max: 50
        },

        state: {
            type: String
        },

        zip: {
            type: String,
            regEx: /^[0-9]{5}$/
        }
    }`,

    'Example - addresses': schema`{
        addresses: {
            type: [Object],
            minCount: 1,
            maxCount: 4
        },

        'addresses.$.street': {
            type: String
        },

        'addresses.$.city': {
            type: String
        }
    }`,

    'Example - book': schema`{
        title: {
            type: String,
            label: 'Title',
            max: 200
        },

        author: {
            type: String,
            label: 'Author'
        },

        copies: {
            type: Number,
            label: 'Number of copies',
            min: 0
        },

        lastCheckedOut: {
            type: Date,
            label: 'Last date this book was checked out',
            optional: true
        },

        summary: {
            type: String,
            label: 'Brief summary',
            optional: true,
            max: 1000
        }
    }`,

    'Property - allowedValues': schema`{
        category: {
            type: String,
            allowedValues: [
                'news',
                'image',
                'video'
            ]
        }
    }`,

    'Property - decimal': schema`{
        price: {
            type: Number,
            decimal: true
        }
    }`,

    'Property - defaultValue': schema`{
        price: {
            type: Number,
            defaultValue: 10
        }
    }`,

    'Property - label': schema`{
        firstName: {
            type: String,
            label: 'First name label'
        }
    }`,

    'Property - maxCount': schema`{
        authors: {
            type: [String],
            maxCount: 3
        }
    }`,

    'Property - minCount': schema`{
        authors: {
            type: [String],
            minCount: 1
        }
    }`
};

export function getSchema (schema) {
    const string = schemas[schema] || schema || schemas[getSchemas()[0]];

    try {
        return {string, object: new SimpleSchema(eval(`(${string})`))};
    } catch (error) {
        return {string, error};
    }
}

export function getSchemas () {
    return Object.keys(schemas).sort();
}
