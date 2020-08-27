import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
  betterNumber: {
    type: Number,
    min: 5,
    max: 50,
  },
});

export const bridge = new SimpleSchema2Bridge(schema);
