import MessageBox       from 'message-box';
import SimpleSchema2    from 'simpl-schema';
import GraphQLBridge    from 'uniforms/GraphQLBridge';
import {buildASTSchema} from 'graphql';
import {parse}          from 'graphql';

import {Meteor}       from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import presets from './presets';
import themes  from './themes';

// Dynamic field error.
MessageBox.defaults({messages: {en: {syntax: ''}}});

// This is required for the eval.
if (Meteor.isClient) {
    window.GraphQLBridge  = GraphQLBridge;
    window.SimpleSchema   = SimpleSchema;
    window.SimpleSchema2  = SimpleSchema2;
    window.buildASTSchema = buildASTSchema;
    window.parse          = parse;
} else {
    global.GraphQLBridge  = GraphQLBridge;
    global.SimpleSchema   = SimpleSchema;
    global.SimpleSchema2  = SimpleSchema2;
    global.buildASTSchema = buildASTSchema;
    global.parse          = parse;
}

const schema = new SimpleSchema2({
    preset: {
        type: String,
        defaultValue:  Object.keys(presets)[0],
        allowedValues: Object.keys(presets)
    },

    props: {
        type: Object,
        blackbox: true,
        defaultValue: {
            autosave:        false,
            autosaveDelay:   100,
            disabled:        false,
            label:           true,
            placeholder:     false,
            schema:          presets[Object.keys(presets)[0]],
            showInlineError: false
        },
        uniforms: {
            schema: new SimpleSchema2({
                autosave:        {optional: true, type: Boolean},
                autosaveDelay:   {optional: true, type: SimpleSchema2.Integer},
                disabled:        {optional: true, type: Boolean},
                label:           {optional: true, type: Boolean},
                placeholder:     {optional: true, type: Boolean},
                showInlineError: {optional: true, type: Boolean},

                schema: {
                    optional: true,
                    type: String,
                    custom () {
                        try {
                            eval(`(${this.value})`);
                            return undefined;
                        } catch (error) {
                            MessageBox.defaults({messages: {en: {syntax: error.message}}});
                            return 'syntax';
                        }
                    }
                }
            })
        }
    },

    theme: {
        type: String,
        uniforms: {transform: theme => `Theme - ${theme}`},
        defaultValue:  Object.keys(themes)[2],
        allowedValues: Object.keys(themes)
    }
});

export default schema;
