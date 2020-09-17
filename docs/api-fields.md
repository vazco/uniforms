---
id: api-fields
title: Fields
---

uniforms provide a set of predefined components that can be used as form fields.

The list below contains a guaranteed set of fields, implemented in every theme package:

|    Component    |                    Description                    |
| :-------------: | :-----------------------------------------------: |
|   `AutoField`   |       Automatically renders a given field.        |
|  `AutoFields`   |        Automatically renders given fields.        |
|   `BoolField`   |                     Checkbox.                     |
|   `DateField`   |           HTML5 `datetime-local` input.           |
|  `ErrorField`   |         Error message for a given field.          |
|  `ErrorsField`  |  Error message with a list of validation errors.  |
|  `HiddenField`  | Hidden field (with a possibility to omit in DOM). |
| `ListAddField`  |      An icon with action to add a list item.      |
| `ListDelField`  |    An icon with action to remove a list item.     |
|   `ListField`   |              List of nested fields.               |
| `ListItemField` |             Single list item wrapper.             |
| `LongTextField` |                     Textarea.                     |
|   `NestField`   |              Block of nested fields.              |
|   `NumField`    |                  Numeric input.                   |
|  `RadioField`   |                  Radio checkbox.                  |
|  `SelectField`  |       Select (or set of radio checkboxes).        |
|  `SubmitField`  |                  Submit button.                   |
|   `TextField`   |       Text (or any HTML5 compatible) input.       |

## Fields

### `AutoField`

`AutoField` is basically a field renderer - it will render a field of a type adequate to the one defined in the schema,
according to the [`AutoField` algorithm](/docs/uth-autofield-algorithm).
You can also directly pass a component to it (by a `component` prop).
All additional props will be passed to the result field component.

##### Props:

|    Name     |                   Default                    |           Description           |
| :---------: | :------------------------------------------: | :-----------------------------: |
| `component` | Field according to the `AutoField` algorithm |       Component to render       |
|   `name`    |                      -                       | Name of the field in the schema |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { AutoField } from 'uniforms-unstyled';

<AutoField component={MyComponent} />;
```

### `AutoFields`

`AutoFields` is basically a set of rendered `AutoFields`.
By default, the rendered fields will be `AutoFields` in a chosen theme.
However, you can replace the standard `AutoField` with a custom one through the `autoField` property.
The `element` property defines a wrapping component.
E.g. you want to group your fields inside a section, just do `element="section"`. The default one is `div`.

##### Props:

|     Name     |       Default        |           Description           |
| :----------: | :------------------: | :-----------------------------: |
| `autoField`  | Standard `AutoField` | `AutoField` Component to render |
|  `element`   |        `div`         |         Fields wrapper          |
|   `fields`   |  All schema fields   |    List of fields to render     |
| `omitFields` |         `[]`         |     List of fields to omit      |

##### Props usage:

```js
import { AutoFields } from 'uniforms-unstyled';

<AutoFields
  autoField={MyAutoField}
  element="section"
  fields={['fieldA', 'fieldB']}
  omitFields={['fieldA', 'fieldB']}
