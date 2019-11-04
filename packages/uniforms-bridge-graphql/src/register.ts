import { createSchemaBridge } from 'uniforms';

import GraphQLBridge from './GraphQLBridge';

// Register bridge.
createSchemaBridge.register(GraphQLBridge);
