---
id: api-helpers
title: Helpers
---

## `connectField(component[, options])`

Provides form management related props.

The `connectField` helper is a component wrapper, that provides various props related to the form management.
It also adds the 'Field' suffix to the name of the wrapped component.

The table below lists all of the **guaranteed** props that will be passed to the wrapped component:

|       Name        |         Type          |              Description               |
| :---------------: | :-------------------: | :------------------------------------: |
|     `changed`     |        `bool`         |           Has field changed?           |
|    `disabled`     |        `bool`         |           Is field disabled?           |
|      `error`      |       `object`        | Field scoped part of validation error. |
|  `errorMessage`   |       `string`        | Field scoped validation error message. |
|      `field`      |       `object`        |     Field definition from schema.      |
|     `fields`      |   `arrayOf(string)`   |            Subfields names.            |
|    `fieldType`    |        `func`         |              Field type.               |
|       `id`        |       `string`        |      Field id - given or random.       |
|      `label`      |       `string`        |              Field label.              |
|      `name`       |       `string`        |              Field name.               |
|    `onChange`     | `func(value, [name])` |          Change field value.           |
|   `placeholder`   |       `string`        |           Field placeholder.           |
| `showInlineError` |       `boolean`       |           Show inline error?           |
|      `value`      |         `any`         |              Field value.              |

The `connectField` function accepts two arguments: the first one is a component and the second one is an options object.

The table below lists all available options:

|      Name      |         Type         |                                                             Description                                                              |
| :------------: | :------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| `initialValue` |        `bool`        | Initial value check. If `true`, then after the first render the default value is set as value if no value is provided (`undefined`). |
|     `kind`     | `'leaf'` or `'node'` |                                Defines field type. If you are not sure which one to use, use `node`.                                 |

## `changedKeys(root, valueA, valueB)`

Returns an array of changed keys between `valueA` and `valueB`, where `root` is the root key.

```js
import { changedKeys } from 'uniforms';

const arrayOfChangedKeys = changedKeys(root, valueA, valueB);
```

**Note:** For more examples, see `changedKeys` [tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/__tests__/changedKeys.js).

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

## `joinName([null, ] nameA, nameB, nameC, ...)`

Safely joins partial field names. When the first param is null, returns an array. Otherwise, returns a string.

If you create a custom field with subfields, then it's better to use this helper.

```js
import { joinName } from 'uniforms';

const joinedNameArray = joinName(null, nameA, nameB, nameC /* ... */);
const joinedNameString = joinName(nameA, nameB, nameC /* ... */);
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
