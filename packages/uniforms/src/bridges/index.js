import Bridge             from './Bridge';
import SimpleSchemaBridge from './SimpleSchemaBridge';

const bridges = [
    Bridge,
    SimpleSchemaBridge
];

export default function createSchemaBridge (schema) {
    let Bridge = bridges.find(bridge => bridge.check(schema));
    if (Bridge) {
        return new Bridge(schema);
    }

    throw new Error(`Unrecognised schema: ${schema}`);
}
