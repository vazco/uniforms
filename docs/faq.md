---
id: faq
title: FAQ
---

### Can I use React v18?

_Yes_, but be cautious about it.

Our test suite is incompatible with it (we're using Enzyme; see [enzymejs/enzyme#2429](https://github.com/enzymejs/enzyme/issues/2429) and [enzymejs/enzyme#2524](https://github.com/enzymejs/enzyme/issues/2524)), therefore we are not certain that everything works as it should. Based on the [official upgrade guide](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html), there's nothing you should worry about. A few people (including some of our projects) are already doing that (see [#1109](https://github.com/vazco/uniforms/issues/1109)).

If you'll encounter any issues, do file an issue.

### How can I customize/style my form fields?

You can style your form fields simply by passing a `className` property.

### How can I create custom fields?

You can create a custom field by wrapping your component inside the [`connectField`](/docs/api-helpers#connectfieldcomponent-options).

The `connectField` will pass various props related to the form management, such as `onChange()` function, current field's value, errors and so on, to your component.

Please visit the [Tutorials > Creating a custom field](/docs/tutorials-creating-custom-field) tutorial to see how to create your own fields.

### How can I use a custom field in my form?

You can tell your schema to use your custom field by adding the `uniforms` property.

Example in JSONSchema:

```tsx
const schema = {
  /*...*/
  firstName: {
    type: 'string',
    uniforms: MyCustomFirstNameField,
  },
  /*...*/
};
```

We say that the component used for the `firstName` property will be the `MyCustomFirstNameField`.

You can also leave the schema untouched and pass your custom field directly to the `AutoField` in a `component` property instead:

```tsx
<AutoForm schema={schema} onSubmit={onSubmit}>
  /*...*/
  <AutoField component={MyCustomFirstNameField} name="firstName" />
  /*...*/
</AutoForm>
```

### How can I pass additional props to the custom field?

You can pass any additional props to your custom field, by converting the `uniforms` property to the type of object, with the `component` key. Any other keys will be treated as props.

E.g. in JSONSchema:

```tsx
const schema = {
  /*...*/
  firstName: {
    type: 'string',
    uniforms: {
      component: MyCustomFirstNameField,
      propA: 1,
      propB: 2,
    },
  },
  /*...*/
};
```

We say that the component used for the `firstName` property will be the `MyCustomFirstNameField` and it will receive 2 additonal props: `propA` and `propB`.

You can also leave the schema untouched and pass your custom field with props directly to the `AutoField` instead:

```tsx
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

### How can I have a dynamic label? (e.g. handling i18n)

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

```tsx
<AutoForm validate="onChange" schema={schema} onSubmit={onSubmit} />
```

**Note:** If your schema validator accepts any options, those can be passed in `validator` prop:

```tsx
<AutoForm validator={validatorOptions} />
```

### How can I reset my form state?

You can use [React `ref` prop](https://facebook.github.io/react/docs/more-about-refs.html) or [`formRef`](/docs/api-context-data#formref) to manually access form methods.

These methods are:

- `change(key, value)`
- `reset()`
- `submit()`
- `validate()` _(added in `ValidatedForm`)_

```tsx
import { useRef } from 'react';

const MyForm = ({ schema, onSubmit }) => {
  const formRef = useRef();

  return (
    <section>
      <AutoForm ref={formRef} schema={schema} onSubmit={onSubmit} />
      <small onClick={() => formRef.reset()}>Reset</small>
      <small onClick={() => formRef.submit()}>Submit</small>
    </section>
  );
};
```

or the hook way:

```tsx
function FormControls() {
  const { formRef } = useForm();

  return (
    <>
      <button onClick={() => formRef.reset()}>Reset</button>
      <button onClick={() => formRef.submit()}>Submit</button>
    </>
  );
}

function App() {
  return (
    <AutoForm>
      <FormControls />
    </AutoForm>
  );
}
```

You can find more about form methods [here](/docs/api-forms).

### I want my form to be prefilled with data. How can I do that?

You can pass the initial data to the form by using the `model` prop.

The `model` is an object with `{field: value}` structure. It doesn't matter if it has a prototype or not, but keep in mind that in `onSubmit` or in `onChangeModel` you'll receive a plain object. If you treat form as an input, then this is a value.

### How can I transform my model?

You should `modelTransform`. It is a function transforming one model into another. It's used in a few situations (called 'modes') described below.

**Remember not to mutate a given model!**

```tsx
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

```tsx
import { useRef } from 'react';

const inputRef = useRef();

<AutoField name="firstName" inputRef={inputRef} />;
```

### How can I create a multi-step form?

What is a multi-step form? Well, one can imagine at least two completely separate definitions:

1. **A set of independent forms with a shared state.** That's the _easier_ one as it's always possible. Each step renders a separate form, with a different schema/validator/style and moves to the next one when submitted, accumulating submitted data.

   This handles not only multi-step forms but also <s>forms</s> wizards with a tree-like structure (i.e. next step bases on the answers). Optional steps (_skip step 2 if age < 40_) and contextual validation (_field Y in step 2 has to be greater than the value of X in step 1_) is also possible.

   But it gets even better - each step may use a different forms library! It makes no sense but is definitely possible - each form is independent, and the orchestration happens in the application.

2. **A single form displayed in parts.** It is, of course, possible to implement it, but the number of all configurations and options is _massive_. But let's skip that and see where a bigger problem is: the validation. In **1.** each step is validated separately (i.e. can have a separate schema). Here, we have only one schema, and the schema itself has to know that _some_ fields were not yet visible.

   Let's make an example. The schema is very basic: `{ a: string, b: string }` (TypeScript notation). Now, as both `a` and `b` are required, a _valid_ model has to have both. If the first step will render only the `a` field (`b` is on the next page), it's impossible to validate the form. This leads to a situation where the schema (logic) depends on the steps (UI). On the other hand, the form could be validated only at the end. The UX of this solution is terrible though - imagine a _there's an error ten pages back_ error!

We are not planning to provide any out-of-the-box support for multi-step forms as option **1.** is most of the time the best. It's not only the cleanest but also less complicated as well as doesn't rely on any library.

### How can I know a current form state?

A current form state is available in [React context](https://reactjs.org/docs/context.html), accessible through `useForm` and `useField(name)` hooks.

The context data consists of various properties which can be found in [here](/docs/api-context-data).

##### Example usage:

```tsx
function SubmittingState() {
  const uniforms = useForm();
  return uniforms.submitting ? 'Submitting...' : null;
}

<AutoForm>
  <SubmittingState />
</AutoForm>;
```

### I want to disable a submit button until there is a difference between the current form state and my model. How can I do it?

Basically, you have to find out whether there is a difference between a current form state and your model, e.g. by calling lodash's `isEqual` function.
Current form state can be accessed through the context (see [How can I know a current form state?](/docs/faq#how-can-i-know-a-current-form-state)) and form model can be passed as an ordinary prop:

```tsx
function DifferentSubmitField({ initialModel }) {
  const { model } = useForm();
  return <SubmitField disabled={isEqual(uniforms.model, initialModel)} />;
}

const ChangedForm = ({ model }) => (
  <AutoForm model={model}>
    <DifferentSubmitField initialModel={model} />
  </AutoForm>
);
```

### Why am I suddenly getting type errors in my form components?

After introduction of TypeScript in `uniforms@3.0.0`, in the initial versions all form components in theme packages were typed as `any`.
Natural strict typing is not possible due to TypeScript constraints. In one of the versions we have decided to change this approach and explicitly cast all of the form types.
If you experience any errors regarding form types, please [file us a bug report](https://github.com/vazco/uniforms/issues/new?assignees=&labels=&template=bug-report.md) and use one of the following workarounds for the time being in your project.

```tsx
const AnyAutoForm: any = AutoForm;
<AnyAutoForm untypedProp={1} />;

// or

const anyProps: any = {
  untypedProp: 1
}
<AutoForm {...anyProps} />
```

### "`useForm` must be used within a form"

uniforms uses a `React.Context` in order to keep the state of the whole form.
The provider for this context is rendered by `BaseForm`, and in turn all the other form components inheriting it.

There are two most common issues causing this problem:

1. **The component calling this function does not have a Form component above it anywhere in the component tree.**

   To fix this, wrap this component within a parent Form component (does not have to be direct).

2. **There are multiple versions of `uniforms` installed in your `node_modules`**.

   This usually happens when you have installed more than one version of the core `uniforms` package. It can happen when you have a mismatch of versions between any of your `uniforms` related dependencies.

   Ensure all your uniforms packages versions, clean any `node_modules` directories and reinstall dependencies to resolve this error.
