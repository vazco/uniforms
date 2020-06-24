---
id: api-bridges
title: Bridges
---

To make use of any schema, uniforms have to create a _bridge_ of it - a unified schema mapper.

Currently available bridges:

- `GraphQLBridge` in `uniforms-bridge-graphql`
- `JSONSchemaBridge` in `uniforms-bridge-json-schema`
- `SimpleSchema2Bridge` in `uniforms-bridge-simple-schema-2`
- `SimpleSchemaBridge` in `uniforms-bridge-simple-schema`

## `GraphQLBridge`

```js
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema } from 'graphql';
import { parse } from 'graphql';

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
    options: [
      { label: 1, value: 'a' },
      { label: 2, value: 'b' }
    ]
  }
};

const schemaValidator = model => {
  const details = [];

  if (!model.id) {
    details.push({ name: 'id', message: 'ID is required!' });
  }

  // ...

  if (details.length) {
    throw { details };
  }
};

const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaData);
```

## `JSONSchemaBridge`

```js
import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const schema = {
  title: 'Person',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: {
      description: 'Age in years',
      type: 'integer',
      minimum: 0
    }
  },
  required: ['firstName', 'lastName']
};

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      return { details: validator.errors };
    }
  };
}

const schemaValidator = createValidator(schema);

const bridge = new JSONSchemaBridge(schema, schemaValidator);
```

## `SimpleSchema2Bridge`

```js
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

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

const bridge = new SimpleSchema2Bridge(PersonSchema);
```

## `SimpleSchemaBridge`

```js
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema';
import { SimpleSchema } from 'aldeed:simple-schema';

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

const bridge = new SimpleSchemaBridge(PersonSchema);
```
