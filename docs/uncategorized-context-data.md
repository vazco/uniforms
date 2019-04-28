---
id: uncategorized-context-data
title: Context data
---

Some components might need to know a current form state. All this data is passed as `uniforms` in [React context](https://facebook.github.io/react/docs/context.html).

## Available context data

```js
MyComponentUsingUniformsContext.contextTypes = {
  uniforms: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string).isRequired,

    error: PropTypes.any,
    model: PropTypes.object.isRequired,

    schema: PropTypes.shape({
      getError: PropTypes.func.isRequired,
      getErrorMessage: PropTypes.func.isRequired,
      getErrorMessages: PropTypes.func.isRequired,
      getField: PropTypes.func.isRequired,
      getInitialValue: PropTypes.func.isRequired,
      getProps: PropTypes.func.isRequired,
      getSubfields: PropTypes.func.isRequired,
      getType: PropTypes.func.isRequired,
      getValidator: PropTypes.func.isRequired
    }).isRequired,

    state: PropTypes.shape({
      changed: PropTypes.bool.isRequired,
      changedMap: PropTypes.object.isRequired,
      submitting: PropTypes.bool.isRequired,

      label: PropTypes.bool.isRequired,
      disabled: PropTypes.bool.isRequired,
      placeholder: PropTypes.bool.isRequired
    }).isRequired,

    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    randomId: PropTypes.func.isRequired
  }).isRequired
};
```
