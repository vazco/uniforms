---
id: api-bridges
title: Bridges
---

## `Bridge`

```js
import Bridge from 'uniforms/Bridge';

// This is a kind of abstract class. It should be extended to create custom
// bridges. It implements all of the required methods and throws an error with
// meaningful "method not implemented" error.
class CustomBridge extends Bridge {
  // Check, if this bridge is compatibile with given schema.
  static check(schema) {
    /* ... */
  }

  // Field's scoped error.
  getError(name, error) {
    /* ... */
  }

  // Field's scoped error message.
  getErrorMessage(name, error) {
    /* ... */
  }

  // All error messages from error.
  getErrorMessages(error) {
    /* ... */
  }

  // Field's definition (`field` prop).
  getField(name) {
    /* ... */
  }

  // Field's initial value.
  getInitialValue(name) {
    /* ... */
  }

  // Field's props.
  getProps(name) {
    /* ... */
  }

  // Field's subfields (or first-level fields).
  getSubfields(name) {
    /* ... */
  }

  // Field's type (ex. Number, String).
  getType(name) {
    /* ... */
  }

  // Function with one argument - model - which throws errors when model is
  // invalid.
  getValidator(options) {
    /* ... */
  }
}
```

## `GraphQLBridge`

```js
import {GraphQLBridge} from 'uniforms-bridge-graphql';
import {buildASTSchema} from 'graphql';
import {parse} from 'graphql';

const schema = `
  type Author {
    id: API-Bridges-       String!
    firstName: String
    lastName:  String
  }

  type Post {
    id: API-Bridges-    Int!
    author: Author!
    title:  String
    votes:  Int
  }

  # This is required by buildASTSchema
  type Query { anything: ID }
`;

const schemaType = buildASTSchema(parse(schema)).getType('Post');
const schemaData = {
  id: {
    allowedValues: [1, 2, 3]
  },
  title: {
    options: [{label: 1, value: 'a'}, {label: 2, value: 'b'}]
  }
};

const schemaValidator = model => {
  const details = [];

  if (!model.id) {
    details.push({name: 'id', message: 'ID is required!'});
  }

  // ...

  if (details.length) {
    throw {details};
  }
};

const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaData);
```

## `JSONSchemaBridge`

```js
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

// SimpleSchema bridge.
const bridge = new JSONSchemaBridge(schema, schemaValidator);
```

## `SimpleSchema2Bridge`

```js
import {SimpleSchema2Bridge} from 'uniforms-bridge-simple-schema-2';

// SimpleSchema@2 bridge.
const bridge = new SimpleSchema2Bridge(simpleSchema2Instance);
```

## `SimpleSchemaBridge`

```js
import {SimpleSchemaBridge} from 'uniforms-bridge-simple-schema';

// SimpleSchema bridge.
const bridge = new SimpleSchemaBridge(simpleSchemaInstance);
```
