---
id: api-context-data
title: Context data
---

Some components might need to know a current form state, which is passed as `uniforms` in [React context](https://reactjs.org/docs/legacy-context.html).
Properties stored in the context relates either to the form values or the form instance itself.
That means, besides current form state, you can access form methods or encounter some metadata, eg. about the used schema.
Some of them were designed for internal use, but you can still take advantage of them.

## Available context data

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

You can directly access to the `onChange` method. Eg. `onChange(field, value)`.

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

| Name              | Description                                                                                                                                                                                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `changed`         | Indicates whether there was a change on form.                                                                                                                                                  |
| `changedMap`      | A map of changed fields. Rather internal one, used for checking if _other_ fields has changed. [Usage](https://github.com/vazco/uniforms/blob/master/packages/uniforms/src/BaseField.js#L220). |
| `disabled`        | Indicates whether the form is disabled.                                                                                                                                                        |
| `label`           | Indicates whether the labels should be shown.                                                                                                                                                  |
| `placeholder`     | Indicates whether the placeholders should be shown.                                                                                                                                            |
| `showInlineError` | Indicates whether the inline errors should be shown.                                                                                                                                           |
| `submitting`      | Indicates whether the form is in the `submitting` state.                                                                                                                                       |
| `validating`      | Indicates whether the form is in the `validating` state. Helpful when handling asynchronous validation.                                                                                        |

## Context properties' structure

```js
MyComponentUsingUniformsContext.contextTypes = {
  uniforms: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string).isRequired,

    error: PropTypes.any,
    model: PropTypes.object.isRequired,

    schema: PropTypes.shape({
      getError: PropTypes.func.isRequired,
      getErrorMessage: PropTypes.func.isRequired,
      getErrorMessages: PropTypes.func.isRequired,
      getField: PropTypes.func.isRequired,
      getInitialValue: PropTypes.func.isRequired,
      getProps: PropTypes.func.isRequired,
      getSubfields: PropTypes.func.isRequired,
      getType: PropTypes.func.isRequired,
      getValidator: PropTypes.func.isRequired
    }).isRequired,

    state: PropTypes.shape({
      changed: PropTypes.bool.isRequired,
      changedMap: PropTypes.object.isRequired,
      submitting: PropTypes.bool.isRequired,

      label: PropTypes.bool.isRequired,
      disabled: PropTypes.bool.isRequired,
      placeholder: PropTypes.bool.isRequired
    }).isRequired,

    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    randomId: PropTypes.func.isRequired
  }).isRequired
};
```

## Accessing context data

A convenient way to access context is to write a helper function, eg. `WithUniforms`, that receives a context and passes it to the children:

```js
import { BaseField } from 'uniforms';

const WithUniforms = ({ children }, { uniforms }) => children(uniforms);

WithUniforms.contextTypes = BaseField.contextTypes;
```

You can also directly subscribe to the context inside your field component:

```js
import { BaseField } from 'uniforms';

const MyComponentUsingUniformsContext = (props, { uniforms }) => (
  //Now I have access to the uniforms context!
  <input />
);

MyComponentUsingUniformsContext.contextTypes = BaseField.contextTypes;
```
