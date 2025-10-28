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
|   `DateField`   |      HTML5 `date` or `datetime-local` input.      |
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

##### Props usage:

```tsx
import { AutoField } from 'uniforms-unstyled';

<AutoField component={MyComponent} />;
```

### `AutoFields`

`AutoFields` is basically a set of rendered `AutoField`s.
By default, the rendered fields will be `AutoField` in a chosen theme.
However, you can replace the standard `AutoField` with [`AutoField.componentDetectorContext`](/docs/uth-autofield-algorithm#overriding-autofield).
There is also an `autoField` prop, but [it's deprecated](https://github.com/vazco/uniforms/issues/980) and will be removed in a future release.

The `element` property defines a wrapping component.
E.g. you want to group your fields inside a section, just do `element="section"`. The default one is `div`.

##### Props:

|     Name     |       Default        |                                        Description                                         |
| :----------: | :------------------: | :----------------------------------------------------------------------------------------: |
| `autoField`  | Standard `AutoField` | `AutoField` component to render (see [#980](https://github.com/vazco/uniforms/issues/980)) |
|  `element`   |        `div`         |                                       Fields wrapper                                       |
|   `fields`   |  All schema fields   |                                  List of fields to render                                  |
| `omitFields` |         `[]`         |                                   List of fields to omit                                   |

##### Props usage:

```tsx
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

|       Name        |                                                                               Description                                                                               |                    Available in                    |
| :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------: |
|   `appearance`    |                 Field appearance. Set to "toggle" to appear as a Material Toggle or to "checkbox" (or leave it undefined) to use a Checkbox appearance.                 |                      material                      |
|      `extra`      |                                 Extra feedback text. In the antd theme, this renders addtional help text below any validation messages.                                 |                        antd                        |
|  `feedbackable`   |                                                      Field feedback state. _Some description would be great, huh?_                                                      |                     bootstrap3                     |
|      `grid`       |      Field layout. Bootstrap grid layout style. Number is an equivalent of \{sm: n\}. Object is a \{mode: size\} object. Complete string is simply passed through.      |         bootstrap3, bootstrap4, bootstrap5         |
|      `help`       |                                                           Help text. _Some description would be great, huh?_                                                            |      antd, bootstrap3, bootstrap4, bootstrap5      |
|  `helpClassName`  |                                                      Help block className. _Some description would be great, huh?_                                                      |         bootstrap3, bootstrap4, bootstrap5         |
|     `inline`      |                      Checkbox inline state. In bootstrap themes, a label is rendered as a text but in inline mode, it's treated as a field label.                       |         bootstrap3, bootstrap4, bootstrap5         |
| `inputClassName`  |                      Input wrapper class name. In bootstrap themes, passed className is used on field block. This is used on direct field wrapper.                      |         bootstrap3, bootstrap4, bootstrap5         |
|    `inputRef`     | Setting ref prop to a field won't work as desired, because you'll receive a field component rather than an HTML input. If you need an input ref, use this prop instead. |                        All                         |
|   `labelBefore`   |                       Left label. In bootstrap themes, label is rendered on the right side of a checkbox. This label is rendered above the field.                       |         bootstrap3, bootstrap4, bootstrap5         |
| `labelClassName`  |                                                       Label className. A custom className for the field's label.                                                        |         bootstrap3, bootstrap4, bootstrap5         |
|    `labelCol`     |                                                   Field layout. The layout of label. You can set span and/or offset.                                                    |                        antd                        |
| `showInlineError` |                                                       Field inline error. _Some description would be great, huh?_                                                       | antd, bootstrap3, bootstrap4, bootstrap5, semantic |
|  `wrapClassName`  |                                             Field and sourroundings wrap className. _Some description would be great, huh?_                                             |         bootstrap3, bootstrap4, bootstrap5         |
|   `wrapperCol`    |                                                     Field layout. The layout for input controls. Same as labelCol.                                                      |                        antd                        |

