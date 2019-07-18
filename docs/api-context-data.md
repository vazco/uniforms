---
id: api-context-data
title: Context data
---

Some components might need to know a current form state, which is passed as `uniforms` in [React context](https://reactjs.org/docs/legacy-context.html).

### Available context data

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

### Accessing context data

A convenient way to access context is to write a helper function, eg. `WithUniforms`, that receives a context and passes it to the children:

```js
import BaseField from 'uniforms/BaseField';

const WithUniforms = ({children}, {uniforms}) => children(uniforms);

WithUniforms.contextTypes = BaseField.contextTypes;
```

You can also directly subscribe to the context inside your field component:

```js
import BaseField from 'uniforms/BaseField';

const MyComponentUsingUniformsContext = (props, {uniforms}) => (
  //Now I have access to the context!
  <input />
);

MyComponentUsingUniformsContext.contextTypes = BaseField.contextTypes;
```
