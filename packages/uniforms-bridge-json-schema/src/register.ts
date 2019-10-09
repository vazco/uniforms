import createSchemaBridge from 'uniforms/createSchemaBridge';

import JSONSchemaBridge from './JSONSchemaBridge';

// Register bridge.
createSchemaBridge.register(JSONSchemaBridge);
