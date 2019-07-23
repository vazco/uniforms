---
id: 'uth-autofield-algorithm'
title: 'Autofield algorithm'
---

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

    invariant(
      component,
      'Unsupported field type: %s',
      props.fieldType.toString()
    );
  }
}
```
