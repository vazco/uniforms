---
id: api-helpers
title: Helpers
---

## `connectFields` and quaranteed props

These are the guaranteed props for all fields created with `connectField` helper.

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

## `changedKeys`

```js
import changedKeys from 'uniforms/changedKeys';

// Returns an array of changed keys between valueA and valueB, where root is the
// root key.
const arrayOfChangedKeys = changedKeys(root, valueA, valueB);
```

**Note:** For more examples, see [`changedKeys` tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/test/helpers/changedKeys.js).

## `connectField`

```js
import connectField from 'uniforms/connectField';

const ComponentXField = connectField(ComponentX, {
  // Props mapper
  //   Useful for integration with third-party components. For example, you
  //   can rename specific props instead of doing mapping by hand in the
  //   component.
  mapProps: props => props,

  // Base field class
  //   It's reserved for the future - right now there's no useful usecase.
  baseField: BaseField,

  // <input> helper
  //   In React, <input> can't have undefined or null value and any onChange
  //   at once - this option passes 'undefined' as en empty string.
  ensureValue: true,

  // Initial value check
  //   If truthy, then after the first render defaultValue is set as value if
  //   no value is provided (undefined).
  initialValue: true,

  // Additional parent prop
  //   If truthy, additional parent prop is provided (if any). Useful for
  //   nested or complex fields.
  includeParent: false,

  // Field name chain visibility
  //   If truthy, then every nested field name will be prefixed with parent
  //   name.
  includeInChain: true
});
```

## `createSchemaBridge`

```js
import createSchemaBridge from 'uniforms/createSchemaBridge';

// It's rather an internal helper, but it's still exported. Use it, if you want
// to manually create a schema bridge or to test your bridge. It will throw on
// an unrecognised schema.
const bridge = createSchemaBridge(schemaOrBridge);
```

## `createSchemaBridge`.register

```js
// If you want to register a custom bridge.
createSchemaBridge.register(propA, propB, propC /* ... */);
```

## `filterDOMProps`

```js
import filterDOMProps from 'uniforms/filterDOMProps';

// If you create your custom field, then it's a safe way to get rid of all
// uniforms-related props.
const nonUniformsProps = filterDOMProps(props);
```

## `filterDOMProps`.register

```js
// If you want to filter additional props, then you have to register it.
filterDOMProps.register(propA, propB, propC /* ... */);
```

## `filterDOMProps`.registered

```js
// Array of already registered props.
filterDOMProps.registered; // ['propA', 'propB', ...]
```

## `injectName`

```js
import injectName from 'uniforms/injectName';

// It's rather an internal helper, but it's still exported. Injects name to all
// already rendered fields.
const componentWithInjectedName = injectName(name, component);
```

## `joinName`

```js
import joinName from 'uniforms/joinName';

// Use it to safely join partial field names. If you create a custom field with
// subfields, then it's better to use this helper.
const joinedNameString = joinName(nameA, nameB, nameC /* ... */);

// If you want to have a "raw" version of a name, then pass null as the first
// param.
const joinedNameArray = joinName(null, nameA, nameB, nameC /* ... */);
```

## `nothing`

```js
import nothing from 'uniforms/nothing';

// In React@0.14 you can't return null from functional component, but in
// React@15 you should use null - nothing is a "safe null". Basically it's a
// <noscript /> in @0.14 and null in @15.
const emptyJSX = () => nothing;
```

## `randomIds`

```js
import randomIds from 'uniforms/randomIds';

// It's rather an internal helper, but it's still exported. Use it, if you want
// to have some random but deterministic strings.
const predictableRandomIdGenerator = randomIds(prefix);
const predictableRandomIdA = predictableRandomIdGenerator();
const predictableRandomIdB = predictableRandomIdGenerator();
const predictableRandomIdC = predictableRandomIdGenerator();
// ...
```
