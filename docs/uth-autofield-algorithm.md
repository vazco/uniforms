---
id: 'uth-autofield-algorithm'
title: 'AutoField algorithm'
---

## Background

Since the beginning, `AutoField` was an ordinary React component. Then, in [\#741](https://github.com/vazco/uniforms/issues/741), the `kind` parameter of `connectField` was introduced to make certain optimizations possible. To be exact, this parameter made it possible to reduce the overhead of `AutoField` to minimum. The problem is that it increased the complexity of custom themes (or at least keeping them performant).

In [\#800](https://github.com/vazco/uniforms/issues/800), a new way of creating `AutoField` was introduced. Now, instead of a React component, you only specify the component based on its props - the rest is handled in `createAutoField`.

## Default `AutoField` implementation

```tsx
import { createAutoField } from 'uniforms';

const AutoField = createAutoField(props => {
  if (props.component) {
    return props.component;
  }

  if (props.options) {
    return props.checkboxes && props.fieldType !== Array
      ? RadioField
      : SelectField;
  }

  switch (props.fieldType) {
    case Array:
      return ListField;
    case Boolean:
      return BoolField;
    case Date:
      return DateField;
    case Number:
      return NumField;
    case Object:
      return NestField;
    case String:
      return TextField;
  }

  return invariant(false, 'Unsupported field type: %s', props.fieldType);
});
```

## Overriding `AutoField`

If you want to alter the default behavior of `AutoField` and render a different component based on the props, you can do it using the React context available in `AutoField.componentDetectorContext`. You can use it as often as needed - once will be enough in most apps. Example:

```tsx
<AutoField.componentDetectorContext.Provider value={(props, uniforms) => /* ... */}>
  <Application />
</AutoField.componentDetectorContext.Provider>
```

If you want to change the detector only partially, i.e., to render one additional field, and in other cases, use the default algorithm as a fallback, return `AutoField.defaultComponentDetector`. Example:

```tsx
<AutoField.componentDetectorContext.Provider
  value={(props, uniforms) => {
    if (props.useSpecialField) {
      return SpecialField;
    }

    return AutoField.defaultComponentDetector(props, uniforms);
  }}
>
  <Application />
</AutoField.componentDetectorContext.Provider>
```
