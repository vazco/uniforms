import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

const createSchema = (schema: any = {}) =>
  new SimpleSchema2Bridge(new SimpleSchema(schema));

export default createSchema;
