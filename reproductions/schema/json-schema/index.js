import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

import { createValidator } from './validator';
import schema from './schema';

const schemaValidator = createValidator(schema);

export default new JSONSchemaBridge(schema, schemaValidator);
