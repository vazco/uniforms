import createSchemaBridge from 'uniforms/createSchemaBridge';

import GraphQLBridge from './GraphQLBridge';

// Register bridge.
createSchemaBridge.register(GraphQLBridge);
