import invariant from 'invariant';

import Bridge             from './Bridge';
import SimpleSchemaBridge from './SimpleSchemaBridge';

const bridges = [
    Bridge,
    SimpleSchemaBridge
];

export default function createSchemaBridge (schema) {
    const Bridge = bridges.find(bridge => bridge.check(schema));

    invariant(Bridge, 'Unrecognised schema: %s', schema);

    return new Bridge(schema);
}
