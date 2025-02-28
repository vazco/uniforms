---
id: migrating-4-to-4
title: Migrating v3 to v4
sidebar_position: 4
---

This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on why certain changes were made, see the [CHANGELOG.md](https://github.com/vazco/uniforms/blob/master/CHANGELOG.md). When migrating to v4, use the newest version. Gradual updates will take more time and won't ease this process.

## Breaking API changes

- `AutoFields` component in all themes now renders a `React.Fragment` instead of a `div`. Explicitly render a wrapper component around if you need one.
- Dropped support for `initialCount` in bridges and `ListField`s. Pass a model object to the form with the appropriate amount of initial items instead.
- Removed the `autoField` prop from `QuickForm`, `AutoForm`, and `AutoFields` components in all themes. Use `AutoField.componentDetectorContext.Provider` instead.
- `componentDetector` in `AutoField` components now always takes precedence over `component` property on a schema. This may make your `AutoField` render a different component when you were using both previously. If that's the case, move your schema's `component` definition to a `AutoField.componentDetectorContext.Provider` instead.
- The constructors for all our bridges now accept an object (e.g., `{schema, validator}`) instead of individual parameters. This applies to `SimpleSchema2Bridge`, `JSONSchemaBridge`, and `ZodBridge`. Please update your constructor calls accordingly.
- `getInitialValue` returns empty array or object instead of `undefined` for `ListField` and `NestField`.
- `Bridge.getProps` method accepts only `name` argument now. Additional arguments are no longer supported.
- Replaced `allowedValues` with `options` prop
- AntD theme uses `v5` of `antd` package. Update your project to use `v5` of `antd` package.
- MUI theme uses `v6` of `@mui/material` package. Update your project to use `v6` of `@mui/material` package.
- Initial render doesn't trigger individual field `onChange` functions anymore. [#1343](https://github.com/vazco/uniforms/pull/1343)

## Deprecated packages

The following packages are deprecated and are no longer supported in v4.0.0.

- Deprecate `uniforms-bootstrap3` package
- Deprecate `uniforms-material` package
- Deprecate `uniforms-bridge-simple-schema` package
- Deprecate `uniforms-bridge-graphql` package

If you want to continue using these packages, we recommend staying with uniforms v3, as we don't guarantee they will work with the newer versions. You can use the following commands to download the `3.10.2` version of the package:

```
npx gitget https://github.com/vazco/uniforms/tree/v3.10.2/packages/<uniforms-package-name>
```
