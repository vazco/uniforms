---
id: migrating-2-to-3
title: Migrating v2 to v3
sidebar_position: 3
---

This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on _why_ certain changes were made, see the [`CHANGELOG.md`](https://github.com/vazco/uniforms/blob/master/CHANGELOG.md). When migrating to v3, use the newest version. Gradual updates will take more time and won't ease this process.

## Breaking API changes

- Context data shape has changed: `changed`, `changedMap`, `submitting`, and `validating` were lifted from the `state` property to the root.
- Removed `AutoForm.state.modelSync`. Use `AutoForm.state.model` instead.
- Removed `BaseField`. Use `connectField` or `useField` instead.
- Removed `BaseForm.getChangedKeys`. Use `changedKeys` directly.
- Removed `BaseForm.state.bridge`. Use `BaseForm.props.schema` instead.
- Removed `Bridge.check`. Without `createSchemaBridge` it's no longer needed.
- Removed `baseField` from `connectField` options. There's no one solution here and it may require additional changes, depending on the usage.
- Removed `createSchemaBridge`. Now all `*Bridge` instances have to be created manually.
  ```diff
    import { SimpleSchema } from 'simpl-schema';
  + import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
    const schema = new SimpleSchema({ /* ... */ });
  - <AutoForm schema={schema} />
  + const bridge = new SimpleSchema2Bridge(schema);
  + <AutoForm schema={bridge} />
  ```
- Removed `ensureValue` from `connectField` options. That means `undefined` will no longer be automatically passed to the field as `''`. Use `value ?? ''` instead. **This option was enabled by default, therefore it will impact all your custom fields**.
- Removed `includeParent` from `connectField` options. Use `useField` as many times as needed instead.
  ```tsx
  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parentField = useField(parentName, {}, { absoluteName: true })[0];
  ```
- Removed `injectName`. In most cases, it can be safely omitted.
- Removed `mapProps` from `connectField` options. Map props directly in the component.
- Removed `nothing`. Use `null` instead.
- Removed all `propTypes` in favor of TypeScript types.
- Renamed or removed deprecated lifecycle methods. If you were using them, e.g. `super.componentWillReceiveProps`, check whether it's still there and use the correct name if needed.
- Renamed `getChildContext*` methods to `getContext*`, e.g. `getChildContextName` -> `getContextName`.
- Synchronous return and throw in `onSubmit` are no longer allowed. To return an error or some result, return a `Promise` instead.
- `filterDOMProps.registered` is now read-only.

## Validation flow changes

- Bridge validators have to return errors instead of throwing them.
  ```diff
    // GraphQL Schema
    function validator(model) {
      if (errors.length) {
  -     throw { details: validator.errors };
  +     return { details: validator.errors };
      }
    }
  ```
  ```diff
    // JSON Schema
    function createValidator(schema) {
      const validator = ajv.compile(schema);
      return (model) => {
        validator(model);
        if (validator.errors && validator.errors.length) {
  -       throw { details: validator.errors };
  +       return { details: validator.errors };
        }
      };
    }
  ```
- Removed `onSubmitSuccess` and `onSubmitFailure`. Perform all needed operations directly in the `onSubmit`:
  ```diff
  - onSubmit={onSubmit}
  - onSubmitSuccess={onSubmitSuccess}
  - onSubmitFailure={onSubmitFailure}
  + onSubmit={model => {
  +   const result = onSubmit(model);
  +   result.then(onSubmitSuccess, onSubmitFailure);
  +   return result;
  + }}`
  ```
- `onValidate` is no longer using callbacks. The error (or the lack of it) has to be returned either synchronously or asynchronously (i.e. wrapped in a promise).
  ```diff
  - onValidate={(model, error, done) => done(error)}
  + onValidate={async (model, error) => error}
  ```

## React Context API

- If you were **not** using `context`, `contextTypes`, `childContextTypes`, or `getChildContext*` methods directly, there's nothing to do.
- For direct context access, use `useForm` hook (functional components), `contextType` static property (class components), or `<context.Consumer />` (both).
  - The React context object, `context`, is exported from the `uniforms` package.

## TypeScript

- A lot of types were added or changed. If you are using TypeScript, you may expect some type errors, as all components are no longer full of `any`.
- `filterDOMProps.register` is now type safe and requires `FilterDOMProps` interface extension.

## Miscellaneous

- For performance reasons `getField`, `getSubfields`, and `getType` of all bridges are now memoized. If possible, do the same for custom bridges for a potential performance gain.
- Simplified `NumField` in most themes as it works as expected in React 16 and later. If you have a custom `NumField` in your project, do revise its implementation for a potential performance gain.
- Stop using direct imports and use named ones instead. It'll let your bundler decide, which version it'll need.
  ```diff
  -import BaseForm from 'uniforms/BaseForm';
  +import { BaseForm } from 'uniforms';
  ```
