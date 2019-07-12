---
id: tutorials-basic-uniforms-usage
title: Basic uniforms usage
---

(from the idea, through the schema, to the form| customizing form layout| using connect field to manage own fields)

Imagine that we're preparing an IT meeting and we want to collect the first and last name of the guests. We also want to know how old they were when they started coding, but that information is not necessary. Let's prepare a form for the guests, so they can sign up for our event!

### 1. Install the required packages

To start using uniforms, we have to install three packages independently:

1. core
2. schema-to-bridge
3. theme

In this example, we will use the JSONSchema to describe our desired data format and style our form using Semantic UI theme.

```shell
npm install uniforms
npm install uniforms-bridge-json-schema
npm install uniforms-semantic
```

**Note**: When using a themed package, remember to include correct styles! If you are willing to run this example by yourself, have a read on [Semantic UI React's theme usage](https://react.semantic-ui.com/usage/#theme).

### 2. Start by defining a schema

After we've installed required packages, it's time to define our Guest schema. We can do it in a plain JSON, which is a valid JSONSchema instance:

```js
const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    codingSince: {
      description: 'Age in years',
      type: 'integer',
      minimum: 5
    }
  },
  required: ['firstName', 'lastName']
};
```

As you can see, we've defined three properties - firstName and lastName, that are of string type, and codingSince, which is an integer, with a minimum value 5. We assume no one could've started coding that young!

### 3. Then create the bridge

Now that we have the schema, we can create the uniforms bridge of it, by using the corresponding uniforms schema-to-bridge package. Creating the bridge instance is necessary - without it uniforms would not be able to process form generation and validation. As we are using the JSONSchema, we have to import the uniforms-bridge-json-schema package.

```js
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
```

Now you may think that we can simply do

```js
const bridge = new JSONSchemaBridge(schema); // wrong usage of the JSONSchemaBridge! you have to pass a validator
```

and we'll be fine. However, **there's small caveat with using the JSONSchemaBridge**. Because of its simplicity, JSONSchema doesn't provide any validation checkers, so in order to properly validate our submitted data, we need to **manually define a validator**, and that is required by the uniforms JSONSchemaBrigde constructor.

To manually create the validator, we will use the [ajv](https://github.com/epoberezkin/ajv) package:

```js
import Ajv from 'ajv';

const validator = new Ajv({allErrors: true, useDefaults: true}).compile(schema);

const schemaValidator = model => {
  validator(model);

  if (validator.errors && validator.errors.length) {
    throw {details: validator.errors};
  }
};
```

Now that we have both the schema and the validator, we can create the uniforms bridge:

```js
const bridge = new JSONSchemaBridge(schema, schemaValidator); // right usage of the JSONSchemaBridge, with the schema and its validator
```

Just to recap, the whole GuestSchema.js file looks like this:

```js
import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    codingSince: {
      description: 'Age in years',
      type: 'integer',
      minimum: 5
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

export default bridge;
```

### 4. Finally, use it in a form!

Uniforms theme packages provide the AutoForm component, which is able to generate the form based on the given schema. All we have to do now is to pass the previously created GuestSchema to the AutoForm:

```js
import AutoForm from 'uniforms-semantic/AutoForm';
import React from 'react';

import GuestSchema from './GuestSchema';

export default function GuestForm() {
  return <AutoForm schema={GuestSchema} onSubmit={console.log} />;
}
```

And that's it! AutoForm will generate a complete form with labeled fields, errors list (if any) and a submit button. Also, it will take care of validation and handle model changes.

<p align="center">
  <img alt="Generated guest form" src="img/guest-form.png" />
</p>
