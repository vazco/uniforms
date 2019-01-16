# Table of Contents

- [Fields](#fields)
    - [`AutoField`](#autofield)
    - [`AutoFields`](#autofields)
    - [`BaseField`](#basefield)
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
- [Schemas](#schemas)
    - [`Bridge`](#bridge)
    - [`GraphQLBridge`](#graphqlbridge)
    - [`SimpleSchemaBridge`](#simpleschemabridge)
    - [`SimpleSchema2Bridge`](#simpleschema2bridge)
    - [`createSchemaBridge`](#createschemabridge)

<br>

# Fields

## `AutoField`

```js
import AutoField from 'uniforms-unstyled/AutoField'; // Choose your theme package.

<AutoField
    // Field renderer.
    //   If ommited, then default algorithm is used. Check README for the whole
    //   logic.
    component={MyComponent}

    // All additional props are passed to a computed field component.
/>
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
/>
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
    value={/* accepted value */}

    // You can pass any prop but remember that passing onChange will "detach"
    // the field from the form in some way - it won't change your form state.
    // Also, passing any already provided prop - like id - will override the
    // default one.
/>
```

## `BoolField`

```js
import BoolField from 'uniforms-unstyled/BoolField'; // Choose your theme package.

<BoolField
    // Field appearance. Set to "toggle" to appear as a Material Toggle or to
    // "checkbox" (or leave it undefined) to use a Checkbox appearance.
    // Available in:
    //   material
    appearance="toggle"   // Renders a material-ui Toggle
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
    grid={3}        // 'col-3-sm' on label, 'col-9-sm' on input
    grid="4"        // 'col-4-sm' on label, 'col-8-sm' on input
    grid={{md: 5}}  // 'col-5-md' on label, 'col-7-md' on input
    grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input

    // Field layout
    //  The layout of label. You can set span and/or offset.
    // Available in:
    //   antd
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
/>
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
    grid={3}        // 'col-3-sm' on label, 'col-9-sm' on input
    grid="4"        // 'col-4-sm' on label, 'col-8-sm' on input
    grid={{md: 5}}  // 'col-5-md' on label, 'col-7-md' on input
    grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input

    // Field layout
    //  The layout of label. You can set span and/or offset.
    // Available in:
    //   antd
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
    iconProps={{onClick () {}}}

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
    labelProps={{ shrink: true, disableAnimation: true }}

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
/>
```

**Note:** All `BaseField` props are also accepted.

## `ErrorField`

```js
import ErrorField from 'uniforms-unstyled/ErrorField'; // Choose your theme package.

<ErrorField
    // Custom content.
    //   By default, it will render a block with the error message (if any), but
    //   you can customize the content.
    children={/* ... */}

    // Target field.
    //   This field error should be used.
    name="field"
/>
```

## `ErrorsField`

```js
import ErrorsField from 'uniforms-unstyled/ErrorsField'; // Choose your theme package.

<ErrorsField
    // Custom content.
    //   By default, it will render a block with the error messages (if any),
    //   but you can customize the content.
    children={/* ... */}
/>
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
    value={/* ... */}
/>
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
/>
```

**Note:** All `BaseField` props are also accepted.<br>
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
/>
```

**Note:** All `BaseField` props are also accepted.<br>
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
    itemProps={{/* ... /*}}

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
/>
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
/>
```

**Note:** All `BaseField` props are also accepted.<br>
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
    grid={3}        // 'col-3-sm' on label, 'col-9-sm' on input
    grid="4"        // 'col-4-sm' on label, 'col-8-sm' on input
    grid={{md: 5}}  // 'col-5-md' on label, 'col-7-md' on input
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
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
    iconProps={{onClick () {}}}

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
/>
```

**Note:** All `BaseField` props are also accepted.

## `NestField`

```js
import NestField from 'uniforms-unstyled/NestField'; // Choose your theme package.

<NestField
    // Array of rendered fields.
    //   If no custom content provided, only those fields are rendered. By
    //   default, all of nested fields are rendered.
    fields={['fieldA', 'fieldB', ...]}

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
/>
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
    grid={3}        // 'col-3-sm' on label, 'col-9-sm' on input
    grid="4"        // 'col-4-sm' on label, 'col-8-sm' on input
    grid={{md: 5}}  // 'col-5-md' on label, 'col-7-md' on input
    grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input

    // Field layout
    //  The layout of label. You can set span and/or offset.
    // Available in:
    //   antd
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
    iconProps={{onClick () {}}}

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
/>
```

**Note:** All `BaseField` props are also accepted.

## `RadioField`

```js
import RadioField from 'uniforms-unstyled/RadioField'; // Choose your theme package.

<RadioField
    // Array of allowed values.
    //   By default, those are extracted from your schema.
    allowedValues={[value1, value2, ...]}

    // Field layout
    //  The layout of label. You can set span and/or offset.
    // Available in:
    //   antd
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
/>
```

**Note:** All `BaseField` props are also accepted.

## `SelectField`

```js
import SelectField from 'uniforms-unstyled/SelectField'; // Choose your theme package.

<SelectField
    // Array of allowed values.
    //   By default, those are extracted from your schema.
    allowedValues={[value1, value2, ...]}

    // Turn on checkbox/radio mode.
    //   It's always true in mutltiple (i.e. fieldType === Array) mode.
    checkboxes={true}

    // Field layout
    //  The layout of label. You can set span and/or offset.
    // Available in:
    //   antd
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
    labelProps={{ shrink: true, disableAnimation: true }}

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
    
    // Options.
    //   Set of values that will be shown in the select.
    //   It is optional and using `options` will override `transform` and `allowedValues`.
    //   It can be either an object or an array (or a function, that returns it).
    options={[{label: 'Hi', value: value1}, [{label: 'Hello', value: value1}, ...]}
/>
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
/>
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
    grid={3}        // 'col-3-sm' on label, 'col-9-sm' on input
    grid="4"        // 'col-4-sm' on label, 'col-8-sm' on input
    grid={{md: 5}}  // 'col-5-md' on label, 'col-7-md' on input
    grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input

    // Field layout
    //  The layout of label. You can set span and/or offset.
    // Available in:
    //   antd
    labelCol={{span: 4}}   // 'ant-col-4' on label
    labelCol={{offset: 2}} // 'ant-col-offset-2' on label

    // Field layout
    //   The layout for input controls. Same as labelCol
    // Available in:
    //   antd
    wrapperCol={{span: 4}}   // 'ant-col-4' on field
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
    iconProps={{onClick () {}}}

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
/>
```

**Note:** All `BaseField` props are also accepted.

<br>

# Forms

## `AutoForm`

```js
import AutoForm from 'uniforms/AutoForm'; // Or from the theme package.

<AutoForm
    // Like onChange but for the whole model.
    //   Triggered just after onChange but with the next model instead of
    //   (key, value) pair.
    onChangeModel={model => console.log(model)}
/>
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
    //   you'll receive a plain object. If you treat form as an input, then
    //   this is a value.
    model={{fieldA: 1}}

    // Model transform.
    //   Function transforming one model into another. It's used in few
    //   situations (modes) described below. Do not mutate a given model!
    modelTransform={(mode, model) => {
        // This model will be passed to the fields.
        if (mode === 'form') {/* ... */}

        // This model will be submitted.
        if (mode === 'submit') {/* ... */}

        // This model will be validated.
        if (mode === 'validate') {/* ... */}

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
/>
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
/>
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
/>
```

**Note:** All `BaseForm` props are also accepted and all methods are available.

## `ValidatedQuickForm`

**Note:** All `QuickForm` props are also accepted and all methods are available.<br>
**Note:** All `ValidatedForm` props are also accepted and all methods are available.

<br>

# Helpers

## `changedKeys`

```js
import changedKeys from 'uniforms/changedKeys';

// Returns an array of changed keys between valueA and valueB, where root is the
// root key.
const arrayOfChangedKeys = changedKeys(root, valueA, valueB);
```

**Note:** For more examples, see [`changedKeys` tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/test/helpers/changedKeys.js).

## `connectField`

```js
import connectField from 'uniforms/connectField';

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
    //   at once - this option passes 'undefined' as en empty string.
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
import filterDOMProps from 'uniforms/filterDOMProps';

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
import injectName from 'uniforms/injectName';

// It's rather an internal helper, but it's still exported. Injects name to all
// already rendered fields.
const componentWithInjectedName = injectName(name, component);
```

## `joinName`

```js
import joinName from 'uniforms/joinName';

// Use it to safely join partial field names. If you create a custom field with
// subfields, then it's better to use this helper.
const joinedNameString = joinName(nameA, nameB, nameC, ...);

// If you want to have a "raw" version of a name, then pass null as the first
// param.
const joinedNameArray = joinName(null, nameA, nameB, nameC, ...);
```

## `nothing`

```js
import nothing from 'uniforms/nothing';

// In React@0.14 you can't return null from functional component, but in
// React@15 you should use null - nothing is a "safe null". Basically it's a
// <noscript /> in @0.14 and null in @15.
const emptyJSX = () => nothing;
```

## `randomIds`

```js
import randomIds from 'uniforms/randomIds';

// It's rather an internal helper, but it's still exported. Use it, if you want
// to have some random but deterministic strings.
const predictableRandomIdGenerator = randomIds(prefix);
const predictableRandomIdA = safeRandomIdGenerator();
const predictableRandomIdB = safeRandomIdGenerator();
const predictableRandomIdC = safeRandomIdGenerator();
// ...
```

<br>

# Schemas

## `Bridge`

```js
import Bridge from 'uniforms/Bridge';

// This is a kind of abstract class. It should be extended to create custom
// bridges. It implements all of the required methods and throws an error with
// meaningful "method not implemented" error.
class CustomBridge extends Bridge {
    // Check, if this bridge is compatibile with given schema.
    static check (schema) { /* ... */ }

    // Field's scoped error.
    getError (name, error) { /* ... */ }

    // Field's scoped error message.
    getErrorMessage (name, error) { /* ... */ }

    // All error messages from error.
    getErrorMessages (error) { /* ... */ }

    // Field's definition (`field` prop).
    getField (name) { /* ... */ }

    // Field's initial value.
    getInitialValue (name) { /* ... */ }

    // Field's props.
    getProps (name) { /* ... */ }

    // Field's subfields (or first-level fields).
    getSubfields (name) { /* ... */ }

    // Field's type (ex. Number, String).
    getType (name) { /* ... */ }

    // Function with one argument - model - which throws errors when model is
    // invalid.
    getValidator (options) { /* ... */ }
}
```

## `GraphQLBridge`

```js
import GraphQLBridge    from 'uniforms/GraphQLBridge';
import {buildASTSchema} from 'graphql';
import {parse}          from 'graphql';

const schema = `
    type Author {
        id:        String!
        firstName: String
        lastName:  String
    }

    type Post {
        id:     Int!
        author: Author!
        title:  String
        votes:  Int
    }

    # This is required by buildASTSchema
    type Query { anything: ID }
`;

const schemaType = buildASTSchema(parse(schema)).getType('Post');
const schemaData = {
    id: {
        allowedValues: [1, 2, 3]
    },
    title: {
        options: [
            {label: 1, value: 'a'},
            {label: 2, value: 'b'}
        ]
    }
};

const schemaValidator = model => {
    const details = [];

    if (!model.id) {
        details.push({name: 'id', message: 'ID is required!'});
    }

    // ...

    if (details.length) {
        throw {details};
    }
};

const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaData);
```

## `SimpleSchemaBridge`

```js
import SimpleSchemaBridge from 'uniforms/SimpleSchemaBridge';

// SimpleSchema bridge.
const bridge = new SimpleSchemaBridge(simpleSchemaInstance);
```

## `SimpleSchema2Bridge`

```js
import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';

// SimpleSchema@2 bridge.
const bridge = new SimpleSchema2Bridge(simpleSchema2Instance);
```

## `createSchemaBridge`

```js
import createSchemaBridge from 'uniforms/createSchemaBridge';

// It's rather an internal helper, but it's still exported. Use it, if you want
// to manually create a schema bridge or to test your bridge. It will throw on
// an unrecognised schema.
const bridge = createSchemaBridge(schemaOrBridge);
```
