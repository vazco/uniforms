import SimpleSchema from 'simpl-schema';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2/SimpleSchema2Bridge';

const createSchema = schema => new SimpleSchema2Bridge(new SimpleSchema(schema));

export default createSchema;
