---
id: api-bridges
title: Bridges
---

To make use of any schema, uniforms have to create a _bridge_ of it - a unified schema mapper.

<p align="center">
  <img src="/img/bridge-concept.svg" alt="" />
</p>

Currently available bridges:

- `JSONSchemaBridge` in `uniforms-bridge-json-schema` ([schema documentation](https://json-schema.org/))
- `SimpleSchema2Bridge` in `uniforms-bridge-simple-schema-2` ([schema documentation](https://github.com/longshotlabs/simpl-schema#readme))
- `ZodBridge` in `uniforms-bridge-zod` ([schema documentation](https://zod.dev/))

Deprecated bridges:

- `SimpleSchemaBridge` in `uniforms-bridge-simple-schema` ([schema documentation](https://github.com/Meteor-Community-Packages/meteor-simple-schema/blob/master/DOCS.md))
- `GraphQLBridge` in `uniforms-bridge-graphql` ([schema documentation](https://graphql.org/))

If you see a lot of [`Warning: Unknown props...`](https://fb.me/react-unknown-prop) logs, check if your schema or theme doesn't provide extra props. If so, consider [registering it with `filterDOMProps`](/docs/api-helpers#filterdomprops).

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

const validator = createValidator(schema);

const bridge = new JSONSchemaBridge({ schema, validator });
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

There could be multiple causes of this error. One of it is not returning a proper error object.

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

Another cause of this error may be two different implementations of the `Promise` object when using an asynchronous validate function.
Ensure that you are returning the same `Promise` object implementation that Bluebird is expecting.
The simplest way to do that should be to avoid using the `async` keyword and instead make the function return a `Promise` instead.

See [#1047](https://github.com/vazco/uniforms/discussions/1047) for more details.

## `SimpleSchema2Bridge`

```tsx
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
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

const bridge = new SimpleSchema2Bridge({ schema });
```

## `ZodBridge`

```tsx
import ZodBridge from 'uniforms-bridge-zod';
import z from 'zod';

const schema = z.object({ aboutMe: z.string() });

const bridge = new ZodBridge({ schema });
```

## `SimpleSchemaBridge`

:::caution

SimpleSchemaBridge is deprecated since uniforms v4.

:::

```tsx
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema';
import { SimpleSchema } from 'aldeed:simple-schema';

const schema = new SimpleSchema({
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

const bridge = new SimpleSchemaBridge({ schema });
```

## `ZodBridge`

```tsx
import ZodBridge from 'uniforms-bridge-zod';
import z from 'zod';

const schema = z.object({ aboutMe: z.string() });

const bridge = new ZodBridge({ schema });
```

## `GraphQLBridge`

:::caution

GraphQLBridge is deprecated since uniforms v4.

:::

This bridge enables using GraphQL schema types as uniforms forms.
This saves you from not having to rewrite the form schema in your code.
As a trade-off, you have to write the validator from scratch. In some cases, it might be easier to rewrite the schema and use, for example, [`JSONSchemaBridge` with `ajv`](/docs/api-bridges#jsonschemabridge).
If only a simple or no validation is needed, this bridge is perfectly suited to work with GraphQL schemas.

The constructor accepts these arguments:

- `schema: GraphQLType` can be any type parsed and extracted from a GraphQL schema.
- `validator: (model: Record<string, unknown>) => any` a custom validator function that should return a falsy value if no errors are present or information about errors in the model as described in the [custom bridge section](/docs/examples-custom-bridge#validator-definition).
- `extras: Record<string, unknown> = {}` used to extend the schema generated from GraphQL type with extra field configuration.
- `provideDefaultLabelFromFieldName = true` if set to `true`, the bridge will use the field name as a label if no label is provided in the schema.

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
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
    ],
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

const bridge = new GraphQLBridge({
  schema: schemaType,
  validator: schemaValidator,
  extras: schemaExtras,
});
```
