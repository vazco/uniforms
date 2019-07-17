---
id: faq
title: FAQ
---

### How can I customize/style my form fields?

You can style your form fields simply by passing a `className` property.

### How can I create a custom fields?

You can create a custom field by wrapping your component inside the [`connectField`](api-helpers#connectfieldcomponent-options).

The `connectField` will pass various props related to the form management, such as `onChange()` function, current field's value, errors an so on, to your component.

Please visit the ['Creating a custom field'](tutorials-creating-custom-field) tutorial to see how to create your own fields.

### How can I use a custom field in my form?

You can tell your schema to use your custom field by adding the `uniforms` property.

Eg. in JSONSchema:

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
<AutoForm>
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
<AutoForm>
  /*...*/
  <AutoField component={MyCustomFirstNameField} name="firstName" propA={1} propB={2} />
  /*...*/
</AutoForm>
```

### How can I have a dynamic labels? (eg. handling i18n)

There are few ways to handle that, depending on the level of abstraction you want to do it - schema, field or `AutoField` component.

On the **schema** level, you can use `uniforms: {...}` object property to pass extra props to the field.
A function returning it (`uniforms: () => ({...})` is also accepted. With it, dynamic labels can be fetched from any source.

On the **field** level, you can prepare your own component set, where you will use `<Translate>{label}</Translate>` instead of `{label}`.

While the first one is schema-dependent and the second is theme-dependent, there's an additional option, somewhere in between. You can create a custom `AutoField` component, based on a builtin one, where you provide some additional props and label might be one of them (based on other props, like name or some schema field).

### How can I reset my form state?

todo

### How can I transform my model?

todo

### How can I make my form autofocused?

You can take a reference to the field and manually trigger `.focus()`:

```js
<AutoField name="firstName" inputRef={field => field.focus()} />
```
