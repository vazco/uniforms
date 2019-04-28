---
id: examples
title: Examples
---

## Bridges

### `MyLittleSchema`

**Note:** This is a very basic schema just to show how it works and how you can create your own schema bridges.

```js
import Bridge from 'uniforms/Bridge';

class MyLittleSchema extends Bridge {
  constructor(schema, validator) {
    super();

    this.schema = schema;
    this.validator = validator;
  }

  getError(name, error) {
    return error && error[name];
  }

  getErrorMessage(name, error) {
    return error && error[name];
  }

  getErrorMessages(error) {
    return error ? Object.keys(this.schema).map(field => error[field]) : [];
  }

  getField(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getType(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')].__type__;
  }

  getProps(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getInitialValue(name) {
    return this.schema[name.replace(/\.\d+/g, '.$')].initialValue;
  }

  getSubfields(name) {
    return name
      ? this.schema[name.replace(/\.\d+/g, '.$')].subfields || []
      : Object.keys(this.schema).filter(field => field.indexOf('.') === -1);
  }

  getValidator() {
    return this.validator;
  }
}

// Usage.
const bridge = new MyLittleSchema(
  {
    login: {
      __type__: String,
      required: true,
      initialValue: '',
      label: 'Login'
    },
    password1: {
      __type__: String,
      required: true,
      initialValue: '',
      label: 'Password'
    },
    password2: {
      __type__: String,
      required: true,
      initialValue: '',
      label: 'Password (again)'
    }
  },
  model => {
    const error = {};

    if (!model.login) {
      error.login = 'Login is required!';
    } else if (model.login.length < 5) {
      error.login = 'Login has to be at least 5 characters long!';
    }

    if (!model.password1) {
      error.password1 = 'Password is required!';
    } else if (model.password1.length < 10) {
      error.login = 'Password has to be at least 10 characters long!';
    }

    if (model.password1 !== model.password2) {
      error.password1 = 'Passwords mismatch!';
    }

    if (Object.keys(error).length) {
      throw error;
    }
  }
);

<AutoForm schema={bridge} />;
```

## Fields

### `CompositeField`

```js
import AutoField from 'uniforms/AutoField';
import React from 'react';
import connectField from 'uniforms/connectField';

// This field is a kind of a shortcut for few fields. You can also access all
// field props here, like value or onChange for some extra logic.
const Composite = () => (
  <section>
    <AutoField field="firstName" />
    <AutoField field="lastName" />
    <AutoField field="age" />
  </section>
);

const CompositeField = connectField(Composite);
```

### `CustomAutoField`

