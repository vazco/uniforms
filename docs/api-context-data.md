---
id: api-context-data
title: Context data
---

Some components might need to know a current form state, which is passed as [React context](https://reactjs.org/docs/context.html).
Properties stored in the context relates either to the form values or the form instance itself.
That means, besides current form state, you can access form methods or encounter some metadata, e.g. about the used schema.
Some of them were designed for internal use, but you can still take advantage of them.

## Accessing context data

A convenient way to access context is to use the `useForm` hook:

```js
import { useForm } from 'uniforms';

function MyComponent() {
  const uniforms = useForm();
}
```

If you want to access only field-relevant part, use `useField(name, props)` hook, where `name` is the target field name and `props` are the props of it:

```js
import { useField } from 'uniforms';

function MyCustomField(rawProps) {
  const [props, uniforms] = useField(rawProps.name, rawProps);
}
```

Using `useField` allows you to create components that combine values of multiple fields:

```js
import { useField } from 'uniforms';

function ArePasswordsEqual() {
  const [{ value: passwordA }] = useField('passwordA', {});
  const [{ value: passwordB }] = useField('passwordB', {});
  const areEqual = passwordA === passwordB;
  return <div>{`Passwords are ${areEqual ? 'equal' : 'not equal'}`}</div>;
}
```

Additionally, `useField` accept third, optional parameter: `options`:

|     Option     | Default |                                                             Description                                                              |
| :------------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------: |
| `absoluteName` | `false` |                         Whether the field name should be treated as a top-level one, ignoring parent fields.                         |
| `initialValue` | `true`  | Initial value check. If `true`, then after the first render the default value is set as value if no value is provided (`undefined`). |

## Available context data

### `changed`

Indicates whether there was a change on form.

### `changedMap`

A map of changed fields. Rather internal one, used for checking if _other_ fields has changed.

### `error`

An object with a `details` field, which is an array of any validation errors.

### `model`

An object with current form fields values structured `{field: value}`.

### `name`

It is an array of the parent fields names:

```js
<Field name="x">
  // name = []
  <Field name="y.z">
    // name = ['x']
    <Field name="a" /> // name = ['x', 'y', 'z']
  </Field>
</Field>
```

For example if we define a `CompositeField`:

```js
const Composite = () => (
  <section>
    <AutoField name="firstName" />
    <AutoField name="lastName" />
  </section>
);
```

And use it like that:

```js
<AutoForm schema={schema}>
  <CompositeField name="personA" />
  <SubmitField />
</AutoForm>
```

The `name` array of the nested `AutoFields` will store a `personA` value.

### `onChange`

You can directly access to the `onChange` method. E.g. `onChange(field, value)`.

### `onSubmit`

Access to `onSubmit` method.

### `randomId`

Access to `randomId` method. Similar to [randomIds()](/docs/api-helpers#randomidsprefix).

### `schema`

A bridge class instance with `schema` and `validator` properties.

The `schema` is simply your schema object and `validator` is your validating function.

### `state`

The `state` is an object representing your current form status.

The state properties are:

|       Name        |                     Description                      |
| :---------------: | :--------------------------------------------------: |
|    `disabled`     |       Indicates whether the form is disabled.        |
|      `label`      |    Indicates whether the labels should be shown.     |
|   `placeholder`   | Indicates whether the placeholders should be shown.  |
|    `readOnly`     |       Indicates whether the form is read-only.       |
| `showInlineError` | Indicates whether the inline errors should be shown. |

### `submitted`

Indicates whether the form was submitted.

### `submitting`

Indicates whether the form is in the `submitting` state. Helpful when handling asynchronous submission.

### `validating`

Indicates whether the form is in the `validating` state. Helpful when handling asynchronous validation.
