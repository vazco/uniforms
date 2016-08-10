<p align="center">
    <a href="http://unicms.io">
        <img src="http://unicms.io/banners/standalone.png" height="300">
    </a>

    <br>

    <a href="https://coveralls.io/github/vazco/uniforms">
        <img src="https://img.shields.io/coveralls/vazco/uniforms.svg?maxAge=86400" alt="Coverage">
    </a>

    <a href="https://npmjs.org/package/uniforms">
        <img src="https://img.shields.io/npm/v/uniforms.svg?maxAge=86400" alt="Version">
    </a>

    <a href="https://travis-ci.org/vazco/uniforms">
        <img src="https://img.shields.io/travis/vazco/uniforms.svg?maxAge=86400" alt="Status">
    </a>
</p>

# uniforms

In short: uniforms is a set of npm packages, which contains helpers and [React](https://facebook.github.io/react/) components - both unstyled and themed with [Bootstrap3](http://getbootstrap.com/), [Bootstrap4](http://v4-alpha.getbootstrap.com/) and [Semantic UI](http://semantic-ui.com/) - to easily manage, validate and even generate fully featured forms from your schemas.

<br>

# Installation

**Note:** If you are going to use a themed package - remember to include correct styles!

## meteor

These are npm packages, so they can't imply any Meteor package, and you have to install dependencies manually. In your Meteor app directory:

```shell
# If you are going to use SimpleSchema
$ meteor add aldeed:simple-schema check

# Components (pick one)
$ meteor npm install --save react react-dom uniforms uniforms-bootstrap3
$ meteor npm install --save react react-dom uniforms uniforms-bootstrap4
$ meteor npm install --save react react-dom uniforms uniforms-semantic
$ meteor npm install --save react react-dom uniforms uniforms-unstyled
```

## npm

```shell
# Components (pick one)
$ npm install --save react react-dom uniforms uniforms-bootstrap3
$ npm install --save react react-dom uniforms uniforms-bootstrap4
$ npm install --save react react-dom uniforms uniforms-semantic
$ npm install --save react react-dom uniforms uniforms-unstyled
```

<br>

# Quick start

**Note:** The following examples are designed to work out of box in meteor with `SimpleSchema` (a very common schema in meteor community), but it's not mandatory and you can easily use it without meteor and with different schemas (see: [Custom Schema](#custom-schema)).

Let's start with defining an example schema:

```js
import {SimpleSchema} from 'aldeed:simple-schema';

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
```

Then use it in your form:

```js
// Remember to choose correct theme package
import {AutoForm} from 'uniforms-semantic';

const PostCreateForm = () =>
    <AutoForm schema={PostSchema} onSubmit={doc => console.log(doc)} />
;

const PostUpdateForm = ({model}) =>
    <AutoForm schema={PostSchema} onSubmit={doc => console.log(doc)} model={model} />
;
```

That's all! `AutoForm` will generate complete form with labeled fields, an errors list (if any) and a submit button. Also, it will take care of validation and handling model changes.

<br>

# Overview

**Note:** For a full description of components and their props - see [API](#api).

### Forms components

Most of time you'll be using either `AutoForm` or `ValidatedForm`, but there are also other form components (rather low-level ones) with different capabilities.

| Component            | Self-generated? | Self-managed? | Self-validated? |
|:--------------------:|:---------------:|:-------------:|:---------------:|
| `AutoForm`           | ✔               | ✔             | ✔               |
| `BaseForm`           | ✘               | ✘             | ✘               |
| `QuickForm`          | ✔               | ✘             | ✘               |
| `ValidatedForm`      | ✘               | ✘             | ✔               |
| `ValidatedQuickForm` | ✔               | ✘             | ✔               |

## Fields components

This is a guaranteed set of fields - every theme package will implement these, but also can provide additional ones.

| Component       | Description                                     |
|:---------------:|:-----------------------------------------------:|
| `AutoField`     | Automatically renders given field.              |
| `AutoFields`    | Automatically renders given fields.             |
| `BoolField`     | Checkbox.                                       |
| `DateField`     | HTML5 `date-localtime` input.                   |
| `ErrorField`    | Error message for given field.                  |
| `ErrorsField`   | Error message with a list of validation errors. |
| `HiddenField`   | Hidden field (with possibility to omit in DOM). |
| `ListAddField`  | An icon with action to add list item.           |
| `ListDelField`  | An icon with action to remove list item.        |
| `ListField`     | List of nested fields.                          |
| `ListItemField` | Single list item wrapper.                       |
| `LongTextField` | Textarea.                                       |
| `NestField`     | Block of nested fields.                         |
| `NumField`      | Numeric input.                                  |
| `RadioField`    | Radio checkbox.                                 |
| `SelectField`   | Select (or set of radio checkboxes).            |
| `SubmitField`   | Submit button.                                  |
| `TextField`     | Text (or any HTML5 compatible) input.           |
