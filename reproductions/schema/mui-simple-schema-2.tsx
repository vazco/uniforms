import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
  date: { type: Date, defaultValue: new Date() },
  adult: Boolean,
  size: {
    type: String,
    defaultValue: 'm',
    allowedValues: ['xs', 's', 'm', 'l', 'xl'],
  },
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    uniforms: { checkboxes: true },
  },
  friends: { type: Array, minCount: 1 },
  'friends.$': Object,
  'friends.$.name': { type: String, min: 3 },
  'friends.$.age': { type: Number, min: 0, max: 150 },
});

export const bridge = new SimpleSchema2Bridge(schema);
