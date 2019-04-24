---
id: api-fields
title: Fields
---

## `AutoField`

```js
import AutoField from 'uniforms-unstyled/AutoField'; // Choose your theme package.

<AutoField
  // Field renderer.
  //   If ommited, then default algorithm is used. Check README for the whole
  //   logic.
  component={MyComponent}

  // All additional props are passed to a computed field component.
/>;
```

**Note:** All `BaseField` props are also accepted.

## `AutoFields`

```js
import AutoFields from 'uniforms-unstyled/AutoFields'; // Choose your theme package.

<AutoFields
  // AutoField component.
  //   By default, it will be your theme AutoField, but you can use your
  //   custom component.
  autoField={MyAutoField}
  // Wrapping element.
  //   It's clear, isn't it?
  element="section"
  // List of fields to render.
  //   By default, all fields are rendered.
  fields={['fieldA', 'fieldB']}
  // List of fields to omit.
  //   By default, it's empty.
  omitFields={['fieldA', 'fieldB']}
/>;
```

**Note:** All `BaseField` props are also accepted.

## `BaseField`

```js
import BaseField from 'uniforms/BaseField';

// You can't really render a BaseField because it doesn't have a render method.
// It's a base class of all packaged fields, so that all props below are available
// to all fields.
<BaseField
  // Field disabled state.
  //   It's passed directly to the field, but it propagates same as the label.
  disabled={false}
  // Field label.
  //   This prop has three modes. If you pass a string, then it will be used
  //   as a label. If you pass a null, then it won't have a label, but nested
  //   fields will have default labels. If you pass a non-null falsy value, it
  //   won't have a label and nested fields won't have labels too.
  label={true}
  // Field name.
  //   Used for identification. It should match your schema - if not, it will
  //   throw an error.
  name="field"
  // Field placeholder.
  //   If set to true, then a label will be used. Otherwise, it's handled like
  //   a label (including propagation).
  placeholder={false}
  // Field value.
  //   Every field accepts its specific value type only.
  value={value}

  // You can pass any prop but remember that passing onChange will "detach"
  // the field from the form in some way - it won't change your form state.
  // Also, passing any already provided prop - like id - will override the
  // default one.
/>;
```

## `BoolField`

```js
import BoolField from 'uniforms-unstyled/BoolField'; // Choose your theme package.

<BoolField
  // Field appearance. Set to "toggle" to appear as a Material Toggle or to
  // "checkbox" (or leave it undefined) to use a Checkbox appearance.
  // Available in:
  //   material
  appearance="toggle" // Renders a material-ui Toggle
  appearance="checkbox" // Renders a material-ui Checkbox
  // Field feedback state.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap4
  feedbackable={true}
  // Field layout.
  //   Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object
  //   is a {mode: size} object. Complete string is simply passed through.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Help text.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  help="Need help?"
  // Help block className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  helpClassName="a b c"
  // Checkbox inline state.
  //   In bootstrap themes, a label is rendered as a text but in inline mode,
  //   it's treated as a field label.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inline={true}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than an HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
  // Left label.
  //   In bootstrap themes, label is rendered on the right side of a checkbox.
  //   This label is rendered above the field.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  labelBefore="Label"
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  showInlineError={true}
  // Field and sourroundings wrap className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  wrapClassName="a b c"
/>;
```

**Note:** All `BaseField` props are also accepted.

## `DateField`

```js
import DateField from 'uniforms-unstyled/DateField'; // Choose your theme package.

<DateField
  // Field feedback state.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap4
  feedbackable={true}
  // Field layout.
  //   Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object
  //   is a {mode: size} object. Complete string is simply passed through.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Help text.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  help="Need help?"
  // Help block className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  helpClassName="a b c"
  // Input icon.
  //   Semantic inputs can have an icon. By default, it's placed on the right
  //   side - to place it on the left, use iconLeft prop instead.
  // Available in:
  //   semantic
  icon="user"
  // Input left icon.
  //   Semantic inputs can have an icon. With this prop, it's placed on the
  //   left side - to place it on the right, use icon prop instead.
  // Available in:
  //   semantic
  iconLeft="user"
  // Input icon props.
  //   Semantic inputs can have an icon. These props are passed directly to
  //   the icon element.
  // Available in:
  //   semantic
  iconProps={{onClick() {}}}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on the field block. This
  //   is used on the direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than an HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
  // Props for the InputLabel
  // Available in:
  //   material-ui
  labelProps={{shrink: true, disableAnimation: true}}
  // Maximum value.
  //   Date object.
  max={new Date(2100, 1, 1)}
  // Minimal value.
  //   Date object.
  min={new Date(2000, 1, 1)}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  //   material
  showInlineError={true}
  // Field and sourroundings wrap className.
  //   In SemanticUI theme, this class name is used on ui input wrapper,
  //   so you can pass classes like small, huge, inverted, transparent etc.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  //   semantic
  wrapClassName="a b c"
  // Display time picker in ampm (12hr) format or 24hr format.
  // Available in:
  //   material
  timeFormat="ampm"
/>;
```

**Note:** All `BaseField` props are also accepted.