/>;
```

### `BoolField`

A checkbox.

##### Props:

|       Name        |                                                                               Description                                                                               |              Available in              |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|   `appearance`    |                 Field appearance. Set to "toggle" to appear as a Material Toggle or to "checkbox" (or leave it undefined) to use a Checkbox appearance.                 |                material                |
|      `extra`      |                                 Extra feedback text. In the antd theme, this renders addtional help text below any validation messages.                                 |                  antd                  |
|  `feedbackable`   |                                                      Field feedback state. _Some description would be great, huh?_                                                      |               bootstrap4               |
|      `grid`       |        Field layout. Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object is a {mode: size} object. Complete string is simply passed through.        |         bootstrap3, bootstrap4         |
|      `help`       |                                                           Help text. _Some description would be great, huh?_                                                            |      antd, bootstrap3, bootstrap4      |
|  `helpClassName`  |                                                      Help block className. _Some description would be great, huh?_                                                      |         bootstrap3, bootstrap4         |
|     `inline`      |                      Checkbox inline state. In bootstrap themes, a label is rendered as a text but in inline mode, it's treated as a field label.                       |         bootstrap3, bootstrap4         |
| `inputClassName`  |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      |         bootstrap3, bootstrap4         |
|    `inputRef`     | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |                  All                   |
|   `labelBefore`   |                       Left label. In bootstrap themes, label is rendered on the right side of a checkbox. This label is rendered above the field.                       |         bootstrap3, bootstrap4         |
| `labelClassName`  |                                                       Label className. A custom className for the field's label.                                                        |         bootstrap3, bootstrap4         |
|    `labelCol`     |                                                   Field layout. The layout of label. You can set span and/or offset.                                                    |                  antd                  |
| `showInlineError` |                                                       Field inline error. _Some description would be great, huh?_                                                       | antd, bootstrap3, bootstrap4, semantic |
|  `wrapClassName`  |                                             Field and sourroundings wrap className. _Some description would be great, huh?_                                             |         bootstrap3, bootstrap4         |
|   `wrapperCol`    |                                                     Field layout. The layout for input controls. Same as labelCol.                                                      |                  antd                  |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { BoolField } from 'uniforms-unstyled';

<BoolField
  appearance="checkbox" // Renders a material-ui Checkbox
  appearance="toggle" // Renders a material-ui Toggle
  extra="Extra Feedback or Help"
  feedbackable
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  help="Need help?"
  helpClassName="a b c"
  inline
  inputClassName="a b c"
  inputRef={ref => {}}
  labelBefore="Label"
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  showInlineError
  wrapClassName="a b c"
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

### `DateField`

##### Props:

|       Name        |                                                                                  Description                                                                                   |              Available in              |
| :---------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|      `extra`      |                                    Extra feedback text. In the antd theme, this renders addtional help text below any validation messages.                                     |                  antd                  |
|  `feedbackable`   |                                                         Field feedback state. _Some description would be great, huh?_                                                          |               bootstrap4               |
|      `grid`       |           Field layout. Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object is a {mode: size} object. Complete string is simply passed through.            |         bootstrap3, bootstrap4         |
|      `help`       |                                                               Help text. _Some description would be great, huh?_                                                               |      antd,bootstrap3, bootstrap4       |
|  `helpClassName`  |                                                         Help block className. _Some description would be great, huh?_                                                          |         bootstrap3, bootstrap4         |
|      `icon`       |                Input icon. Semantic inputs can have an icon. By default, it's placed on the right side - to place it on the left, use `iconLeft` prop instead.                 |                semantic                |
|    `iconLeft`     |                       Semantic inputs can have an icon. With this prop, it's placed on the left side - to place it on the right, use icon prop instead.                        |                semantic                |
|    `iconProps`    |                                    Input icon props. Semantic inputs can have an icon. These props are passed directly to the icon element.                                    |                semantic                |
| `inputClassName`  |                         Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                          |         bootstrap3, bootstrap4         |
|    `inputRef`     |    Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead.     |                  All                   |
| `labelClassName`  |                                                           Label className. A custom className for the field's label.                                                           |         bootstrap3, bootstrap4         |
|    `labelCol`     |                                                       Field layout. The layout of label. You can set span and/or offset.                                                       |                  antd                  |
|   `labelProps`    |                                                                            Props for the InputLabel                                                                            |                material                |
|       `max`       |                                                                          Maximum value. Date object.                                                                           |                  All                   |
|       `min`       |                                                                          Minimal value. Date object.                                                                           |                  All                   |
| `showInlineError` |                                                          Field inline error. _Some description would be great, huh?_                                                           | antd, bootstrap3, bootstrap4, semantic |
|   `timeFormat`    |                                                           Display time picker in ampm (12hr) format or 24hr format.                                                            |                material                |
|  `wrapClassName`  | Field and sourroundings wrap className. In SemanticUI theme, this class name is used on ui input wrapper, so you can pass classes like small, huge, inverted, transparent etc. |    bootstrap3, bootstrap4, semantic    |
|   `wrapperCol`    |                                                         Field layout. The layout for input controls. Same as labelCol.                                                         |                  antd                  |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { DateField } from 'uniforms-unstyled';

<DateField
  extra="Extra Feedback or Help"
  feedbackable
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  help="Need help?"
  helpClassName="a b c"
  icon="user"
  iconLeft="user"
  iconProps={{onClick() {}}}
  inputClassName="a b c"
  inputRef={ref => {}}
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelProps={{shrink: true, disableAnimation: true}}
  max={new Date(2100, 1, 1)}
  min={new Date(2000, 1, 1)}
  showInlineError
  timeFormat="ampm"
  wrapClassName="a b c"
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

### `ErrorField`

Error message renderer.

##### Props:

|    Name    |                                                      Description                                                       |
| :--------: | :--------------------------------------------------------------------------------------------------------------------: |
| `children` | Custom content. By default, it will render a block with the error message (if any), but you can customize the content. |
|   `name`   |                                     Target field. This field error should be used.                                     |

##### Props usage:

```js
import { ErrorField } from 'uniforms-unstyled';

