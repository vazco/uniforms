import Ajv from 'ajv';
import GraphQLBridge from 'uniforms/GraphQLBridge';
import JSONSchemaBridge from 'uniforms/JSONSchemaBridge';
import MessageBox from 'message-box';
import SimpleSchema2 from 'simpl-schema';
import {buildASTSchema} from 'graphql';
import {parse} from 'graphql';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import presets from './presets';
import themes from './themes';

const scope = Meteor.isClient ? window : global;

// SimpleSchema is using it
if (Meteor.isClient) {
  scope.Buffer = () => {};
  scope.Buffer.isBuffer = () => false;
}

// This is required for the eval.
scope.Ajv = Ajv;
scope.GraphQLBridge = GraphQLBridge;
scope.JSONSchemaBridge = JSONSchemaBridge;
scope.SimpleSchema = SimpleSchema;
scope.SimpleSchema2 = SimpleSchema2;
scope.buildASTSchema = buildASTSchema;
scope.parse = parse;

// Dynamic field error.
MessageBox.defaults({messages: {en: {syntax: ''}}});

const schema = new SimpleSchema2({
  preset: {
    type: String,
    defaultValue: Object.keys(presets)[0],
    allowedValues: Object.keys(presets)
  },

  props: {
    type: Object,
    blackbox: true,
    defaultValue: {
      autosave: false,
      autosaveDelay: 100,
      disabled: false,
      label: true,
      placeholder: false,
      schema: presets[Object.keys(presets)[0]],
      showInlineError: false,
      asyncOnSubmit: false,
      asyncOnValidate: false
    },
    uniforms: {
      schema: new SimpleSchema2({
        autosave: {optional: true, type: Boolean},
        autosaveDelay: {optional: true, type: SimpleSchema2.Integer},
        disabled: {optional: true, type: Boolean},
        label: {optional: true, type: Boolean},
        placeholder: {optional: true, type: Boolean},
        showInlineError: {optional: true, type: Boolean},
        asyncOnSubmit: {optional: true, type: Boolean, label: 'Async onSubmit (1 sec)'},
        asyncOnValidate: {optional: true, type: Boolean, label: 'Async onValidate (1 sec)'},

        schema: {
          optional: true,
          type: String,
          custom() {
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
    uniforms: {transform: theme => `uniforms-${theme}`},
    defaultValue: Object.keys(themes)[0],
    allowedValues: Object.keys(themes)
  }
});

export default schema;
