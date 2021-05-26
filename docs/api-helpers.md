---
id: api-helpers
title: Helpers
---

## `connectField`

Provides form management related props. The `connectField` helper is a component wrapper, that provides various props related to the form management. It also adds the `Field` suffix to the name of the wrapped component.

The table below lists all of the **guaranteed** props that will be passed to the wrapped component:

|       Name        |         Type          |              Description               |
| :---------------: | :-------------------: | :------------------------------------: |
|     `changed`     |       `boolean`       |           Has field changed?           |
|    `disabled`     |       `boolean`       |           Is field disabled?           |
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
|    `readOnly`     |       `boolean`       |          Is field read-only?           |
| `showInlineError` |       `boolean`       |           Show inline error?           |
|      `value`      |         `any`         |              Field value.              |

The `connectField` function accepts two arguments: the first one is a component and the second one is an `options` object.

```tsx
function Example(props) {
  /* ... */
}

const ExampleField = connectField(Example, options);
```

The table below lists all available options:

|      Name      |         Type         |                                                             Description                                                              |
| :------------: | :------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| `initialValue` |      `boolean`       | Initial value check. If `true`, then after the first render the default value is set as value if no value is provided (`undefined`). |
|     `kind`     | `'leaf'` or `'node'` |                                                   See [Field kinds](#field-kinds).                                                   |

### Field kinds

Every field is either a _leaf_ or _node_ field. In the future, we could introduce new kinds to enable even more optimizations.

- _Leaf_ fields cannot have subfields. This allows us to perform some optimizations, like skipping the extra `Provider` from `connectField`, effectively reducing the overhead down to a single `useField` call.
  - It includes all input fields, like `NumField`, `SelectField` or `TextField`.
- _Node_ fields can have subfields. Fields of the _leaf_ kind cannot have subfields.
  - It includes all combined and layout fields, like `ListField` or `NestField`.

If you are not sure which one to use, do not use the `kind` option at all - it'll default to the safest option (right now it's `node`).

## `changedKeys`

Returns an array of changed keys between `valueA` and `valueB`, where `root` is the root key. For examples see [`changedKeys` tests](https://github.com/vazco/uniforms/blob/master/packages/uniforms/__tests__/changedKeys.ts).

```tsx
import { changedKeys } from 'uniforms';

changedKeys('a', { b: 1, c: 2 }, { b: 1 }); // ['a', 'a.c']
```

## `filterDOMProps`

Removes all uniforms-related props, registered with `filterDOMProps.register`. Use it in all places where you'd like to pass all unrelated props down and `useField` or `connectField` provide you with the props.

```tsx
import { filterDOMProps } from 'uniforms';

const filteredProps = filterDOMProps(props);
```

### Custom props

It's often the case that your custom components will have a bunch of known properties, like `locale` or `userType`. To ease the process of using them across the project, you can register them to make `filterDOMProps` remove them as well. For example, [`SimpleSchemaBridge`](https://github.com/vazco/uniforms/blob/master/packages/uniforms-bridge-simple-schema/src/register.ts) registers all of the SimpleSchema-specific options.

```tsx
import { filterDOMProps } from 'uniforms';

filterDOMProps({ example: 42 }); // { example: 42 }
filterDOMProps.registered.includes('example'); // false
filterDOMProps.register('example');
filterDOMProps.registered.includes('example'); // true
filterDOMProps({ example: 42 }); // {}
```

As `filterDOMProps` is fully typed, if you'd like to make it work with TypeScript, you have to extend the `FilterDOMProps` interface as well.

```tsx
declare module 'uniforms' {
  interface FilterDOMProps {
    propA: never;
    propB: never;
  }
}

filterDOMProps.register('propA', 'propB');
```

## `joinName`

Safely joins partial field names. When the first param is null, returns an array of strings. Otherwise, returns a string. If you create a custom field with subfields, then it's better to use this helper than manually concatenating them.

```tsx
import { joinName } from 'uniforms';

joinName(null, 'a', 'b.c', 'd'); // ['a', 'b', 'c', 'd']
joinName('a', 'b.c', 'd'); // 'a.b.c.d'
```

## `randomIds`

Generates random ID, based on given prefix. Use it, if you want to have random but deterministic strings. If no prefix is provided, a unique 'uniforms-X' prefix will be used generated.

```tsx
import { randomIds } from 'uniforms';

const randomId1 = randomIds();
randomId1(); // uniforms-0000-0000
randomId1(); // uniforms-0000-0001
randomId1(); // uniforms-0000-0002

const randomId2 = randomIds();
randomId2(); // uniforms-0001-0000
randomId2(); // uniforms-0001-0001
randomId2(); // uniforms-0001-0002

const randomId3 = randomIds('prefix');
randomId3(); // prefix-0000
randomId3(); // prefix-0001
randomId3(); // prefix-0002
```

## `useField`

A hook version of [`connectField`](#connectfield). It receives three arguments: field name (string), field props (object), and optional options.

```tsx
function Example(props) {
  const [fieldProps, context] = useField(props.name, props, options);
  return <input {...filterDOMProps(fieldProps)} />;
}
```

The table below lists all available options:

|      Name      |   Type    |                                                             Description                                                              |
| :------------: | :-------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| `absoluteName` | `boolean` |                                              If `true`, ignores the name from context.                                               |
| `initialValue` | `boolean` | Initial value check. If `true`, then after the first render the default value is set as value if no value is provided (`undefined`). |
