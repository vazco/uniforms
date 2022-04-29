import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
  text: { type: String },
  num: { type: Number },
  bool: { type: Boolean },
  nested: { type: Object },
  'nested.text': { type: String },
  date: { type: Date },
  list: { type: Array },
  'list.$': {
    type: String,
    uniforms: { label: 'List Text', placeholder: 'List Text Placeholder' },
  },
  select: {
    type: String,
    uniforms: {
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ],
    },
  },
  radio: {
    type: String,
    uniforms: {
      checkboxes: true,
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ],
    },
  },
});

export const bridge = new SimpleSchema2Bridge(schema);
