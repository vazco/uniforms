import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({
  betterNumber: {
    type: Number,
    min: 5,
    max: 50
  }
});

export default new SimpleSchema2Bridge(schema);
