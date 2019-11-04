---
id: api-helpers
title: Helpers
---

## `connectField(component[, options])`

Provides form management related props.

The `connectField` helper is a component wrapper, that provides various props related to the form management.
It also adds the 'Field' suffix to the name of the wrapped component.

The table below lists all of the **guaranteed** props that will be passed to the wrapped component:

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

The `connectField` function accepts two arguments: the first one is a component and the second one is an options object.

The table below lists all available options:

|       Name       |             Type             |                                                                           Description                                                                           |
| :--------------: | :--------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    `mapProps`    |        `func(props)`         | Props mapper. Useful for integration with third-party components. For example, you can rename specific props instead of doing mapping by hand in the component. |
|   `baseField`    | `element` (React compponent) |                                      Base field class. It's reserved for the future - right now there's no useful usecase.                                      |
|  `ensureValue`   |            `bool`            |     `<input>` helper. In React, `<input>` can't have undefined or null value and any onChange at once - this option passes 'undefined' as en empty string.      |
|  `initialValue`  |            `bool`            |                  Initial value check. If truthy, then after the first render defaultValue is set as value if no value is provided (undefined).                  |
| `includeParent`  |            `bool`            |                      Additional parent prop. If truthy, additional parent prop is provided (if any). Useful for nested or complex fields.                       |
| `includeInChain` |            `bool`            |                             Field name chain visibility. If truthy, then every nested field name will be prefixed with parent name.                             |

## `changedKeys(root, valueA, valueB)`

Returns an array of changed keys between `valueA` and `valueB`, where `root` is the root key.

```js
import { changedKeys } from 'uniforms';

const arrayOfChangedKeys = changedKeys(root, valueA, valueB);
```

**Note:** For more examples, see `changedKeys` [tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/__tests__/changedKeys.js).

## `createSchemaBridge(schemaOrBridge)`

Retuns a bridge. (_It's rather an internal helper, but it's still exported._)

Use it, if you want to manually create a schema bridge or to test your bridge.
It will throw on an unrecognised schema.

```js
import { createSchemaBridge } from 'uniforms';

const bridge = createSchemaBridge(schemaOrBridge);
```

## `createSchemaBridge.register(bridge)`

Registers a custom bridge.

```js
import { createSchemaBridge } from 'uniforms';

createSchemaBridge.register(propA, propB, propC /* ... */);
```

## `filterDOMProps(props)`

Removes all uniforms-related props.

```js
import { filterDOMProps } from 'uniforms';

const nonUniformsProps = filterDOMProps(props);
```

## `filterDOMProps.register(propA, propB, propC ...)`

Registers additional props to be filtered.

If you want to filter additional props, then you have to register it.

```js
import { filterDOMProps } from 'uniforms';

filterDOMProps.register(propA, propB, propC /* ... */);
```

## `filterDOMProps.registered`

Returns an array containing already registered props.

```js
import { filterDOMProps } from 'uniforms';

filterDOMProps.register(propA, propB, propC /* ... */);
filterDOMProps.registered; // ['propA', 'propB', ...]
```

## `injectName(name, component)`

Injects name to all already rendered fields. (_It's rather an internal helper, but it's still exported._)

```js
import { injectName } from 'uniforms';

const componentWithInjectedName = injectName(name, component);
```

## `joinName([null, ] nameA, nameB, nameC, ...)`

Safely joins partial field names. When the first param is null, returns a string. Otherwise, returns an array.

If you create a custom field with subfields, then it's better to use this helper.

```js
import { joinName } from 'uniforms';

const joinedNameString = joinName(nameA, nameB, nameC /* ... */);
const joinedNameArray = joinName(null, nameA, nameB, nameC /* ... */);
```

## `nothing`

A safe `null` or `<noscript/>` tag.

In React@0.14 you can't return null from functional component, but in React@15 you should use null.

Basically it's a `<noscript />` in @0.14 and null in @15.

```js
import { nothing } from 'uniforms';

const emptyJSX = () => nothing;
```

## `randomIds([prefix])`

Generates random ID, based on given prefix. (_It's rather an internal helper, but it's still exported._)

Use it, if you want to have some random but deterministic strings. If no prefix is provided, the 'uniforms' prefix will be applied.

```js
import { randomIds } from 'uniforms';

const predictableRandomIdGenerator = randomIds(prefix);

const predictableRandomIdA = predictableRandomIdGenerator();
const predictableRandomIdB = predictableRandomIdGenerator();
```
