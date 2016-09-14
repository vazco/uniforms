**Note:** This page is incomplete. For more, please refer to `index.js` of each package - you can find there all exported components and helpers. Also, go ahead and take a look on tests and source - it's not well documented but readable.

<br>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Helpers](#helpers)
    - [`changedKeys`](#changedkeys)
    - [`connectField`](#connectfield)
    - [`filterDOMProps`](#filterdomprops)
    - [`injectName`](#injectname)
    - [`joinName`](#joinname)
    - [`nothing`](#nothing)
    - [`randomIds`](#randomids)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<br>

# Helpers

## `changedKeys`

```js
import {changedKeys} from 'uniforms';

// Returns array of changed keys between
// valueA and valueB, where root is the
// root key.
const arrayOfChangedKeys = changedKeys(root, valueA, valueB);
```

**Note:** For more examples, see [`changedKeys` tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/test/helpers/changedKeys.js).

## `connectField`

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

## `filterDOMProps`

```js
import {filterDOMProps} from 'uniforms';

// If you create your custom field, then it's a
// safe way to get rid of all uniforms props.
const nonUniformsProps = filterDOMProps(props);

// If you want to filter additional props, then
// you have to register it.
filterDOMProps.register(propA, propB, propC, ...);
```

## `injectName`

```js
import {injectName} from 'uniforms';

// It's rather internal helper, but it's still
// exported. Injects name to all already rendered
// fields.
const componentWithInjectedName = injectName(name, component);
```

## `joinName`

```js
import {joinName} from 'uniforms';

// Use it to safely join partial field names.
// If you create custom field with subfields,
// then it's better to use this helper.
const joinedNameString = joinName(nameA, nameB, nameC, ...);

// If you want to have a "raw" version of a name,
// then pass null as a first param.
const joinedNameArray = joinName(null, nameA, nameB, nameC, ...);
```

## `nothing`

```js
import {nothing} from 'uniforms';

// In React@0.14 you can't return null from
// functional component, but in React@15 you
// should use null - nothing is a "safe null".
// Basically it's a <noscript /> in @0.14 and
// null in @15.
const emptyJSX = () => nothing;
```

## `randomIds`

```js
import {randomIds} from 'uniforms';

// It's rather internal helper, but it's still
// exported. Use it, if you want to have some
// random but deterministic strings.
const safeRandomIdGenerator = randomIds(prefix);
const safeRandomIdA = safeRandomIdGenerator();
const safeRandomIdB = safeRandomIdGenerator();
const safeRandomIdC = safeRandomIdGenerator();
// ...
```