<ErrorField children={children} name="field" />;
```

### `ErrorsField`

Error messages renderer.

##### Props:

|    Name    |                                                       Description                                                       |
| :--------: | :---------------------------------------------------------------------------------------------------------------------: |
| `children` | Custom content. By default, it will render a block with the error messages (if any), but you can customize the content. |

##### Props usage:

```js
import { ErrorsField } from 'uniforms-unstyled';

<ErrorsField children={children} />;
```

### `HiddenField`

##### Props:

|  Name   |                                                                        Description                                                                        |
| :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `name`  |                            Field name. Used for identification. It should match your schema - if not, it will throw an error.                             |
| `value` | Field value. This field has completely different semantics. When a value is set, then it's updating a current model instead of being passed to the field. |

##### Props usage:

```js
import { HiddenField } from 'uniforms-unstyled';

<HiddenField name="field" value={value} />;
```

### `ListAddField`

##### Props:

|   Name    |             Description              |      Available in      |
| :-------: | :----------------------------------: | :--------------------: |
| `addIcon` | Icon. By default, glyphicon is used. | bootstrap3, bootstrap4 |

**Note:** All `BaseField` props are also accepted.<br />
**Note:** This is one of _internal_ components of `ListField`.

##### Props usage:

```js
import { ListAddField } from 'uniforms-unstyled';

<ListAddField addIcon={<MyAddIcon />} />;
```

### `ListDelField`

##### Props:

|     Name     |             Description              |      Available in      |
| :----------: | :----------------------------------: | :--------------------: |
| `removeIcon` | Icon. By default, glyphicon is used. | bootstrap3, bootstrap4 |

**Note:** All `BaseField` props are also accepted.<br />
**Note:** This is one of _internal_ components of `ListField`.

##### Props usage:

```js
import { ListDelField } from 'uniforms-unstyled';

<ListDelField removeIcon={<MyRemoveIcon />} />;
```

### `ListField`

##### Props:

|       Name        |  Default  |                                      Description                                       |           Available in           |
| :---------------: | :-------: | :------------------------------------------------------------------------------------: | :------------------------------: |
|     `addIcon`     | glyphicon |                         Icon. It's passed to the ListAddField.                         |      bootstrap3, bootstrap4      |
|  `initialCount`   |     -     | Initial items count. At least this amount of fields will be rendered at the beginning. |               All                |
|    `itemProps`    |     -     |           ListItemField props. These props are passed to the ListItemField.            |               All                |
|   `removeIcon`    | glyphicon |                         Icon. It's passed to the ListDelField.                         |      bootstrap3, bootstrap4      |
| `showInlineError` |           |              Field inline error. _Some description would be great, huh?_               | bootstrap3, bootstrap4, semantic |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { ListField } from 'uniforms-unstyled';

<ListField
  addIcon={<MyAddIcon />}
  initialCount={5}
  itemProps={
    {
      /* ... */
    }
  }
  removeIcon={<MyRemoveIcon />}
  showInlineError
/>;
```

### `ListItemField`

|     Name     |  Default  |              Description               |      Available in      |
| :----------: | :-------: | :------------------------------------: | :--------------------: |
| `removeIcon` | glyphicon | Icon. It's passed to the ListDelField. | bootstrap3, bootstrap4 |

