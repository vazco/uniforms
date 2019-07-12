---
id: api-bridges
title: Bridges
---

## Concept

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
        id:        String!
        firstName: String
        lastName:  String
    }

    type Post {
        id:     Int!
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

// Later...

<ValidatedForm schema={bridge} />;
```

## `JSONSchemaBridge`

```js
import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Person',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    age: {
      description: 'Age in years',
      type: 'integer',
      minimum: 0
    }
  },
  required: ['firstName', 'lastName']
};

const validator = new Ajv({allErrors: true, useDefaults: true}).compile(schema);

const schemaValidator = model => {
  validator(model);

  if (validator.errors && validator.errors.length) {
    throw {details: validator.errors};
  }
};

const bridge = new JSONSchemaBridge(schema, schemaValidator);

// Later...

<ValidatedForm schema={bridge} />;
```

## `SimpleSchema2Bridge`

**Note:** remember to import `uniforms-bridge-simple-schema-2` first.

```js
import SimpleSchema from 'simpl-schema';

const PersonSchema = new SimpleSchema({
  // ...

  aboutMe: {
    type: String,
    uniforms: MyText, // Component...
    uniforms: {
      // ...or object...
      component: MyText, // ...with component...
      propA: 1 // ...and/or extra props.
    }
  }
});
```

## `SimpleSchemaBridge`

**Note:** remember to import `uniforms-bridge-simple-schema` first.

```js
import {SimpleSchema} from 'aldeed:simple-schema';

const PersonSchema = new SimpleSchema({
  // ...

  aboutMe: {
    type: String,
    uniforms: MyText, // Component...
    uniforms: {
      // ...or object...
      component: MyText, // ...with component...
      propA: 1 // ...and/or extra props.
    }
  }
});
```
