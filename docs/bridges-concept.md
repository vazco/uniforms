---
id: bridges-concept
title: Concept
---

To make use of any schema, uniforms have to create a _bridge_ of it - a unified schema mapper. A bridge is (preferably) a subclass of `Bridge`, implementing static `check(schema)` method and these instance methods:

- `getError(name, error)`
- `getErrorMessage(name, error)`
- `getErrorMessages(error)`
- `getField(name)`
- `getInitialValue(name, props)`
- `getProps(name, props)`
- `getSubfields(name)`
- `getType(name)`
- `getValidator(options)`

Currently available bridges:

- `GraphQLBridge` in `uniforms-bridge-graphql`
- `JSONSchemaBridge` in `uniforms-bridge-json-schema`
- `SimpleSchema2Bridge` in `uniforms-bridge-simple-schema-2`
- `SimpleSchemaBridge` in `uniforms-bridge-simple-schema`
