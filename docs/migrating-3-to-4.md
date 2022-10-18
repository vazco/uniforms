---
id: migrating-3-to-4
title: Migrating v3 to v4
---

This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on _why_ certain changes were made, see the [`CHANGELOG.md`](https://github.com/vazco/uniforms/blob/master/CHANGELOG.md). When migrating to v4, use the newest version. Gradual updates will take more time and won't ease this process.

## Breaking API changes

- `componentDetector` in `AutoField`s now always takes precedence over `component` property on a schema. This may make your `AutoField` render a different component when you were using both previously. If that's the case, move your schema's `component` definition to a [`AutoField.componentDetectorContext.Provider`](/docs/uth-autofield-algorithm/#overriding-autofield) instead.
- Dropped support for `initialCount` in bridges and `ListField`s. Pass a model object to the form with the appropriate amount of initial items instead.
- `AutoFields` component in all themes now renders a `React.Fragment` instead of a `div`. Explicitly render a wrapper component around if you need one.