**Note:** All `BaseField` props are also accepted.<br />
**Note:** This is one of _internal_ components of `ListField`.

##### Props usage:

```js
import { ListItemField } from 'uniforms-unstyled';

<ListItemField removeIcon={<MyRemoveIcon />} />;
```

### `LongTextField`

A textarea.

##### Props:

|       Name        |                                                                               Description                                                                               |              Available in              |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|      `extra`      |                                 Extra feedback text. In the antd theme, this renders addtional help text below any validation messages.                                 |                  antd                  |
|      `grid`       |        Field layout. Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object is a {mode: size} object. Complete string is simply passed through.        |         bootstrap3, bootstrap4         |
|      `help`       |                                                           Help text. _Some description would be great, huh?_                                                            |      antd, bootstrap3, bootstrap4      |
|  `helpClassName`  |                                                      Help block className. _Some description would be great, huh?_                                                      |         bootstrap3, bootstrap4         |
|      `icon`       |             Input icon. Semantic inputs can have an icon. By default, it's placed on the right side - to place it on the left, use `iconLeft` prop instead.             |                semantic                |
|    `iconLeft`     |                    Semantic inputs can have an icon. With this prop, it's placed on the left side - to place it on the right, use icon prop instead.                    |                semantic                |
|    `iconProps`    |                                Input icon props. Semantic inputs can have an icon. These props are passed directly to the icon element.                                 |                semantic                |
| `inputClassName`  |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      |         bootstrap3, bootstrap4         |
|     `inline`      |                      Checkbox inline state. In bootstrap themes, a label is rendered as a text but in inline mode, it's treated as a field label.                       |         bootstrap3, bootstrap4         |
|    `inputRef`     | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |                  All                   |
|   `labelBefore`   |                       Left label. In bootstrap themes, label is rendered on the right side of a checkbox. This label is rendered above the field.                       |         bootstrap3, bootstrap4         |
| `labelClassName`  |                                                       Label className. A custom className for the field's label.                                                        |         bootstrap3, bootstrap4         |
|    `labelCol`     |                                                   Field layout. The layout of label. You can set span and/or offset.                                                    |                  antd                  |
| `showInlineError` |                                                       Field inline error. _Some description would be great, huh?_                                                       | antd, bootstrap3, bootstrap4, semantic |
|   `wrapperCol`    |                                                     Field layout. The layout for input controls. Same as labelCol.                                                      |                  antd                  |
|  `wrapClassName`  |                                             Field and sourroundings wrap className. _Some description would be great, huh?_                                             |         bootstrap3, bootstrap4         |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { LongTextField } from 'uniforms-unstyled';

<LongTextField
  extra="Extra Feedback or Help"
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  help="Need help?"
  helpClassName="a b c"
  icon="user"
  iconLeft="user"
  iconProps={{onClick() {}}}
  inputClassName="a b c"
  inputRef={ref => {}}
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  showInlineError
  wrapClassName="a b c"
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

### `NestField`

##### Props:

|       Name        |                                                                     Description                                                                     |              Available in              |
| :---------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|     `fields`      |       Array of rendered fields. If no custom content provided, only those fields are rendered. By default, All of nested fields are rendered.       |                  All                   |
|     `grouped`     | Add / remove "grouped" class from the field. In Semantic, fields can be grouped using this class. By default, this class is added to the NestField. |                semantic                |
| `showInlineError` |                                             Field inline error. _Some description would be great, huh?_                                             | antd, bootstrap3, bootstrap4, semantic |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { NestField } from 'uniforms-unstyled';

