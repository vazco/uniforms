import SimpleSchema from 'simpl-schema';

import createSchemaBridge from 'uniforms/createSchemaBridge';

const createSchema = schema => createSchemaBridge(new SimpleSchema(schema));

export default createSchema;
