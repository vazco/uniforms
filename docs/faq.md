---
id: faq
title: FAQ
---

### How can I customize/style my form fields?

You can style your form fields simply by passing a `className` property.

### How can I create custom fields?

You can create a custom field by wrapping your component inside the [`connectField`](api-helpers#connectfieldcomponent-options).

The `connectField` will pass various props related to the form management, such as `onChange()` function, current field's value, errors and so on, to your component.

Please visit the [Tutorials > Creating a custom field](tutorials-creating-custom-field) tutorial to see how to create your own fields.

### How can I use a custom field in my form?

You can tell your schema to use your custom field by adding the `uniforms` property.

Example in JSONSchema:

```js
const schema = {
  /*...*/
  firstName: {
    type: 'string',
    uniforms: MyCustomFirstNameField
  }
  /*...*/
};
```

We say that the component used for the `firstName` property will be the `MyCustomFirstNameField`.

You can also leave the schema untouched and pass your custom field directly to the `AutoField` in a `component` property instead:

```js
<AutoForm schema={schema} onSubmit={onSubmit}>
  /*...*/
  <AutoField component={MyCustomFirstNameField} name="firstName" />
  /*...*/
</AutoForm>
```

### How can I pass additional props to the custom field?

You can pass any additional props to your custom field, by converting the `uniforms` property to the type of object, with the `component` key. Any other keys will be treated as props.

Eg. in JSONSchema:

```js
const schema = {
  /*...*/
  firstName: {
    type: 'string',
    uniforms: {
      component: MyCustomFirstNameField,
      propA: 1,
      propB: 2
    }
  }
  /*...*/
};
```

We say that the component used for the `firstName` property will be the `MyCustomFirstNameField` and it will receive 2 additonal props: `propA` and `propB`.

You can also leave the schema untouched and pass your custom field with props directly to the `AutoField` instead:

```js
<AutoForm schema={schema} onSubmit={onSubmit}>
  /*...*/
  <AutoField
    component={MyCustomFirstNameField}
    name="firstName"
    propA={1}
    propB={2}
  />
  /*...*/
</AutoForm>
```

### How can I have a dynamic label? (eg. handling i18n)

There are few ways to handle that, depending on the level of abstraction you want to do it - schema, field or `AutoField` component.

On the **schema** level, you can use `uniforms: {...}` object property to pass extra props to the field.
A function returning it (`uniforms: () => ({...})`) is also accepted. With it, dynamic labels can be fetched from any source.

On the **field** level, you can prepare your own component set, where you will use `<Translate>{label}</Translate>` instead of `{label}`.

While the first one is schema-dependent and the second is theme-dependent, there's an additional option, somewhere in between. You can create a custom `AutoField` component, based on a builtin one, where you provide some additional props and label might be one of them (based on other props, like name or some schema field).

### How can I change the way my form validates?

Any form can be validated in one of those three styles:

- `onChange`
  Validate on every change.

- `onChangeAfterSubmit` _(default)_
  Validate on every change, but only after first submit.

- `onSubmit`
  Validate on every submit.

You change the way your form validates by setting `validate` prop:

```js
<AutoForm validate="onChange" schema={schema} onSubmit={onSubmit} />
```

**Note:** If your schema validator accepts any options, those can be passed in `validator` prop:

```js
<AutoForm validator={validatorOptions} />
```

### How can I reset my form state?

You can use [React `ref` prop](https://facebook.github.io/react/docs/more-about-refs.html) to manually access form methods.

These methods are:

- `change(key, value)`
- `reset()`
- `submit()`
- `validate()` _(added in `ValidatedForm`)_

```js
const MyForm = ({ schema, onSubmit }) => {
  let formRef;

  return (
    <section>
      <AutoForm
        ref={ref => (formRef = ref)}
        schema={schema}
        onSubmit={onSubmit}
      />
      <small onClick={() => formRef.reset()}>Reset</small>
      <small onClick={() => formRef.submit()}>Submit</small>
    </section>
  );
};
```

You can find more about form methods [here](api-forms).

### I want my form to be prefilled with data. How can I do that?

You can pass the initial data to the form by using the `model` prop.

The `model` is an object with `{field: value}` structure. It doesn't matter if it has a prototype or not, but keep in mind that in `onSubmit` or in `onChangeModel` you'll receive a plain object. If you treat form as an input, then this is a value.

### How can I transform my model?

You should `modelTransform`. It is a function transforming one model into another. It's used in a few situations (called 'modes') described below.

**Remember not to mutate a given model!**

```js
function transform(mode, model) {
  // This model will be passed to the fields.
  if (mode === 'form') {
    /* ... */
  }

  // This model will be submitted.
  if (mode === 'submit') {
    /* ... */
  }

  // This model will be validated.
  if (mode === 'validate') {
    /* ... */
  }

  // Otherwise, return unaltered model.
  return model;
}

<AutoForm modelTransform={transform} schema={schema} onSubmit={onSubmit} />;
```

### How can I make my form autofocused?

You can take a reference to the field and manually trigger `.focus()`:

```js
<AutoField name="firstName" inputRef={field => field.focus()} />
```

### How can I know a current form state?

A current form state is stored inside `uniforms` in [React context](https://reactjs.org/docs/legacy-context.html), emitted by a `BaseField`.

A convenient way to access it is to write a helper function, eg. `WithUniforms`, that receives a context and passes it to the children:

```js
import BaseField from 'uniforms/BaseField';

const WithUniforms = ({ children }, { uniforms }) => children(uniforms);

WithUniforms.contextTypes = BaseField.contextTypes;
```

`uniforms` context data consists of various properties which can be found in [here](api-context-data).

##### Example usage:

```js
<AutoForm>
  <WithUniforms>
    {uniforms => (
      // Now I have access to the context!
      <MyField uniformsContext={uniforms} />
    )}
  </WithUniforms>
</AutoForm>
```

You can find out more about React context [here](https://reactjs.org/docs/legacy-context.html#referencing-context-in-stateless-function-components).

### I want to disable a submit button until there is a difference between the current form state and my model. How can I do it?

Basically, you have to find out whether there is a difference between a current form state and your model, eg. by calling lodash's `isEqual` function.
Current form state can be accessed through the context (see [How can I know a current form state?](faq#how-can-i-know-a-current-form-state)) and form model can be passed as an ordinary prop:

```js
const ChangedForm = ({ model }) => (
  <AutoForm model={model}>
    <WithUniforms>
      {uniforms => <SubmitField disabled={isEqual(uniforms.model, model)} />}
    </WithUniforms>
  </AutoForm>
);
```
