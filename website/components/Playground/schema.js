import Ajv from 'ajv';
import MessageBox from 'message-box';
import SimpleSchema from 'simpl-schema';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { buildASTSchema, parse } from 'graphql';

import presets from './presets';
import { themes } from '../universal';

const scope = typeof window === 'undefined' ? global : window;

// FIXME: This file is loading a different version of simpl-schema than the one
//        that uniforms-bridge-simple-schema-2 package.
SimpleSchema.extendOptions(['uniforms']);

// This is required for the eval.
scope.Ajv = Ajv;
scope.GraphQLBridge = GraphQLBridge;
scope.JSONSchemaBridge = JSONSchemaBridge;
scope.SimpleSchema = SimpleSchema;
scope.SimpleSchema2Bridge = SimpleSchema2Bridge;
scope.buildASTSchema = buildASTSchema;
scope.parse = parse;

// Dynamic field error.
MessageBox.defaults({ messages: { en: { syntax: '' } } });

const schema = new SimpleSchema({
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
      schema: new SimpleSchema({
        autosave: { optional: true, type: Boolean },
        autosaveDelay: { optional: true, type: SimpleSchema.Integer },
        disabled: { optional: true, type: Boolean },
        label: { optional: true, type: Boolean },
        placeholder: { optional: true, type: Boolean },
        showInlineError: { optional: true, type: Boolean },
        asyncOnSubmit: {
          optional: true,
          type: Boolean,
          label: 'Async onSubmit (1 sec)'
        },
        asyncOnValidate: {
          optional: true,
          type: Boolean,
          label: 'Async onValidate (1 sec)'
        },

        schema: {
          optional: true,
          type: String,
          custom() {
            try {
              eval(`(${this.value})`);
              return undefined;
            } catch (error) {
              MessageBox.defaults({
                messages: { en: { syntax: error.message } }
              });
              return 'syntax';
            }
          }
        }
      })
    }
  },

  theme: {
    type: String,
    uniforms: { transform: theme => `uniforms-${theme}` },
    defaultValue: Object.keys(themes)[0],
    allowedValues: Object.keys(themes)
  }
});

export default schema;
