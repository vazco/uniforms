<p align="center">
    <a href="http://unicms.io">
        <img src="http://unicms.io/banners/standalone.png" height="300">
    </a>
</p>

<p align="center">
    <a href="#">
        <img src="https://img.shields.io/github/license/vazco/uniforms.svg?maxAge=86400" alt="license">
    </a>

    <a href="https://npmjs.org/package/uniforms">
        <img src="https://img.shields.io/npm/v/uniforms.svg?maxAge=86400" alt="npm version">
    </a>

    <a href="#">
        <img src="https://img.shields.io/codeship/fe6eb2a0-f8df-0133-0060-4e010acc8333/master.svg?maxAge=86400" alt="build status">
    </a>
</p>

# uniforms

This is a set of npm packages designed for Meteor (but completely independent!), which contains helpers and [`React`](https://facebook.github.io/react/) components - both unstyled and stylised with the Bootstrap3, Bootstrap4 and Semantic UI - to easily create, generate and validate forms using [`SimpleSchema`](https://github.com/aldeed/meteor-simple-schema), or your custom schemas.

**Note:** Following examples are heavily based on `SimpleSchema`, but it's not mandatory and you can easily [use different schemas](#custom-schema).

## Installation - npm

```shell
# Components (pick one)
$ npm install --save react uniforms uniforms-bootstrap3
$ npm install --save react uniforms uniforms-bootstrap4
$ npm install --save react uniforms uniforms-semantic
$ npm install --save react uniforms uniforms-unstyled
```

## Installation - Meteor

These are npm packages, so they can't imply any Meteor package, and you have to install dependencies manually, in your Meteor app directory:

```shell
# If you are using SimpleSchema
$ meteor add aldeed:simple-schema check

# Components (pick one)
$ meteor npm install --save react uniforms uniforms-bootstrap3
$ meteor npm install --save react uniforms uniforms-bootstrap4
$ meteor npm install --save react uniforms uniforms-semantic
$ meteor npm install --save react uniforms uniforms-unstyled
```

## Basic usage

Firstly, write your schemas:

```js
// Using SimpleSchema
const PersonSchema = new SimpleSchema({
    name: {
        type: String,
        min: 3,
        max: 50
    },

    age: {
        type: Number,
        min: 0,
        max: 150
    }
});

const PostSchema = new SimpleSchema({
    category: {
        type: String,
        allowedValues: [
            "news",
            "image",
            "video"
        ]
    },

    authors: {
        type: [PersonSchema],
        minCount: 1,
        maxCount: 3
    },

    publishedDate: {
        type: Date
    },

    published: {
        type: Boolean,
        optional: true
    }
});

// More about custom schemas below
```

Then, import all needed components:

```js
// Replace 'uniforms-semantic' with other components set, if needed
import {AutoForm}  from 'uniforms-semantic';
import {AutoField} from 'uniforms-semantic';
```

And use them:

```js
// These are equivalent:

const FullAutoForm = () =>
    <AutoForm schema={PostSchema} onSubmit={doc => console.log(doc)} />
;

const SemiAutoForm = () =>
    <AutoForm schema={PostSchema} onSubmit={doc => console.log(doc)}>
        <AutoField name="category" />
        <AutoField name="authors" />
        <AutoField name="publishedDate" />
        <AutoField name="published" />
        <ErrorsField />
        <SubmitField />
    </AutoForm>
;

const ExplicitAutoForm = () =>
    <AutoForm schema={PostSchema} onSubmit={doc => console.log(doc)}>
        <SelectField name="category" />
        <ListField name="authors">
            <ListItemField name="$">
                <NestField>
                    <TextField name="name" />
                    <NumField  name="age" />
                </NestField>
            </ListItemField>
        </ListField>
        <DateField name="publishedDate" />
        <BoolField name="published" />
        <ErrorsField />
        <SubmitField />
    </AutoForm>
;
```

## API

### Fields and related components

| Component       | Description                                                     | Prerequisites            |
|:---------------:|:---------------------------------------------------------------:|:------------------------:|
| `AutoField`     | Automatically renders a correct field, based on field's `type`. | *none*                   |
| `AutoFields`    | Render `fields` without `omitFields` (given in `props`).        | *none*                   |
| `BoolField`     | Checkbox.                                                       | `type: Boolean`          |
| `DateField`     | HTML5 `date-localtime` input.                                   | `type: Date`             |
| `ErrorField`    | Error message for given field.                                  | *none*                   |
| `ErrorsField`   | Error message with a given error or list of validation errors.  | *none*                   |
| `ListAddField`  | "+" with action to add list item.                               | child of `ListField`     |
| `ListDelField`  | "-" with action to remove list item.                            | child of `ListFieldItem` |
| `ListField`     | List of repeated nested fields.                                 | `type: Array`            |
| `ListItemField` | Single nested field.                                            | child of `ListField`     |
| `LongTextField` | Textarea.                                                       | `type: String`           |
| `NestField`     | Block of nested fields.                                         | `type: Object`           |
| `NumField`      | Numeric input.                                                  | `type: Number`           |
| `RadioField`    | Radio checkbox.                                                 | `allowedValues`          |
| `SelectField`   | Select.                                                         | `allowedValues`          |
| `SubmitField`   | Submit button.                                                  | *none*                   |
| `TextField`     | Text (or any HTML5 compatible) input.                           | `type: String`           |

**Note:** You can pass `component` prop to `AutoField` to bypass field guessing algorithm.

### Custom field component

To create custom field component, you can use dedicated `connectField` helper.

```js
import {connectField} from 'uniforms';

const MyText = props =>
    <input type="text"
           value={props.value}
           onChange={event => props.onChange(event.target.value)}
    />
;

export default connectField(MyText, {
    mapProps: x => x,     // Map field props. Useful to prepare different
                          // props set for external components.
                          // Example:
                          //     mapProps: props => ({...props, change: props.onChange})

    baseField: BaseField, // connectField returns create HOC inherited from baseField class.

    initialValue: true,   // Pass true, to set initial value, when it is not defined.
    includeParent: false, // Pass true, to receive parent props.
    includeInChain: true  // Pass true, to stay visible, in nested fields.
});
```

### Custom schema

To use different schemas, you have to create a *bridge* - unified schema mapper. *Bridge* is (preferably) a subclass of `Bridge`, implementing static `check(schema)` and these instance methods:

- `getError(name, error)`
- `getErrorMessage(name, error)`
- `getErrorMessages(error)`
- `getField(name)`
- `getInitialValue(name, props)`
- `getProps(name, props)`
- `getSubfields(name)`
- `getType(name)`
- `getValidator(options)`

Currently built-in bridges:

- SimpleSchema

**Note:** Further information in [`Bridge.js`](https://github.com/vazco/uniforms/blob/master/packages/uniforms/src/bridges/Bridge.js).

### Custom component in SimpleSchema

**Note:** remember to import `uniforms` packages first.

```js
const PersonSchema = new SimpleSchema({
    // ...

    aboutMe: {
        type: String,
        uniforms: MyText       // Component, or...
        uniforms: {            // ... object ...
            component: MyText, // ... with component ...
            prop1: 1           // ... and extra props.
        }
    }
});
```

### Field props

**Note:** These are **not** only props, that field will receive - these are guaranteed by `uniforms`.

| Name           | Type                  | Description                            |
|:--------------:|:---------------------:|:--------------------------------------:|
| `changed`      | `bool`                | Has field changed?                     |
| `disabled`     | `bool`                | Is field disabled?                     |
| `error`        | `object`              | Field scoped part of validation error. |
| `errorMessage` | `string`              | Field scoped validation error message. |
| `field`        | `object`              | Field definition from schema.          |
| `fields`       | `arrayOf(string)`     | Subfields names.                       |
| `findError`    | `func(name)`          | Request another field error.           |
| `findField`    | `func(name)`          | Request another field field.           |
| `findValue`    | `func(name)`          | Request another field value.           |
| `id`           | `string`              | Field id - given or random.            |
| `label`        | `string`              | Field label.                           |
| `name`         | `string`              | Field name.                            |
| `onChange`     | `func(value, [name])` | Change field value.                    |
| `parent`       | `object`              | Parent field props.                    |
| `placeholder`  | `string`              | Field placeholder.                     |
| `type`         | `func`                | Field type.                            |
| `value`        | `any`                 | Field value.                           |

`TextField` can be any HTML5 compatible input with `type` prop. For example:

```js
<TextField type="password" /> // html password field
<TextField type="color" />    // html5 color picker
<TextField type="tel" />      // html5 phone input
```

Every prop can be overridden, but `label`, `placeholder` and `disabled` have special semantics:

```js
<TextField />                    // default label | no      placeholder
<TextField label="Text" />       // custom  label | no      placeholder
<TextField label={false} />      // no      label | no      placeholder
<TextField placeholder />        // default label | default placeholder
<TextField placeholder="Text" /> // default label | custom  placeholder

<ListField name="authors" disabled>   // Additions are disabled...
    <ListItemField name="$" disabled> // deletion too...
        <NestField disabled={false}>  // but editing is not.
            <TextField name="name" />
            <NumField  name="age" />
        </NestField>
    </ListItemField>
</ListField>
```

**Note:** `label`, `placeholder` and `disabled` are passed to nested fields (`label` and `placeholder` are casted to `Boolean`).

### Custom `BaseField` subclass

`BaseField` inherits from `React.Component`, and provides a few overridable methods:

- `getChildContextName()`
- `getChildContextError()`
- `getChildContextModel()`
- `getChildContextState()`
- `getChildContextSchema()`
- `getChildContextOnChange()`
- `getFieldProps(name, {explicitDefaultValue, includeParent})`

### Forms components

![](README.png)

<br />

| Component            | Generated? | Validated? | Self-managed? |
|:--------------------:|:----------:|:----------:|:-------------:|
| `AutoForm`           | ✔          | ✔         | ✔             |
| `BaseForm`           | ✘          | ✘         | ✘             |
| `QuickForm`          | ✔          | ✘         | ✘             |
| `ValidatedForm`      | ✘          | ✔         | ✘             |
| `ValidatedQuickForm` | ✔          | ✔         | ✘             |

### Asynchronous validation

`ValidatedForm` (and inherited ones) have an `onValidate` prop. It can be used to create an asynchronous validation:

```js
const onValidate = (model, error, callback) => {
    // You can pass additional validation if an error is already there
    if (error) {
        return callback();
    }

    MyAPI.checkIfIsUnique(model, errorCompatibileWithUsedSchema => {
        if (errorCompatibileWithUsedSchema) {
            callback(errorCompatibileWithUsedSchema);
        } else {
             // Use default validation error
            callback();

            // Ignore validation error
            callback(null);
        }
    });
};

// Later...

<ValidatedForm {...props} onValidate={onValidate} />
```

### Custom form component

Every form component inherits from `BaseForm` which is subclass of `React.Component`, and provides a few overridable methods:

- `getChangedKeys(root, valueA, valueB)`
- `getChildContextError()`
- `getChildContextModel()`
- `getChildContextName()`
- `getChildContextOnChange()`
- `getChildContextSchema()`
- `getChildContextState()`
- `getModel()`
- `getNativeFormProps()`
- `onChange(key, value)`
- `onSubmit(event)`

Additionally, `QuickForm` provides:

- `getAutoField()`
- `getErrorsField()`
- `getSubmitField()`

Additionally, `ValidatedForm` provides:

- `validate(key, value)`
- `validateModel(model)`

### Context data

Some components - submit button, etc. - might need to know about form state. All form data are passed as `uniforms` in [`React`'s `context`](https://facebook.github.io/react/docs/context.html).

```js
const MyComponent = (props, context) =>
    <p>Form has {context.uniforms.error ? 'error' : 'no errors'}.</p>
;

MyComponent.contextTypes = {
    uniforms: PropTypes.shape({
        error:  PropTypes.object,
        model:  PropTypes.object.isRequired,
        state:  PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,

        onChange: PropTypes.func.isRequired,

        name: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};
```

**Note:** What's more in context? Discover it in [`BaseForm.js`](https://github.com/vazco/uniforms/blob/master/packages/uniforms/src/components/forms/BaseForm.js).

### [Contributing](https://github.com/vazco/uniforms/blob/master/CONTRIBUTING.md)

### Copyright and license

Code and documentation &copy; 2016 [Vazco.eu](http://vazco.eu)
Released under the MIT license.

This package is part of [Universe](http://unicms.io), a package ecosystem based on [Meteor platform](http://meteor.com) maintained by [Vazco](http://www.vazco.eu).
It works as standalone Meteor package, but you can get much more features when using the whole system.
