**Note:** This page is incomplete. For more, please refer to `index.js` of each package - you can find there all exported components and helpers. Also, go ahead and take a look on tests and source - it's not well documented but readable.

<br>

- [Fields](#fields)
    - [`AutoField`](#autofield)
    - [`AutoFields`](#autofields)
    - [`BoolField`](#boolfield)
    - [`DateField`](#datefield)
    - [`ErrorField`](#errorfield)
    - [`ErrorsField`](#errorsfield)
    - [`HiddenField`](#hiddenfield)
    - [`ListAddField`](#listaddfield)
    - [`ListDelField`](#listdelfield)
    - [`ListField`](#listfield)
    - [`ListItemField`](#listitemfield)
    - [`LongTextField`](#longtextfield)
    - [`NestField`](#nestfield)
    - [`NumField`](#numfield)
    - [`RadioField`](#radiofield)
    - [`SelectField`](#selectfield)
    - [`SubmitField`](#submitfield)
    - [`TextField`](#textfield)
- [Forms](#forms)
    - [`AutoForm`](#autoform)
    - [`BaseForm`](#baseform)
    - [`QuickForm`](#quickform)
    - [`ValidatedForm`](#validatedform)
    - [`ValidatedQuickForm`](#validatedquickform)
- [Helpers](#helpers)
    - [`changedKeys`](#changedkeys)
    - [`connectField`](#connectfield)
    - [`filterDOMProps`](#filterdomprops)
    - [`filterDOMProps.register`](#filterdompropsregister)
    - [`filterDOMProps.registered`](#filterdompropsregistered)
    - [`injectName`](#injectname)
    - [`joinName`](#joinname)
    - [`nothing`](#nothing)
    - [`randomIds`](#randomids)

<br>

# Fields

## `AutoField`
## `AutoFields`
## `BoolField`
## `DateField`
## `ErrorField`
## `ErrorsField`
## `HiddenField`
## `ListAddField`
## `ListDelField`
## `ListField`
## `ListItemField`
## `LongTextField`
## `NestField`
## `NumField`
## `RadioField`
## `SelectField`
## `SubmitField`
## `TextField`

# Forms

## `AutoForm`

```js
import {AutoForm} from 'uniforms'; // Or from the theme package.

<AutoForm
    // Like onChange but for the whole model.
    //   Triggered just after onChange but with the next model instead of
    //   (key, value) pair.
    onChangeModel={model => console.log(model)}
/>
```

**Note:** All `ValidatedQuickForm` props and methods are also accepted.

## `BaseForm`

```js
import {BaseForm} from 'uniforms'; // Or from the theme package.

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
    // Available only in:
    //   Bootstrap3
    //   Bootstrap4
    grid={3}        // 'col-3-sm' on label, 'col-9-sm' on input
    grid="4"        // 'col-4-sm' on label, 'col-8-sm' on input
    grid={{md: 5}}  // 'col-5-md' on label, 'col-7-md' on input
    grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input

    // Default label prop for all fields.
    //   By default it's true - set it to false to disable labels for the whole
    //   form.
    label={true}

    // Form model.
    //   An object with {field: value} structure. It doesn't matter, if it has a
    //   prototype or not, but keep in mind that in onSubmit or in onChangeModel
    //   you'll receive a plain object. If you'll treat form as an input, then
    //   this is value.
    model={{fieldA: 1}}

    // Field change action.
    //   It receive two arguments: key and value, where key is a dot separated
    //   path to the changed field and value is the requested value.
    onChange={(key, value) => console.log(key, value)}

    // Submit failure action.
    //   If onSubmit will return a Promise, then this will be attached to it's
    //   .catch chain.
    onSubmitFailure={() => alert('Promise rejected!')}

    // Submit success action.
    //   If onSubmit will return a Promise, then this will be attached to it's
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
/>
```

## `QuickForm`

```js
import {QuickForm} from 'uniforms'; // Or from the theme package.

<QuickForm
    // Custom AutoField.
    //   It should be anything, that will pass through React.createElement.
    autoField={CustomAutoField}

    // Custom ErrorsField.
    //   It should be anything, that will pass through React.createElement.
    errorsField={CustomErrorsField}

    // Custom SubmitField.
    //   It should be anything, that will pass through React.createElement.
    submitField={CustomSubmitField}
/>
```

**Note:** All `BaseForm` props and methods are also accepted.

## `ValidatedForm`

```js
import {ValidatedForm} from 'uniforms'; // Or from the theme package.

<ValidatedForm
    // Additional asynchronous validation.
    //   Schema validation have to be sync, so this is the only way to achieve
    //   async validation.
    onValidate={(model, error, callback) => {
        // You can either ignore validation error...
        if (omitValidation(model)) {
            return callback(null);
        }

        // ... or any additional validation if an error is already there...
        if (error) {
            return callback();
        }

        // ... or feed it with another error.
        MyAPI.validate(model, error => callback(error || null));
    }}

    // Validation mode.
    //   By default, form will start to validate from the time of the first
    //   submit and then revalidate on every change. It's 'onChangeAfterSubmit'.
    //   There's also 'onChange' and 'onSubmit' modes, but those are quite
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
        //   You can use it to check, if the given value will pass the
        //   validation or not. Returns validation Promise, as described above.
        form.validate(key, value);

        // Validate form with the given model.
        //   Rather internal function. Returns validation Promise, as described
        //   above.
        form.validateModel(model);
    }}
/>
```

**Note:** All `BaseForm` props and methods are also accepted.

## `ValidatedQuickForm`

**Note:** All `QuickForm` props and methods are also accepted.<br>
**Note:** All `ValidatedForm` props and methods are also accepted.

<br>

# Helpers

## `changedKeys`

```js
import {changedKeys} from 'uniforms';

// Returns array of changed keys between valueA and valueB, where root is the
// root key.
const arrayOfChangedKeys = changedKeys(root, valueA, valueB);
```

**Note:** For more examples, see [`changedKeys` tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/test/helpers/changedKeys.js).

## `connectField`

```js
import {connectField} from 'uniforms';

const ComponentXField = connectField(ComponentX, {
    // Props mapper
    //   Useful for integration with third-party components. For example, you
    //   can rename specific props instead of doing mapping by hand in the
    //   component.
    mapProps = props => props,

    // Base field class
    //   It's reserved for the future - right now there's no useful usecase.
    baseField = BaseField,

    // <input> helper
    //   In React, <input> can't have undefined or null value and any onChange
    //   at once - this option fallback undefined value to ''.
    ensureValue = true,

    // Initial value check
    //   If truthy, then after the first render defaultValue is set as value if
    //   no value is provided (undefined).
    initialValue = true,

    // Additional parent prop
    //   If truthy, additional parent prop is provided (if any). Useful for
    //   nested or complex fields.
    includeParent = false,

    // Field name chain visibility
    //   If truthy, then every nested field name will be prefixed with parent
    //   name.
    includeInChain = true
});
```

## `filterDOMProps`

```js
import {filterDOMProps} from 'uniforms';

// If you create your custom field, then it's a safe way to get rid of all
// uniforms-related props.
const nonUniformsProps = filterDOMProps(props);
```

## `filterDOMProps.register`

```js
// If you want to filter additional props, then you have to register it.
filterDOMProps.register(propA, propB, propC, ...);
```

## `filterDOMProps.registered`

```js
// Array of already registered props.
filterDOMProps.registered; // ['propA', 'propB', ...]
```

## `injectName`

```js
import {injectName} from 'uniforms';

// It's rather internal helper, but it's still exported. Injects name to all
// already rendered fields.
const componentWithInjectedName = injectName(name, component);
```

## `joinName`

```js
import {joinName} from 'uniforms';

// Use it to safely join partial field names. If you create custom field with
// subfields, then it's better to use this helper.
const joinedNameString = joinName(nameA, nameB, nameC, ...);

// If you want to have a "raw" version of a name, then pass null as a first
// param.
const joinedNameArray = joinName(null, nameA, nameB, nameC, ...);
```

## `nothing`

```js
import {nothing} from 'uniforms';

// In React@0.14 you can't return null from functional component, but in
// React@15 you should use null - nothing is a "safe null". Basically it's a
// <noscript /> in @0.14 and null in @15.
const emptyJSX = () => nothing;
```

## `randomIds`

```js
import {randomIds} from 'uniforms';

// It's rather an internal helper, but it's still exported. Use it, if you want
// to have some random but deterministic strings.
const predictableRandomIdGenerator = randomIds(prefix);
const predictableRandomIdA = safeRandomIdGenerator();
const predictableRandomIdB = safeRandomIdGenerator();
const predictableRandomIdC = safeRandomIdGenerator();
// ...
```