<NestField fields={['fieldA', 'fieldB' /* ... */]} grouped showInlineError />;
```

### `NumField`

A numeric input field.

##### Props:

|       Name        |                                                                               Description                                                                               |              Available in              |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|     `decimal`     |                                                        Decimal mode. This will change value step from 1 to 0.01.                                                        |                  All                   |
|      `extra`      |                                 Extra feedback text. In the antd theme, this renders addtional help text below any validation messages.                                 |                  antd                  |
|      `grid`       |        Field layout. Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object is a {mode: size} object. Complete string is simply passed through.        |         bootstrap3, bootstrap4         |
|      `help`       |                                                           Help text. _Some description would be great, huh?_                                                            |      antd, bootstrap3, bootstrap4      |
|  `helpClassName`  |                                                      Help block className. _Some description would be great, huh?_                                                      |         bootstrap3, bootstrap4         |
|      `icon`       |             Input icon. Semantic inputs can have an icon. By default, it's placed on the right side - to place it on the left, use `iconLeft` prop instead.             |                semantic                |
|    `iconLeft`     |                    Semantic inputs can have an icon. With this prop, it's placed on the left side - to place it on the right, use icon prop instead.                    |                semantic                |
|    `iconProps`    |                                Input icon props. Semantic inputs can have an icon. These props are passed directly to the icon element.                                 |                semantic                |
| `inputClassName`  |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      |         bootstrap3, bootstrap4         |
|     `inline`      |                      Checkbox inline state. In bootstrap themes, a label is rendered as a text but in inline mode, it's treated as a field label.                       |         bootstrap3, bootstrap4         |
|    `inputRef`     | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |                  All                   |
|   `labelBefore`   |                       Left label. In bootstrap themes, label is rendered on the right side of a checkbox. This label is rendered above the field.                       |         bootstrap3, bootstrap4         |
| `labelClassName`  |                                                       Label className. A custom className for the field's label.                                                        |         bootstrap3, bootstrap4         |
|    `labelCol`     |                                                   Field layout. The layout of label. You can set span and/or offset.                                                    |                  antd                  |
|       `max`       |                                                                       Maximum value. Date object.                                                                       |                  All                   |
|       `min`       |                                                                       Minimal value. Date object.                                                                       |                  All                   |
| `showInlineError` |                                                       Field inline error. _Some description would be great, huh?_                                                       | antd, bootstrap3, bootstrap4, semantic |
|      `step`       |                                                                               Input step.                                                                               |                  All                   |
|   `wrapperCol`    |                                                     Field layout. The layout for input controls. Same as labelCol.                                                      |                  antd                  |
|  `wrapClassName`  |                                             Field and sourroundings wrap className. _Some description would be great, huh?_                                             |         bootstrap3, bootstrap4         |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { NumField } from 'uniforms-unstyled';

<NumField
  decimal
  extra="Extra Feedback or Help"
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  help="Need help?"
  helpClassName="a b c"
  icon="user"
  iconLeft="user"
  iconProps={{onClick() {}}}
  inputClassName="a b c"
  inputRef={ref => {}}
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  max={100}
  min={10}
  showInlineError
  step={5}
  wrapClassName="a b c"
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

### `RadioField`

##### Props:

|       Name        |                                                          Description                                                          |              Available in              |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|  `allowedValues`  |                          Array of allowed values. By default, those are extracted from your schema.                           |                  All                   |
|     `inline`      | Checkbox inline state. In bootstrap themes, a label is rendered as a text but in inline mode, it's treated as a field label.  |         bootstrap3, bootstrap4         |
| `inputClassName`  | Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper. |         bootstrap3, bootstrap4         |
| `labelClassName`  |                                  Label className. A custom className for the field's label.                                   |         bootstrap3, bootstrap4         |
|    `labelCol`     |                              Field layout. The layout of label. You can set span and/or offset.                               |                  antd                  |
| `showInlineError` |                                  Field inline error. _Some description would be great, huh?_                                  | antd, bootstrap3, bootstrap4, semantic |
|    `transform`    |                        Label transform. Allows to transform the each value into a human-readable label                        |                  All                   |
|   `wrapperCol`    |                                Field layout. The layout for input controls. Same as labelCol.                                 |                  antd                  |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { RadioField } from 'uniforms-unstyled';

<RadioField
  allowedValues={[value1, value2 /* ... */]}
  inline
  inputClassName="a b c"
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  showInlineError
  transform={value => label}
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

### `SelectField`

##### Props:

|       Name        |                                                                               Description                                                                               |              Available in              |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|  `allowedValues`  |                                               Array of allowed values. By default, those are extracted from your schema.                                                |                  All                   |
|   `appearance`    |                 Field appearance. Set to "toggle" to appear as a Material Toggle or to "checkbox" (or leave it undefined) to use a Checkbox appearance.                 |                material                |
|   `checkboxes`    |                                       Turn on checkbox/radio mode. It's always true in multiple (i.e. fieldType === Array) mode.                                        |                  All                   |
|      `extra`      |                                Extra feedback text. In the antd theme, this renders additional help text below any validation messages.                                 |                  antd                  |
|      `help`       |                                                           Help text. _Some description would be great, huh?_                                                            |      antd, bootstrap3, bootstrap4      |
|  `helpClassName`  |                                                      Help block className. _Some description would be great, huh?_                                                      |         bootstrap3, bootstrap4         |
|     `inline`      |                      Checkbox inline state. In bootstrap themes, a label is rendered as a text but in inline mode, it's treated as a field label.                       |         bootstrap3, bootstrap4         |
| `inputClassName`  |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      |         bootstrap3, bootstrap4         |
|    `inputRef`     | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |                  All                   |
| `labelClassName`  |                                                       Label className. A custom className for the field's label.                                                        |         bootstrap3, bootstrap4         |
|    `labelCol`     |                                                   Field layout. The layout of label. You can set span and/or offset.                                                    |                  antd                  |
|   `labelProps`    |                                                                        Props for the InputLabel                                                                         |                material                |
|     `options`     |   Options. It is optional and using `options` will override `transform` and `allowedValues`. It can be either an object or an array (or a function, that returns it).   |                  All                   |
| `showInlineError` |                                                       Field inline error. _Some description would be great, huh?_                                                       | antd, bootstrap3, bootstrap4, semantic |
|    `transform`    |                                             Label transform. Allows to transform the each value into a human-readable label                                             |                  All                   |
|   `wrapperCol`    |                                                     Field layout. The layout for input controls. Same as labelCol.                                                      |                  antd                  |
|  `wrapClassName`  |                                             Field and surroundings wrap className. _Some description would be great, huh?_                                              |         bootstrap3, bootstrap4         |
| `textFieldProps`  |                                          Props injected directly to `TextField` ( valid only for non-checkbox `SelectField` ).                                          |                material                |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { SelectField } from 'uniforms-unstyled';

<SelectField
  allowedValues={[value1, value2 /* ... */]}
  checkboxes
  extra="Extra Feedback or Help"
  help="Need help?"
  helpClassName="a b c"
  inline
  inputClassName="a b c"
  inputRef={ref => {}}
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  labelProps={{shrink: true, disableAnimation: true}}
  options={[{label: 'Hi', value: value1}, {label: 'Hello', value: value1} /* ... */]}
  showInlineError
  transform={value => label} //   Set of values that will be shown in the select.
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

### `SubmitField`

##### Props:

|       Name       |                                                                               Description                                                                               |      Available in      |
| :--------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------: |
| `inputClassName` |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      | bootstrap3, bootstrap4 |
|    `inputRef`    | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |          All           |

##### Props usage:

```js
import { SubmitField } from 'uniforms-unstyled';

