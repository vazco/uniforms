---
id: api-forms
title: Forms
---

### Forms components

Most of the time you'll be using either `AutoForm` or `ValidatedForm`, but there are also other form components (rather low-level ones) with different capabilities.

|      Component       |     Self-generated?      |      Self-managed?       |     Self-validated?      |
| :------------------: | :----------------------: | :----------------------: | :----------------------: |
|      `AutoForm`      |    :heavy_check_mark:    |    :heavy_check_mark:    |    :heavy_check_mark:    |
| `ValidatedQuickForm` |    :heavy_check_mark:    | :heavy_multiplication_x: |    :heavy_check_mark:    |
|   `ValidatedForm`    | :heavy_multiplication_x: | :heavy_multiplication_x: |    :heavy_check_mark:    |
|     `QuickForm`      |    :heavy_check_mark:    | :heavy_multiplication_x: | :heavy_multiplication_x: |
|      `BaseForm`      | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_multiplication_x: |

## `AutoForm`

##### Props:

|      Name       |                                                         Description                                                          |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| `onChangeModel` | Like `onChange` but for the whole model. Triggered just after onChange but with the next model instead of (key, value) pair. |

**Note:** All `ValidatedQuickForm` props are also accepted and all methods are available.
In other words, that means that `AutoForm` receives all props listed on this page.

##### Props usage:

```js
import AutoForm from 'uniforms/AutoForm'; // Or from the theme package.

<AutoForm onChangeModel={model => console.log(model)} />;
```

## `BaseForm`

##### Props:

|       Name        |                                                                                                                   Description                                                                                                                   |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  `autosaveDelay`  |                                                                                                 Autosave delay. Set 0 for an instant autosave.                                                                                                  |
|    `autosave`     |                                                                                                Enable autosave. Every change triggers onSubmit.                                                                                                 |
|    `disabled`     |                                                                                              Disable form. Disables all fields and submit button.                                                                                               |
|      `error`      |                                                                 Validation error. Current validation state. It should be either compatible with yourschema or an Error object.                                                                  |
|      `grid`       |                          Form layout. Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object is a {mode: size} object. Complete string is simply passed through. Available in: bootstrap3, bootstrap4                          |
|      `label`      |                                                                 Default label prop for all fields. By default it's true - set it to false to disable labels for the whole form.                                                                 |
|      `model`      | Form model. An object with {field: value} structure. It doesn't matter, if it has a prototype or not, but keep in mind that in onSubmit or in onChangeModel you'll receive a plain object. If you treat form as an input, then this is a value. |
| `modelTransform`  |                                                Model transform. Function transforming one model into another. It's used in few situations (modes) described below. Do not mutate a given model!                                                 |
|    `onChange`     |                                              Field change action. It receive two arguments: key and value, where key is a dot separated path to the changed field and value is a requested value.                                               |
| `onSubmitFailure` |                                                                      Submit failure action. If onSubmit returns a Promise, then this will be attached to its .catch chain.                                                                      |
| `onSubmitSuccess` |                                                                      Submit success action. If onSubmit returns a Promise, then this will be attached to its .then chain.                                                                       |
|    `onSubmit`     |                                                                Submit action. When the form is submitted manually or by a HTML5 event, then it's called with the current model.                                                                 |
|   `placeholder`   |                                                           Default placeholder prop for all fields. By default it's false - set it to true to enable placeholders for the whole form.                                                            |
|     `schema`      |                                                         Form schema. BaseForm doesn't really care about it. It's used for form generation in QuickForm and validation in ValidatedForm.                                                         |
| `showInlineError` |                              Default showInlineError prop for all fields. By default it's false - set it to true to enable inline errors for the whole form. Available in: antd, bootstrap3, bootstrap4, semantic                               |
|       `ref`       |                                                                                                                  Form methods                                                                                                                   |

##### Props usage:

```js
import BaseForm from 'uniforms/BaseForm'; // Or from the theme package.

<BaseForm
  autosaveDelay={0}
  autosave={false}
  disabled={false}
  error={new Error('Nope.')}
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  label={true}
  model={{fieldA: 1}}
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
  onChange={(key, value) => console.log(key, value)}
  onSubmitFailure={() => alert('Promise rejected!')}
  onSubmitSuccess={() => alert('Promise resolved!')}
  onSubmit={model => db.saveThatReturnsPromiseOrNothing(model)}
  placeholder={false}
  schema={myFormSchema}
  showInlineError={true}
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

##### Props:

|     Name      |                                      Description                                      |
| :-----------: | :-----------------------------------------------------------------------------------: |
|  `autoField`  |  Custom AutoField. It should be anything that will pass through React.createElement.  |
| `errorsField` | Custom ErrorsField. It should be anything that will pass through React.createElement. |
| `submitField` | Custom SubmitField. It should be anything that will pass through React.createElement. |

**Note:** All `BaseForm` props are also accepted and all methods are available.

##### Props usage:

```js
import QuickForm from 'uniforms/QuickForm'; // Or from the theme package.

<QuickForm autoField={CustomAutoField} errorsField={CustomErrorsField} submitField={CustomSubmitField} />;
```

## `ValidatedForm`

##### Props:

|     Name     |                                                                                                                      Description                                                                                                                      |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `onValidate` |                                                              Additional asynchronous validation. Schema validation has to be sync, so this is the only way to achieve async validation.                                                               |
|  `validate`  | Validation mode. By default, the form will start to validate from the time of the first submit and then revalidate on every change. It's 'onChangeAfterSubmit'. There are also 'onChange' and 'onSubmit' modes, but those are quite self-explanatory. |
| `validator`  |                                                                        Validator options. It's passed to getValidator of your schema bridge. It really depends on your schema.                                                                        |

**Note:** All `BaseForm` props are also accepted and all methods are available.

##### Props usage:

```js
import ValidatedForm from 'uniforms/ValidatedForm'; // Or from the theme package.

<ValidatedForm
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
  validate="onChangeAfterSubmit"
  validator={{clean: true}}
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

## `ValidatedQuickForm`

**Note:** All `QuickForm` props are also accepted and all methods are available.<br />
**Note:** All `ValidatedForm` props are also accepted and all methods are available.