## `ErrorField`

```js
import ErrorField from 'uniforms-unstyled/ErrorField'; // Choose your theme package.

<ErrorField
  // Custom content.
  //   By default, it will render a block with the error message (if any), but
  //   you can customize the content.
  children={children}
  // Target field.
  //   This field error should be used.
  name="field"
/>;
```

## `ErrorsField`

```js
import ErrorsField from 'uniforms-unstyled/ErrorsField'; // Choose your theme package.

<ErrorsField
  // Custom content.
  //   By default, it will render a block with the error messages (if any),
  //   but you can customize the content.
  children={children}
/>;
```

## `HiddenField`

```js
import HiddenField from 'uniforms-unstyled/HiddenField'; // Choose your theme package.

<HiddenField
  // Field name.
  //   Used for identification. It should match your schema - if not, it will
  //   throw an error.
  name="field"
  // Field value.
  //   This field has completely different semantics. When a value is set,
  //   then it's updating a current model instead of being passed to the field.
  value={value}
/>;
```

## `ListAddField`

```js
import ListAddField from 'uniforms-unstyled/ListAddField'; // Choose your theme package.

<ListAddField
  // Icon.
  //   By default, glyphicon is used.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  addIcon={<MyAddIcon />}
/>;
```

**Note:** All `BaseField` props are also accepted.<br />
**Note:** This is one of _internal_ components of `ListField`.

## `ListDelField`

```js
import ListDelField from 'uniforms-unstyled/ListDelField'; // Choose your theme package.

<ListDelField
  // Icon.
  //   By default, glyphicon is used.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  removeIcon={<MyRemoveIcon />}
/>;
```

**Note:** All `BaseField` props are also accepted.<br />
**Note:** This is one of _internal_ components of `ListField`.

## `ListField`

```js
import ListField from 'uniforms-unstyled/ListField'; // Choose your theme package.

<ListField
  // Icon.
  //   It's passed to the ListAddField.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  addIcon={<MyAddIcon />}
  // Initial items count.
  //   At least this amount of fields will be rendered at the beginning.
  initialCount={5}
  // ListItemField props.
  //   These props are passed to the ListItemField.
  itemProps={
    {
      /* ... */
    }
  }
  // Icon.
  //   It's passed to the ListDelField.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  removeIcon={<MyRemoveIcon />}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  //   semantic
  showInlineError={true}
/>;
```

**Note:** All `BaseField` props are also accepted.

## `ListItemField`

```js
import ListItemField from 'uniforms-unstyled/ListItemField'; // Choose your theme package.

<ListItemField
  // Icon.
  //   It's passed to the ListDelField.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  removeIcon={<MyRemoveIcon />}
/>;
```

**Note:** All `BaseField` props are also accepted.<br />
**Note:** This is one of _internal_ components of `ListField`.

## `LongTextField`

```js
import LongTextField from 'uniforms-unstyled/LongTextField'; // Choose your theme package.

<LongTextField
  // Field layout.
  //   Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object
  //   is a {mode: size} object. Complete string is simply passed through.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  // Help text.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  help="Need help?"
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Help block className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  helpClassName="a b c"
  // Input icon.
  //   Semantic inputs can have an icon. By default, it's placed on the right
  //   side - to place it on the left, use iconLeft prop instead.
  // Available in:
  //   semantic
  icon="user"
  // Input left icon.
  //   Semantic inputs can have an icon. With this prop, it's placed on the
  //   left side - to place it on the right, use icon prop instead.
  // Available in:
  //   semantic
  iconLeft="user"
  // Input icon props.
  //   Semantic inputs can have an icon. These props are passed directly to
  //   the icon element.
  // Available in:
  //   semantic
  iconProps={{onClick() {}}}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than a HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  //   material
  showInlineError={true}
  // Field and sourroundings wrap className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  wrapClassName="a b c"
/>;
```

**Note:** All `BaseField` props are also accepted.

## `NestField`

```js
import NestField from 'uniforms-unstyled/NestField'; // Choose your theme package.

<NestField
  // Array of rendered fields.
  //   If no custom content provided, only those fields are rendered. By
  //   default, all of nested fields are rendered.
  fields={['fieldA', 'fieldB' /* ... */]}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  showInlineError={true}
  // Add / remove "grouped" class from the field.
  //   In Semantic, fields can be grouped using this class. By default,
  //   this class is added to the NestField.
  // Available in:
  //   semantic
  grouped={true}
/>;
```

**Note:** All `BaseField` props are also accepted.

## `NumField`

