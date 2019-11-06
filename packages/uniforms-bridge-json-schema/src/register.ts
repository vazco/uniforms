import { createSchemaBridge } from 'uniforms';

import JSONSchemaBridge from './JSONSchemaBridge';

// Register bridge.
createSchemaBridge.register(JSONSchemaBridge);
