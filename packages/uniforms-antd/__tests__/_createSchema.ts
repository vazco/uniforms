import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

export default function createSchema(schema?: {}) {
  return new SimpleSchema2Bridge(new SimpleSchema(schema));
}