```js
import NumField from 'uniforms-unstyled/NumField'; // Choose your theme package.

<NumField
  // Decimal mode.
  //   This will change value step from 1 to 0.01.
  decimal={true}
  // Field layout.
  //   Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object
  //   is a {mode: size} object. Complete string is simply passed through.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Help text.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  help="Need help?"
  // Help block className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  helpClassName="a b c"
  // Input icon.
  //   Semantic inputs can have an icon. By default, it's placed on the right
  //   side - to place it on the left, use iconLeft prop instead.
  // Available in:
  //   semantic
  icon="user"
  // Input left icon.
  //   Semantic inputs can have an icon. With this prop, it's placed on the
  //   left side - to place it on the right, use icon prop instead.
  // Available in:
  //   semantic
  iconLeft="user"
  // Input icon props.
  //   Semantic inputs can have an icon. These props are passed directly to
  //   the icon element.
  // Available in:
  //   semantic
  iconProps={{onClick() {}}}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than a HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
  // Maximum value.
  max={100}
  // Minimum value.
  min={10}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   material
  //   semantic
  showInlineError={true}
  // Input step.
  step={5}
  // Field and sourroundings wrap className.
  //   In SemanticUI theme, this class name is used on ui input wrapper,
  //   so you can pass variations like small, huge, inverted, transparent etc.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  //   semantic
  wrapClassName="a b c"
/>;
```

**Note:** All `BaseField` props are also accepted.

## `RadioField`

```js
import RadioField from 'uniforms-unstyled/RadioField'; // Choose your theme package.

<RadioField
  // Array of allowed values.
  //   By default, those are extracted from your schema.
  allowedValues={[value1, value2 /* ... */]}
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Checkbox inline state.
  //   In bootstrap themes, label is rendered as a text, but in inline mode,
  //   it's treated as a field label.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inline={true}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  showInlineError={true}
  // Label transform.
  //   Allows to transform the each value into a human-readable label
  transform={value => label}
/>;
```

**Note:** All `BaseField` props are also accepted.

## `SelectField`

```js
import SelectField from 'uniforms-unstyled/SelectField'; // Choose your theme package.

<SelectField
  // Array of allowed values.
  //   By default, those are extracted from your schema.
  allowedValues={[value1, value2 /* ... */]}
  // Turn on checkbox/radio mode.
  //   It's always true in mutltiple (i.e. fieldType === Array) mode.
  checkboxes={true}
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Checkbox inline state.
  //   In bootstrap themes, label is rendered as a text, but in inline mode,
  //   it's treated as a field label.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inline={true}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than a HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
  // Props for the InputLabel
  // Available in:
  //   material-ui
  labelProps={{shrink: true, disableAnimation: true}}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   semantic
  showInlineError={true}
  // Label transform.
  //   Allows to transform the each value into a human-readable label
  transform={value => label} //   Set of values that will be shown in the select.
  // Options.
  //   It is optional and using `options` will override `transform` and `allowedValues`.
  //   It can be either an object or an array (or a function, that returns it).
  options={[{label: 'Hi', value: value1}, {label: 'Hello', value: value1} /* ... */]}
/>;
```

**Note:** All `BaseField` props are also accepted.

## `SubmitField`

```js
import SubmitField from 'uniforms-unstyled/SubmitField'; // Choose your theme package.

<SubmitField
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than a HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
/>;
```

## `TextField`

```js
import TextField from 'uniforms-unstyled/TextField'; // Choose your theme package.

<TextField
  // Field layout.
  //   Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object
  //   is a {mode: size} object. Complete string is simply passed through.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  // Field layout
  //  The layout of label. You can set span and/or offset.
  // Available in:
  //   antd
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  // Field layout
  //   The layout for input controls. Same as labelCol
  // Available in:
  //   antd
  wrapperCol={{span: 4}} // 'ant-col-4' on field
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  // Help text.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  help="Need help?"
  // Help block className.
  //   *Some description would be great, huh?*
  // Available in:
  //   bootstrap3
  //   bootstrap4
  helpClassName="a b c"
  // Input icon.
  //   Semantic inputs can have an icon. By default, it's placed on the right
  //   side - to place it on the left, use iconLeft prop instead.
  // Available in:
  //   semantic
  icon="user"
  // Input left icon.
  //   Semantic inputs can have an icon. With this prop, it's placed on the
  //   left side - to place it on the right, use icon prop instead.
  // Available in:
  //   semantic
  iconLeft="user"
  // Input icon props.
  //   Semantic inputs can have an icon. These props are passed directly to
  //   the icon element.
  // Available in:
  //   semantic
  iconProps={{onClick() {}}}
  // Input wrapper class name.
  //   In bootstrap themes, passed className is used on field block. This is
  //   used on direct field wrapper.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  inputClassName="a b c"
  // Input ref.
  //   Setting ref prop to a field won't work as desired, because you'll
  //   receive a field component rather than a HTML input. If you need an input ref,
  //   use this prop instead.
  inputRef={ref => {}}
  // Field inline error.
  //   *Some description would be great, huh?*
  // Available in:
  //   antd
  //   bootstrap3
  //   bootstrap4
  //   material
  //   semantic
  showInlineError={true}
  // Input type.
  //   HTML compatible input type like password. Default is text.
  type="password"
  // Field and sourroundings wrap className.
  //   In SemanticUI theme, this class name is used on ui input wrapper,
  //   so you can pass variations like small, huge, inverted, transparent etc.
  // Available in:
  //   bootstrap3
  //   bootstrap4
  //   semantic
  wrapClassName="a b c"
/>;
```

**Note:** All `BaseField` props are also accepted.
