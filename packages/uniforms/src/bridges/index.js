import invariant from 'invariant';

import Bridge              from './Bridge';
import SimpleSchemaBridge  from './SimpleSchemaBridge';
import SimpleSchema2Bridge from './SimpleSchema2Bridge';

const bridges = [
    Bridge,
    SimpleSchemaBridge,
    SimpleSchema2Bridge
];

export default function createSchemaBridge (schema) {
    const Bridge = bridges.find(bridge => bridge.check(schema));

    invariant(Bridge, 'Unrecognised schema: %s', schema);

    return new Bridge(schema);
}