These are two _standard_ options to define a custom `AutoField`: either using `connectField` or simply taking the code from the [original one](https://github.com/vazco/uniforms/blob/master/packages/uniforms-unstyled/src/AutoField.js#L14-L47) _(theme doesn't matter)_ and simply apply own components and/or rules to render components. Below an example with `connectField`.

```js
// Remember to choose a correct theme package
import AutoField from 'uniforms-unstyled/AutoField';

const CustomAuto = props => {
  // This way we don't care about unhandled cases - we use default
  // AutoField as a fallback component.
  const Component = determineComponentFromProps(props) || AutoField;

  return <Component {...props} />;
};

const CustomAutoField = connectField(CustomAuto, {
  ensureValue: false,
  includeInChain: false,
  initialValue: false
});

// You can also tell your `AutoForm`/`QuickForm`/`ValidatedQuickForm` to use it.
<AutoForm {...props} autoField={CustomAutoField} />;
```

### `CycleField`

```js
import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';

// This field works as follows: iterate all allowed values and optionally no-value
// state if the field is not required. This one uses Semantic-UI.
const Cycle = ({allowedValues, label, required, value, onChange}) => (
  <a
    className={classnames('ui', !value && 'basic', 'label')}
    onClick={() =>
      onChange(
        value
          ? allowedValues.indexOf(value) === allowedValues.length - 1
            ? required
              ? allowedValues[0]
              : null
            : allowedValues[allowedValues.indexOf(value) + 1]
          : allowedValues[0]
      )
    }
  >
    {value || label}
  </a>
);

const CycleField = connectField(Cycle);
```

### `DisplayIf`

```js
import BaseField from 'uniforms/BaseField';
import nothing from 'uniforms/nothing';
import {Children} from 'react';

// We have to ensure that there's only one child, because returning an array
// from a component is prohibited.
const DisplayIf = ({children, condition}, {uniforms}) => (condition(uniforms) ? Children.only(children) : nothing);
DisplayIf.contextTypes = BaseField.contextTypes;

// Usage.
const ThreeStepForm = ({schema}) => (
  <AutoForm schema={schema}>
    <TextField name="fieldA" />

    <DisplayIf condition={context => context.model.fieldA}>
      <section>
        <TextField name="fieldB" />

        <DisplayIf condition={context => context.model.fieldB}>
          <span>Well done!</span>
        </DisplayIf>
      </section>
    </DisplayIf>
  </AutoForm>
);
```

### `RangeField`

```js
import React from 'react';
import connectField from 'uniforms/connectField';

// This field works as follows: two datepickers are bound to each other. Value is
// a {start, stop} object.
const Range = ({onChange, value: {start, stop}}) => (
  <section>
    <DatePicker max={stop} value={start} onChange={start => onChange(start, stop)} />
    <DatePicker min={start} value={stop} onChange={stop => onChange(start, stop)} />
  </section>
);

const RangeField = connectField(Range);
```

### `RatingField`

```js
import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';

// This field works as follows: render stars for each rating and mark them as
// filled, if rating (value) is greater. This one uses Semantic-UI.
const Rating = ({className, disabled, max = 5, required, value, onChange}) => (
  <section className={classnames('ui', {disabled, required}, className, 'rating')}>
    {[...Array(max)]
      .map((_, index) => index + 1)
      .map(index => (
        <i
          key={index}
          className={classnames(index <= value && 'active', 'icon')}
          onClick={() => disabled || onChange(!required && value === index ? null : index)}
        />
      ))}
  </section>
);

const RatingField = connectField(Rating);
```

### `SubmitButton`

```js
import BaseField from 'uniforms/BaseField';
import React from 'react';

// This field works as follows: render standard submit field and disable it, when
// the form is invalid. It's a simplified version of a default SubmitField from
// uniforms-unstyled.
const SubmitField = (
  props,
  {
    uniforms: {
      error,
      state: {disabled, submitting, validating}
    }
  }
) => <input disabled={!!(error || disabled || submitting || validating)} type="submit" />;

SubmitField.contextTypes = BaseField.contextTypes;
```

### `SwapField`

```js
import BaseField from 'uniforms/BaseField';
import get from 'lodash/get';
import {Children} from 'react';
import {cloneElement} from 'react';

// This field works as follows: on click of its child it swaps values of fieldA
// and fieldB. It's that simple.
const SwapField = ({children, fieldA, fieldB}, {uniforms: {model, onChange}}) =>
  cloneElement(Children.only(children), {
    onClick() {
      const valueA = get(model, fieldA);
      const valueB = get(model, fieldB);

      onChange(fieldA, valueB);
      onChange(fieldB, valueA);
    }
  });

SwapField.contextTypes = BaseField.contextTypes;

// Usage.
function Example() {
  return (
    <section>
      <TextField name="firstName" />
      <SwapField fieldA="firstName" fieldB="lastName">
        <Icon name="refresh" />
      </SwapField>
      <TextField name="lastName" />
    </section>
  );
}
```

## Forms

### `ModifierForm`

```js
import BaseForm from 'uniforms/BaseForm';

// In uniforms, every form is just an injectable set of functionalities. Thus,
// we can live without many higher order components, using composed ones
// instead. If you want to get a deeper dive into it, read the source of
// AutoForm or QuickForm in the core package.
const Modifier = parent =>
  class extends parent {
    // Expose injector.
    //   It's not required, but recommended.
    static Modifier = Modifier;

    // Alter component display name.
    //   It's not required, but recommended.
    static displayName = `Modifier${parent.displayName}`;

    // Here you can override any form methods or create additional ones.
    getModel(mode) {
      if (mode === 'submit') {
        const doc = super.getModel('submit');
        const keys = this.getChildContextSchema().getSubfields();

        const update = keys.filter(key => doc[key] !== undefined);
        const remove = keys.filter(key => doc[key] === undefined);

        // It's a good idea to omit empty modifiers.
        const $set = update.reduce((acc, key) => ({...acc, [key]: doc[key]}), {});
        const $unset = remove.reduce((acc, key) => ({...acc, [key]: ''}), {});

        return {$set, $unset};
      }

      return super.getModel(mode);
    }
  };

// Now we have to inject our functionality. This one is a ModifierForm. Use any
// form component you want.
const ModifierForm = Modifier(BaseForm);
```
