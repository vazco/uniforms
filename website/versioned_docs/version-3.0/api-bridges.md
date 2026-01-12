---
id: api-bridges
title: Bridges
---

To make use of any schema, uniforms have to create a _bridge_ of it - a unified schema mapper.

<p align="center">
  <img src="/img/bridge-concept.svg" />
</p>

Currently available bridges:

- `GraphQLBridge` in `uniforms-bridge-graphql`
- `JSONSchemaBridge` in `uniforms-bridge-json-schema`
- `SimpleSchema2Bridge` in `uniforms-bridge-simple-schema-2`
- `SimpleSchemaBridge` in `uniforms-bridge-simple-schema`

If you see a lot of [`Warning: Unknown props...`](https://fb.me/react-unknown-prop) logs, check if your schema or theme doesn't provide extra props. If so, consider [registering it with `filterDOMProps`](/docs/3.0/api-helpers#filterdomprops).

## `GraphQLBridge`

This bridge enables using GraphQL schema types as uniforms forms.
This saves you from not having to rewrite the form schema in your code.
As a trade-off, you have to write the validator from scratch. In some cases, it might be easier to rewrite the schema and use, for example, [`JSONSchemaBridge` with `ajv`](/docs/3.0/api-bridges#jsonschemabridge).
If only a simple or no validation is needed, this bridge is perfectly suited to work with GraphQL schemas.

The constructor accepts three arguments:

- `schema: GraphQLType` can be any type parsed and extracted from a GraphQL schema.
- `validator: (model: Record<string, any>) => any` a custom validator function that should return a falsy value if no errors are present or information about errors in the model as described in the [custom bridge section](/docs/3.0/examples-custom-bridge#validator-definition).
- `extras: Record<string, any> = {}` used to extend the schema generated from GraphQL type with extra field configuration.

### Code example

```tsx
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

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
const schemaExtras = {
  id: {
    allowedValues: [1, 2, 3],
  },
  title: {
    options: [
      { label: 1, value: 'a' },
      { label: 2, value: 'b' },
    ],
  },
  'author.firstName': {
    placeholder: 'John',
  },
};

const schemaValidator = (model: object) => {
  const details = [];

  if (!model.id) {
    details.push({ name: 'id', message: 'ID is required!' });
  }

  if (!model.author.id) {
    details.push({ name: 'author.id', message: 'Author ID is required!' });
  }

  if (model.votes < 0) {
    details.push({
      name: 'votes',
      message: 'Votes must be a non-negative number!',
    });
  }

  // ...

  return details.length ? { details } : null;
};

const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
```

## `JSONSchemaBridge`

```tsx
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
      minimum: 0,
    },
  },
  required: ['firstName', 'lastName'],
};

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

const bridge = new JSONSchemaBridge(schema, schemaValidator);
```

### Note on `allOf`/`anyOf`/`oneOf`

The current handling of `allOf`/`anyOf`/`oneOf` is not complete and does not work with all possible cases. For an in-detail discussion, see [\#863](https://github.com/vazco/uniforms/issues/863). How it works, is that only a few properties are being used:

- `properties`, where all subfields are merged (last definition wins),
- `required`, where all properties are accumulated, and
- `type`, where the first one is being used.

Below is an example of these implications:

```ts
{
  "type": "object",
  "properties": {
    // This will render `NumField` WITHOUT `min` nor `max` properties.
    // It will be properly validated, but without any UI guidelines.
    "foo": {
      "type": "number",
      "allOf": [{ "minimum": 0 }, { "maximum": 10 }]
    },
    // This will render as `TextField`.
    "bar": {
      "oneOf": [{ "type": "string" }, { "type": "number" }]
    }
  }
}
```

### Note on Bluebird

If you're using the [`bluebird`](https://www.npmjs.com/package/bluebird) package, you may have seen the following warning ([docs](http://bluebirdjs.com/docs/warning-explanations.html#warning-a-promise-was-rejected-with-a-non-error)):

> Warning: a promise was rejected with a non-error [object Object]

In order to fix it, your `validator` function should return a `Error`-like object instead of an object with a single `details` property. The cleanest would be to create a custom `ValidationError` class:

```ts
import { ErrorObject } from 'ajv';

class ValidationError extends Error {
  name = 'ValidationError';

  constructor(public details: ErrorObject[]) {
    super('ValidationError');
  }
}

// Usage.
return validator.errors?.length ? new ValidationError(validator.errors) : null;
```

See [#1047](https://github.com/vazco/uniforms/discussions/1047) for more details.

## `SimpleSchema2Bridge`

```tsx
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
      propA: 1, // ...and/or extra props.
    },
  },
});

const bridge = new SimpleSchema2Bridge(PersonSchema);
```

## `SimpleSchemaBridge`

```tsx
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
      propA: 1, // ...and/or extra props.
    },
  },
});

const bridge = new SimpleSchemaBridge(PersonSchema);
```
