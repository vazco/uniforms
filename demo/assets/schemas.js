import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const schema = strings => strings[0].replace(/([\r\n]+) {4}/g, '$1');
const schemas = {
    'Example - address': schema`{
        colorArray: {
          type: [String],
          label: "Hex color value for chart text.",
          uniforms: {
            fieldComponent: 'color',
            colorRatios: [0.35, 0.7, -0.2, -0.4],
            info: "Hex color value"
          }
      },
        colorOne: {
          type: String,
          label: "Hex color value for chart text.",
          defaultValue: "#434d52",
          uniforms: {
            fieldComponent: 'color',
            colorRatios: [0.35, 0.7, -0.2, -0.4],
            info: "Hex color value"
          }
      },
        'array.$.test': {
            type: String
        },
        'array.$.one': {
            type: Number
        },
        street: {
            type: [String],
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
            defaultValue: '333'
        },
        "selectOptional": {
            type: String,
            allowedValues: ['qqq','www','rrr','eee'],
            optional: true
        },
        "multiselectAllowed": {
            type: [String],
            allowedValues: ['ggg','hhh','jjj','kkk'],
            minCount: 1,
            defaultValue: ['jjj'],
            custom: function(){
                return(this.value.length === 0 ? "minCount" : this.value[0] == null ? "minCount" : null)
            }
        },
        "multiselect": {
            type: [String],
            minCount: 1,
            defaultValue: ['bbb'],
            custom: function(){
                return(this.value.length === 0 ? "minCount" : this.value[0] == null ? "minCount" : null)
            },
            uniforms:{
                    options:
                        [
                            {value: 'aaa', label: 'a'},
                            {value: 'bbb', label: 'b'},
                            {value: 'ccc', label: 'c'},
                            {value: 'ddd', label: 'd'}
                        ]
                }
        },
        "nullMultiselect": {
            type: [String],
            allowedValues: ['ggg','hhh','jjj','kkk'],
            minCount: 1,
            defaultValue: [null],
            custom: function(){
                return(this.value.length === 0 ? "minCount" : this.value[0] == null ? "minCount" : null)
            }
        },
        "radio": {
            type: String,
            allowedValues: ['111','2222','333','444'],
            uniforms: {
                checkboxes: true
            },
            defaultValue: '111',
            custom: function(){
                return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null)
            }
        },
        "checkboxes": {
           type: [String],
           allowedValues: ['111','2222','333','444'],
           uniforms: {
               checkboxes: true,
               info: "select you fav"
           },
           defaultValue: ['333'],
           custom: function(){
               return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null)
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
    }`,
    'Test Hidden': schema`{
        company: {
  type: String,
  regEx: /^[A-Z]*$/,
  label: 'Name of the company',
  max: 30,
  min: 3,
  optional: true,
  uniforms: {fieldComponent: 'hidden'}
},
title: {
  type: String,
  label: 'Title of the dashboard',
},

date: {
  type: Date,
  label: 'Title of the dashboard'
},
live: {
type: Boolean,
label: 'Dashboard Live',
defaultValue: true
},
queryids: {
type: [String],
label: 'List aggregationquery ids to execute on load',
defaultValue: [],
uniforms: {fieldComponent: 'hidden'},
optional: true
},
'tilesdata':{
type: Object,
optional: true,
uniforms: {fieldComponent: 'hidden'}
},
'tilesdata.lg':{
type: [Object],
optional: true,
uniforms: {fieldComponent: 'hidden'}
},
'tilesdata.lg.$.w': {
type: Number,
optional: true,
label: 'Tile width',
uniforms: {fieldComponent: 'hidden'}
},

'tilesdata.lg.$.h': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile height'
},
'tilesdata.lg.$.x': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile x position'
},
'tilesdata.lg.$.y': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile y position'
},
'tilesdata.lg.$.i': {
type: String,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile id'
},
'tilesdata.lg.$.moved': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile moveable',
optional: true
},
'tilesdata.lg.$.static': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile static',
optional: true
},
'tilesdata.lg.$.minH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minH',
optional: true
},
'tilesdata.lg.$.maxH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxH',
optional: true
},
'tilesdata.lg.$.minW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minW',
optional: true
},
'tilesdata.lg.$.maxW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxW',
optional: true
},
'tilesdata.lg.$.isDraggable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isDraggable',
optional: true
},
'tilesdata.lg.$.isResizable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isResizable',
optional: true
},
'tilesdata.md':{
type: [Object],
optional: true,
uniforms: {fieldComponent: 'hidden'}
},
'tilesdata.md.$.w': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile width'
},
'tilesdata.md.$.h': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile height'
},
'tilesdata.md.$.x': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile x position'
},
'tilesdata.md.$.y': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile y position'
},
'tilesdata.md.$.i': {
type: String,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile id'
},
'tilesdata.md.$.moved': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile moveable',
optional: true
},
'tilesdata.md.$.static': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile static',
optional: true
},
'tilesdata.md.$.minH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minH',
optional: true
},
'tilesdata.md.$.maxH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxH',
optional: true
},
'tilesdata.md.$.minW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minW',
optional: true
},
'tilesdata.md.$.maxW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxW',
optional: true
},
'tilesdata.md.$.isDraggable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isDraggable',
optional: true
},
'tilesdata.md.$.isResizable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isResizable',
optional: true
},

'tilesdata.sm':{
type: [Object],
optional: true,
uniforms: {fieldComponent: 'hidden'}
},

'tilesdata.sm.$.w': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile width'
},
'tilesdata.sm.$.h': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile height'
},
'tilesdata.sm.$.x': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile x position'
},
'tilesdata.sm.$.y': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile y position'
},
'tilesdata.sm.$.i': {
type: String,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile id'
},
'tilesdata.sm.$.moved': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile moveable',
optional: true
},
'tilesdata.sm.$.static': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile static',
optional: true
},
'tilesdata.sm.$.minH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minH',
optional: true
},
'tilesdata.sm.$.maxH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxH',
optional: true
},
'tilesdata.sm.$.minW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minW',
optional: true
},
'tilesdata.sm.$.maxW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxW',
optional: true
},
'tilesdata.sm.$.isDraggable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isDraggable',
optional: true
},
'tilesdata.sm.$.isResizable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isResizable',
optional: true
},


'tilesdata.xs':{
type: [Object],
optional: true,
uniforms: {fieldComponent: 'hidden'}
},
'tilesdata.xs.$.w': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile width'
},
'tilesdata.xs.$.h': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile height'
},
'tilesdata.xs.$.x': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile x position'
},
'tilesdata.xs.$.y': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile y position'
},
'tilesdata.xs.$.i': {
type: String,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile id'
},
'tilesdata.xs.$.moved': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile moveable',
optional: true
},
'tilesdata.xs.$.static': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile static',
optional: true
},
'tilesdata.xs.$.minH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minH',
optional: true
},
'tilesdata.xs.$.maxH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxH',
optional: true
},
'tilesdata.xs.$.minW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minW',
optional: true
},
'tilesdata.xs.$.maxW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxW',
optional: true
},
'tilesdata.xs.$.isDraggable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isDraggable',
optional: true
},
'tilesdata.xs.$.isResizable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isResizable',
optional: true
},


'tilesdata.xxs':{
type: [Object],
optional: true,
uniforms: {fieldComponent: 'hidden'}
},
'tilesdata.xxs.$.w': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile width'
},
'tilesdata.xxs.$.h': {
type: Number,
optional: true,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile height'
},
'tilesdata.xxs.$.x': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
optional: true,
label: 'Tile x position'
},
'tilesdata.xxs.$.y': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile y position',
optional: true
},
'tilesdata.xxs.$.i': {
type: String,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile id',
optional: true
},
'tilesdata.xxs.$.moved': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile moveable',
optional: true
},
'tilesdata.xxs.$.static': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile static',
optional: true
},
'tilesdata.xxs.$.minH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minH',
optional: true
},
'tilesdata.xxs.$.maxH': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxH',
optional: true
},
'tilesdata.xxs.$.minW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile minW',
optional: true
},
'tilesdata.xxs.$.maxW': {
type: Number,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile maxW',
optional: true
},
'tilesdata.xxs.$.isDraggable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isDraggable',
optional: true
},
'tilesdata.xxs.$.isResizable': {
type: Boolean,
uniforms: {fieldComponent: 'hidden'},
label: 'Tile isResizable',
optional: true
},


_id: {
type: String,
uniforms: {fieldComponent: 'hidden'},
label: 'Document _id',
optional: true
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
