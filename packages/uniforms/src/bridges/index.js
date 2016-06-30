import Bridge             from './Bridge';
import AstronomyBridge    from './AstronomyBridge';
import SimpleSchemaBridge from './SimpleSchemaBridge';

const bridges = [
    Bridge,
    AstronomyBridge,
    SimpleSchemaBridge
];

export default function createSchemaBridge (schema) {
    let Bridge = bridges.find(bridge => bridge.check(schema));
    if (Bridge) {
        return new Bridge(schema);
    }

    throw new Error(`Unrecognised schema: ${schema}`);
}
