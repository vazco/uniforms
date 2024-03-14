import SimpleSchema, { SimpleSchemaDefinition } from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

export default function createSchema(schema: SimpleSchemaDefinition = {}) {
  return new SimpleSchema2Bridge({ schema: new SimpleSchema(schema) });
}
