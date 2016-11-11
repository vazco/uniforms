import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const schema = strings => strings[0].replace(/([\r\n]+) {4}/g, '$1');
const schemas = {
    'Example - address': schema`{
        street: {
            type: String,
            max: 100,
            defaultValue: 'aaaa'
        },
        city: {
            type: String,
            max: 50,
            uniforms: {
                type: 'textarea',
                rows: 3
            }
        },
        zip: {
            type: String,
            regEx: /^[0-9]{5}$/,
            defaultValue: '11111'
        },
        number: {
            type: Number,
            label: "Number Test"
        },
        numberDec: {
            type: Number,
            label: "Number Test Deci",
            decimal: true,
            uniforms: {step: 0.1 }
        },
        boolfield: {
            type: Boolean,
            defaultValue: true
        },
        "select": {
            type: String,
            allowedValues: ['111','2222','333','444'],
        },
        "selectOptional": {
            type: String,
            allowedValues: ['qqq','www','rrr','eee'],
            optional: true
        },
        "multiselectAllowed": {
            type: [String],
            allowedValues: ['ggg','hhh','jjj','kkk'],
            uniforms: {
                        multiple: true
                    },
            minCount: 1,
            custom: function(){ return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null )}
        },
        "multiselect": {
            type: [String],
            minCount: 1,
            custom: function(){ return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null )},
            uniforms: {
                        multiple: true,
                        options: [{value: 'aaa', label: 'a'},{value: 'bbb', label: 'b'},{value: 'ccc', label: 'c'},{value: 'ddd', label: 'd'}]
                        }
        },
        "radio": {
            type: String,
            allowedValues: ['111','2222','333','444'],
            uniforms: {
                checkboxes: true
            }
        },
        "checkboxes": {
           type: [String],
           allowedValues: ['111','2222','333','444'],
           uniforms: {
               checkboxes: true,
               multiple: true
           }
       },
        datesamplefield: {
          type: Date,
          label: "This is a date component",
          defaultValue: new Date(2015,10,2,3,4,5),
          uniforms: {
            showTime: false,
            format: "DD-MM-YYYY",
            placeholder: "Select Date",
            disabled: false,
            allowClear: false
          }
        }
    }`,

    'Example - addresses': schema`{
        addresses: {
            type: Array,
            minCount: 1,
            maxCount: 4
        },

        'addresses.$': {
            type: Object
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
            type: Array,
            maxCount: 3
        },

        'authors.$': {
            type: String
        }
    }`,

    'Property - minCount': schema`{
        authors: {
            type: Array,
            minCount: 1
        },

        'authors.$': {
            type: String
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
