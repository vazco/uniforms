---
id: examples-custom-fields
title: Custom fields
---

### `CompositeField`

This field is a kind of a shortcut for few fields. You can also access all
field props here, like value or onChange for some extra logic.

<!-- FIXME: Add interactive playground -->

### `CustomAutoField`

**Note:** Since v3.1, the preferred way is to create an `AutoField` component is to use the `createAutoField` helper. Also, it's often the case that using the [`AutoField.componentDetectorContext`](/docs/uth-autofield-algorithm#overriding-autofield) is enough.

These are two _standard_ options to define a custom `AutoField`: either using `connectField` or simply taking the code from the [original one](https://github.com/vazco/uniforms/blob/master/packages/uniforms-unstyled/src/AutoField.tsx#L14-L47) _(theme doesn't matter)_ and simply apply own components and/or rules to render components. Below an example with `connectField`.

```tsx
// Remember to choose a correct theme package
import { AutoField } from 'uniforms-unstyled';

const CustomAuto = props => {
  // This way we don't care about unhandled cases - we use default
  // AutoField as a fallback component.
  const Component = determineComponentFromProps(props) || AutoField;

  return <Component {...props} name="" />;
};

const CustomAutoField = connectField(CustomAuto, {
  initialValue: false,
});

const CustomAutoFieldDetector = () => {
  return CustomAutoField;
};

<AutoField.componentDetectorContext.Provider value={CustomAutoFieldDetector}>
  <Application />
</AutoField.componentDetectorContext.Provider>;
```

### `CycleField`

This field works as follows: iterate all allowed values and optionally no-value
state if the field is not required. This one uses Semantic-UI.

<!-- FIXME: Add interactive playground -->

### `DisplayIf`

This simple field component conditionally displays other fields based on input.

<!-- FIXME: Add interactive playground -->

### `ImageField`

<!-- FIXME: Add interactive playground -->

### `RangeField`

This field works as follows: two datepickers are bound to each other.
Value is a `{start, stop}` object.

<!-- FIXME: Add interactive playground -->

### `RatingField`

This field works as follows: render stars for each rating and mark them as
filled, if rating (value) is greater.

<!-- FIXME: Add interactive playground -->

### `SubmitButton`

This field works as follows: render standard submit field and disable it, when
the form is invalid. It's a simplified version of a default SubmitField from
uniforms-unstyled. We use schema from previous examples as a template for validation.

<!-- FIXME: Add interactive playground -->

### `SwapField`

This field works as follows: on click of its child (refresh icon) it swaps values of fieldA
and fieldB. It's that simple.

<!-- FIXME: Add interactive playground -->
