---
id: api-forms
title: Forms
---

## `AutoForm`

```js
import AutoForm from 'uniforms/AutoForm'; // Or from the theme package.

<AutoForm
  // Like onChange but for the whole model.
  //   Triggered just after onChange but with the next model instead of
  //   (key, value) pair.
  onChangeModel={model => console.log(model)}
/>;
```

**Note:** All `ValidatedQuickForm` props are also accepted and all methods are available.

## `BaseForm`

```js
import BaseForm from 'uniforms/BaseForm'; // Or from the theme package.

<BaseForm
  // Autosave delay.
  //   Set 0 for an instant autosave.
  autosaveDelay={0}
  // Enable autosave.
  //   Every change triggers onSubmit.
  autosave={false}
  // Disable form.
  //   Disables all fields and submit button.
  disabled={false}
  // Validation error.
  //   Current validation state. It should be either compatible with your
  //   schema or an Error object.
  error={new Error('Nope.')}
  // Form layout.
  //   Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object
  //   is a {mode: size} object. Complete string is simply passed through.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  // Default label prop for all fields.
  //   By default it's true - set it to false to disable labels for the whole
  //   form.
  label={true}
  // Form model.
  //   An object with {field: value} structure. It doesn't matter, if it has a
  //   prototype or not, but keep in mind that in onSubmit or in onChangeModel
  //   you'll receive a plain object. If you treat form as an input, then
  //   this is a value.
  model={{fieldA: 1}}
  // Model transform.
  //   Function transforming one model into another. It's used in few
  //   situations (modes) described below. Do not mutate a given model!
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
  // Field change action.
  //   It receive two arguments: key and value, where key is a dot separated
  //   path to the changed field and value is a requested value.
  onChange={(key, value) => console.log(key, value)}
  // Submit failure action.
  //   If onSubmit returns a Promise, then this will be attached to its
  //   .catch chain.
  onSubmitFailure={() => alert('Promise rejected!')}
  // Submit success action.
  //   If onSubmit returns a Promise, then this will be attached to its
  //   .then chain.
  onSubmitSuccess={() => alert('Promise resolved!')}
  // Submit action.
  //   When the form is submitted manually or by a HTML5 event, then it's
  //   called with the current model.
  onSubmit={model => db.saveThatReturnsPromiseOrNothing(model)}
  // Default placeholder prop for all fields.
  //   By default it's false - set it to true to enable placeholders for the
  //   whole form.
  placeholder={false}
  // Form schema.
  //   BaseForm doesn't really care about it. It's used for form generation in
  //   QuickForm and validation in ValidatedForm.
  schema={myFormSchema}
  // Default showInlineError prop for all fields.
  //   By default it's false - set it to true to enable inline errors for the
  //   whole form.
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  showInlineError={true}
  // Form methods.
  ref={form => {
    // Reset form.
    //   It will reset changed state, model state in AutoForm, validation
    //   state in ValidatedForm and rerender.
    form.reset();

    // Trigger form change.
    //   It's a programatic equivalent of a change event.
    form.change(key, value);

    // Submit form.
    //   It's a programatic equivalent of a submit event. Returns a promise,
    //   which will either resolve with submitted form or reject with
    //   validation error in ValidatedForm. You can also use onSubmitFailure
    //   and onSubmitSuccess instead of doing form.submit().then().
    form.submit();
  }}
/>;
```

## `QuickForm`

```js
import QuickForm from 'uniforms/QuickForm'; // Or from the theme package.

<QuickForm
  // Custom AutoField.
  //   It should be anything that will pass through React.createElement.
  autoField={CustomAutoField}
  // Custom ErrorsField.
  //   It should be anything that will pass through React.createElement.
  errorsField={CustomErrorsField}
  // Custom SubmitField.
  //   It should be anything that will pass through React.createElement.
  submitField={CustomSubmitField}
/>;
```

**Note:** All `BaseForm` props are also accepted and all methods are available.

## `ValidatedForm`

```js
import ValidatedForm from 'uniforms/ValidatedForm'; // Or from the theme package.

<ValidatedForm
  // Additional asynchronous validation.
  //   Schema validation has to be sync, so this is the only way to achieve
  //   async validation.
  onValidate={(model, error, callback) => {
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
  }}
  // Validation mode.
  //   By default, the form will start to validate from the time of the first
  //   submit and then revalidate on every change. It's 'onChangeAfterSubmit'.
  //   There are also 'onChange' and 'onSubmit' modes, but those are quite
  //   self-explanatory.
  validate="onChangeAfterSubmit"
  // Validator options.
  //   It's passed to getValidator of your schema bridge. It really depends on
  //   your schema.
  validator={{clean: true}}
  // Form methods.
  ref={form => {
    // Validate form with the current model.
    //   Returns a Promise, which rejects with an validation error or
    //   resolves without any value. Note, that it resolves/rejects AFTER
    //   the component is rerendered.
    form.validate();

    // Validate form with key set to value.
    //   You can use it to check, if a given value will pass the
    //   validation or not. Returns validation Promise, as described above.
    form.validate(key, value);

    // Validate form with the given model.
    //   Rather internal function. Returns validation Promise, as described
    //   above.
    form.validateModel(model);
  }}
/>;
```

**Note:** All `BaseForm` props are also accepted and all methods are available.

## `ValidatedQuickForm`

**Note:** All `QuickForm` props are also accepted and all methods are available.<br />
**Note:** All `ValidatedForm` props are also accepted and all methods are available.