<SubmitField inputClassName="a b c" inputRef={ref => {}} />;
```

### `TextField`

##### Props:

|       Name        |                                                                               Description                                                                               |              Available in              |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|      `extra`      |                                 Extra feedback text. In the antd theme, this renders addtional help text below any validation messages.                                 |                  antd                  |
|      `grid`       |        Field layout. Bootstrap grid layout style. Number is an equivalent of {sm: n}. Object is a {mode: size} object. Complete string is simply passed through.        |         bootstrap3, bootstrap4         |
|      `help`       |                                                           Help text. _Some description would be great, huh?_                                                            |      antd, bootstrap3, bootstrap4      |
|  `helpClassName`  |                                                      Help block className. _Some description would be great, huh?_                                                      |         bootstrap3, bootstrap4         |
|      `icon`       |             Input icon. Semantic inputs can have an icon. By default, it's placed on the right side - to place it on the left, use `iconLeft` prop instead.             |                semantic                |
|    `iconLeft`     |                    Semantic inputs can have an icon. With this prop, it's placed on the left side - to place it on the right, use icon prop instead.                    |                semantic                |
|    `iconProps`    |                                Input icon props. Semantic inputs can have an icon. These props are passed directly to the icon element.                                 |                semantic                |
| `inputClassName`  |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      |         bootstrap3, bootstrap4         |
|    `inputRef`     | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |                  All                   |
| `labelClassName`  |                                                       Label className. A custom className for the field's label.                                                        |         bootstrap3, bootstrap4         |
|    `labelCol`     |                                                   Field layout. The layout of label. You can set span and/or offset.                                                    |                  antd                  |
| `showInlineError` |                                                       Field inline error. _Some description would be great, huh?_                                                       | antd, bootstrap3, bootstrap4, semantic |
|      `type`       |                                                 Input type. HTML compatible input type like password. Default is text.                                                  |                  All                   |
|   `wrapperCol`    |                                                     Field layout. The layout for input controls. Same as labelCol.                                                      |                  antd                  |
|  `wrapClassName`  |                                             Field and sourroundings wrap className. _Some description would be great, huh?_                                             |         bootstrap3, bootstrap4         |

**Note:** All `BaseField` props are also accepted.

##### Props usage:

```js
import { TextField } from 'uniforms-unstyled';

