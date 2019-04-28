---
id: uncategorized-fields
title: Fields
---

## `AutoField` algorithm

```js
let component = props.component;
if (component === undefined) {
  if (props.allowedValues) {
    if (props.checkboxes && props.fieldType !== Array) {
      component = RadioField;
    } else {
      component = SelectField;
    }
  } else {
    switch (props.fieldType) {
      case Date:
        component = DateField;
        break;
      case Array:
        component = ListField;
        break;
      case Number:
        component = NumField;
        break;
      case Object:
        component = NestField;
        break;
      case String:
        component = TextField;
        break;
      case Boolean:
        component = BoolField;
        break;
    }

    invariant(component, 'Unsupported field type: %s', props.fieldType.toString());
  }
}
```

## Guaranteed props

**Note:** These are **not** the only props that a field will receive - these are guaranteed for all fields created with `connectField` helper.

|      Name      |         Type          |              Description               |
| :------------: | :-------------------: | :------------------------------------: |
|   `changed`    |        `bool`         |           Has field changed?           |
|   `disabled`   |        `bool`         |           Is field disabled?           |
|    `error`     |       `object`        | Field scoped part of validation error. |
| `errorMessage` |       `string`        | Field scoped validation error message. |
|    `field`     |       `object`        |     Field definition from schema.      |
|    `fields`    |   `arrayOf(string)`   |            Subfields names.            |
|  `fieldType`   |        `func`         |              Field type.               |
|  `findError`   |     `func(name)`      |      Request another field error.      |
|  `findField`   |     `func(name)`      |      Request another field field.      |
|  `findValue`   |     `func(name)`      |      Request another field value.      |
|      `id`      |       `string`        |      Field id - given or random.       |
|    `label`     |       `string`        |              Field label.              |
|     `name`     |       `string`        |              Field name.               |
|   `onChange`   | `func(value, [name])` |          Change field value.           |
|    `parent`    |       `object`        |          Parent field props.           |
| `placeholder`  |       `string`        |           Field placeholder.           |
|    `value`     |         `any`         |              Field value.              |

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
