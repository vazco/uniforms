---
id: tutorials-basic-uniforms-usage
title: Basic uniforms usage
---

import { Callout } from 'nextra/components'


<Callout type="info" emoji="💡">

You can also follow the tutorial and explore uniforms in our [sample CodeSandbox repository](https://codesandbox.io/s/github/vazco/uniforms/tree/master/reproductions).

</Callout>

Imagine that we host an IT conference and want to make a list of guests.
Obviously, we want to collect their first name and last name.
Additionally, we can ask for their work experience, but that information is not required.
Let's prepare a form for the guests, so they can sign up for our event, by using uniforms!

### 1. Install the required packages

To start using uniforms, we have to install three independent packages:

1. Core
2. Bridge
3. Theme

In this example, we will use the JSONSchema to describe our desired data format and style our form using Semantic UI theme.

```shell
npm install uniforms
npm install uniforms-bridge-json-schema
npm install uniforms-semantic
```

**Note**: When using a themed package, remember to include correct styles! If you are willing to run this example by yourself,
have a read on [Semantic UI React's theme usage](https://react.semantic-ui.com/usage/#theme).

### 2. Start by defining a schema

After we've installed required packages, it's time to define our Guest schema. We can do it in a plain JSON, which is a valid JSONSchema instance:

```tsx
import Ajv, { JSONSchemaType } from 'ajv';

type FormData = {
  firstName: string;
  lastName: string;
  workExperience: number;
};

const schema: JSONSchemaType<FormData> = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
  },
  required: ['firstName', 'lastName'],
};
```

As you can see, we've defined three properties - `firstName` and `lastName`, that are of string type, and `workExperience`,
which is an integer, with a value between 0 and 100.

### 3. Then create the bridge

Now that we have the schema, we can create the uniforms bridge of it, by using the corresponding uniforms schema-to-bridge package.
Creating the bridge instance is necessary - without it, uniforms would not be able to process form generation and validation.
As we are using the JSONSchema, we have to import the `uniforms-bridge-json-schema` package.

```tsx
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
```

Now you may think that we can simply do:

```tsx
// Wrong usage of the JSONSchemaBridge!
// You have to pass a validator!
const bridge = new JSONSchemaBridge({ schema });
```

However, **there's small caveat with using the JSONSchemaBridge**.
Because of its simplicity, JSONSchema doesn't provide any validation checkers, so in order to properly validate our submitted data,
we need to **manually define a validator**, and that is required by the uniforms `JSONSchemaBrigde` constructor.

To manually create the validator, we will use the [Ajv](https://github.com/ajv-validator/ajv) package:

<Callout type="warning" emoji="⚠️">

Ajv executes in [strict mode by default](https://ajv.js.org/options.html#strict) since version 7. To avoid errors at schema compilation phase, we have to register the `uniforms` keyword (see [Unknown keywords](https://ajv.js.org/strict-mode.html#unknown-keywords) for more details).

</Callout>

```tsx
import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
});

function createValidator<T>(schema: JSONSchemaType<T>) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);
```


Now that we have both the schema and the validator, we can create the uniforms bridge:

```tsx
// Correct usage of the JSONSchemaBridge.
export const bridge = new JSONSchemaBridge({
  schema,
  validator: schemaValidator,
});
```

Just to recap, the whole `GuestSchema.js` file looks like this:

```tsx
import Ajv, { JSONSchemaType } from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

type FormData = {
  firstName: string;
  lastName: string;
  workExperience: number;
};

const schema: JSONSchemaType<FormData> = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
  },
  required: ['firstName', 'lastName'],
};

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
});

function createValidator<T>(schema: JSONSchemaType<T>) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge({
  schema,
  validator: schemaValidator,
});
```

### 4. Finally, use it in a form!

uniforms theme packages provide the `AutoForm` component, which is able to generate the form based on the given schema.
All we have to do now is to pass the previously created GuestSchema to the `AutoForm`:

```tsx
import React from 'react';
import { AutoForm } from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

export function GuestFormBasic() {
  return <AutoForm schema={schema} onSubmit={console.log} />;
}
```

And that's it! `AutoForm` will generate a complete form with labeled fields, errors list (if any) and a submit button.
Also, it will take care of validation and handle model changes.

{/* FIXME: Add interactive playground */}