<TextField
  extra="Extra Feedback or Help"
  grid="4" // 'col-4-sm' on label, 'col-8-sm' on input
  grid="col-6-xl" // 'col-6-xl' on label, 'col-6-xl' on input
  grid={3} // 'col-3-sm' on label, 'col-9-sm' on input
  grid={{md: 5}} // 'col-5-md' on label, 'col-7-md' on input
  help="Need help?"
  helpClassName="a b c"
  icon="user"
  iconLeft="user"
  iconProps={{onClick() {}}}
  inputClassName="a b c"
  inputRef={ref => {}}
  labelClassName="a b c" // You can either specify them as a single string
  labelClassName=[ 'a', 'b', 'c' ] // or as an array of strings
  labelCol={{offset: 2}} // 'ant-col-offset-2' on label
  labelCol={{span: 4}} // 'ant-col-4' on label
  showInlineError
  type="password"   // Input type. HTML compatible input type like password. Default is text.
  wrapClassName="a b c"
  wrapperCol={{offset: 2}} // 'ant-col-offset-2' on field
  wrapperCol={{span: 4}} // 'ant-col-4' on field
/>;
```

## Common props

|     Name      | Default |                                                                                                                                          Description                                                                                                                                          |
| :-----------: | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  `disabled`   | `false` |                                                                                                 Field disabled state. It's passed directly to the field, but it propagates same as the label.                                                                                                 |
|    `label`    | `true`  | Field label. This prop has three modes. If you pass a string, then it will be used as a label. If you pass a null, then it won't have a label, but nested fields will have default labels. If you pass a non-null falsy value, it won't have a label and nested fields won't have labels too. |
|    `name`     |    -    |                                                                                              Field name. Used for identification. It should match your schema - if not, it will throw an error.                                                                                               |
| `placeholder` | `false` |                                                                                  Field placeholder. If set to true, then a label will be used. Otherwise, it's handled like a label (including propagation).                                                                                  |

##### Props usage:

```js
<SomeField disabled={false} label name="field" placeholder={false} />
```

## Props propagation

Few props propagate in a very special way. These are `label`, `placeholder` and `disabled`.

**Example:**

```js
<TextField />                    // default label | no      placeholder
<TextField label="Text" />       // custom  label | no      placeholder
<TextField label={false} />      // no      label | no      placeholder
<TextField placeholder />        // default label | default placeholder
<TextField placeholder="Text" /> // default label | custom  placeholder

<NestField label={null}> // null = no label but the children have their labels
    <TextField />
</NestField>

<NestField label={false}> // false = no label and the children have no labels
    <TextField />
</NestField>

<ListField name="authors" disabled>          // Additions are disabled...
    <ListItemField name="$" disabled>        // ...deletion too
        <NestField disabled={false} name=""> // ...but editing is not.
            <TextField name="name" />
            <NumField  name="age" />
        </NestField>
    </ListItemField>
</ListField>
```

**Note:** `label`, `placeholder` and `disabled` are cast to `Boolean` before being passed to nested fields.
