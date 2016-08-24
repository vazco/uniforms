**Note:** This page is incomplete. For now, please refer to `index.js` of each package - you can find there all exported components and helpers. Also, go ahead and take a look on tests and source - it's not well documented but readable.

# connectField

```js
import {connectField} from 'uniforms';

const ComponentXField = connectField(ComponentX, {
    // Props mapper
    //   Useful for integration with third-party
    //   components. For example, you can rename
    //   specific props.
    mapProps = props => props,

    // Base field class
    //   It's reserved for the future - right now
    //   there's no useful usecase.
    baseField = BaseField,

    // <input> helper
    //   In React, <input> can't have undefined or
    //   null value and any onChange at once - this
    //   option fallback undefined value to ''.
    ensureValue = true,

    // Initial value check
    //   If truthy, then after the first render
    //   defaultValue is set as value if no value
    //   is provided (undefined).
    initialValue = true,

    // Additional parent prop
    //   If truthy, additional parent prop is
    //   provided (if any). Useful for nested
    //   or complex fields.
    includeParent = false,

    // Field name chain visibility
    //   If truthy, then every nested field name
    //   will be prefixed with parent name.
    includeInChain = true
});
```
