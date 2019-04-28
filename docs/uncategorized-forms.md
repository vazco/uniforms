---
id: uncategorized-forms
title: Forms
---

## Asynchronous validation

`ValidatedForm` (and so `AutoForm`) has an `onValidate` prop. It can be used to create an asynchronous validation:

```js
const onValidate = (model, error, callback) => {
  // You can either ignore validation error...
  if (omitValidation(model)) {
    return callback(null);
  }

  // ...or any additional validation if an error is already there...
  if (error) {
    return callback();
  }

  // ...or feed it with another error.
  MyAPI.validate(model, error => callback(error || null));
};

// Later...

<ValidatedForm {...props} onValidate={onValidate} />;
```

## Autosave

Every form has an autosave functionality. If you set an `autosave` prop, then every change will trigger a submit. There's also an `autosaveDelay` prop - a minimum time between saves in milliseconds (default: `0`).

**Example:**

```js
<AutoForm
  autosave
  autosaveDelay={5000} // 5 seconds
  schema={schema}
  onSubmit={onSubmit}
/>
```

## Hierarchy

<p align="center">
  <img src="img/uniforms-graph.png" />
</p>

## Methods

You can use [React `ref` prop](https://facebook.github.io/react/docs/more-about-refs.html) to manually access form methods. Example usage:

```js
const MyForm = ({schema, onSubmit}) => {
  let formRef;

  return (
    <section>
      <AutoForm ref={ref => (formRef = ref)} schema={schema} onSubmit={onSubmit} />
      <small onClick={() => formRef.reset()}>Reset</small>
      <small onClick={() => formRef.submit()}>Submit</small>
    </section>
  );
};
```

All available methods:

- `change(key, value)`
- `reset()`
- `submit()`
- `validate()` _(added in `ValidatedForm`)_

## Change reactions

If you want to make one field to influence others, simply extend `AutoForm` and override `onChange` method.

**Example:**

```js
class ChainForm extends AutoForm {
  onChange(key, value) {
    if (key === 'key_to_intercept') return;
    if (key === 'key_to_translate') return super.onChange('another_key', value);
    if (key === 'key_to_mutate') {
      super.onChange('another_key1', value * 2);
      super.onChange('another_key2', value / 2);
      return;
    }

    super.onChange(key, value);
  }
}
```

It can be easily applied multiple times to make your forms even more reusable.

**Example:**

```js
const withMultipliedField = (fieldA, fieldB, Form) =>
  class withMultipliedFieldForm extends Form {
    onChange(key, value) {
      // Multiply fieldA
      if (key === fieldA) super.onChange(fieldB, value + value);

      // Pass every change
      super.onChange(key, value);
    }
  };
```

## Model transformations

If you need to transform model before it will be validated, submitted or passed down to the fields, there's a `modelTransform` prop, which should be used in those use cases.

**Example:**

```js
<AutoForm
  // Do not mutate given model!
  modelTransform={(mode, model) => {
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
  }}
  onSubmit={onSubmit}
  schema={schema}
/>
```

## Post-submit handling

It's a good UX practice to tell your users that something failed or succeed. To make it simpler, there are `onSubmitFailure` and `onSubmitSuccess` props.

**Example:**

```js
<AutoForm
  schema={schema}
  onSubmit={doc => db.saveThatReturnsPromise(doc)}
  onSubmitSuccess={() => alert('Promise resolved!')}
  onSubmitFailure={() => alert('Promise rejected!')}
/>
```

## Validation options and modes

Any form can be validated in one those three styles:

- `onChange`
  Validate on every change.

- `onChangeAfterSubmit` _(default)_
  Validate on every change, but only after first submit.

- `onSubmit`
  Validate on every submit.

If your schema validator accepts any options, those can be passed in `validator` prop.

**Example:**

```js
<AutoForm validate="onChange" validator={validatorOptions} schema={schema} onSubmit={onSubmit} />
```
