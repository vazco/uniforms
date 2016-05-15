import * as SimpleSchema from './SimpleSchema';

// bridge have to export two functions:
//     - testSchema (schema):
//         - truthy value when bridge can handle this schema
//
//     - makeBridge (schema):
//         - schema bridge - object with following properties:
//             - getDefaultValue (name):
//                 - field's default value
//
//             - getError (name, error):
//                 - field's scoped error
//
//             - getErrorMessages (error):
//                 - all error messages from error
//
//             - getField (name):
//                 - field's definition
//
//             - getProps (name):
//                 - field's props (passed to field component):
//                     - allowedValues
//                     - component
//                     - decimal
//                     - label
//                     - max
//                     - maxCount
//                     - min
//                     - minCount
//
//             - getSubfields (name):
//                 - field's subfields (or first level fields when no name given)
//
//             - getType (name):
//                 - field's type (ex. Number, String)
//
//             - getValidator (options):
//                 - function with one argument - model - which throws errors
//                   when model is invalid
const schemaBridges = [
    SimpleSchema
];

export default function createSchemaBridge (schema) {
    if (schema &&
        schema.getType &&
        schema.getError &&
        schema.getField &&
        schema.getProps &&
        schema.getSubfields &&
        schema.getValidator &&
        schema.getDefaultValue &&
        schema.getErrorMessages) {
        return schema;
    }

    let match = schemaBridges.filter(bridge => bridge.testSchema(schema));
    if (match.length) {
        return match[0].makeBridge(schema);
    }

    throw new Error(`Unrecognised schema: ${schema}`);
}
