---
id: migrating-3-to-4
title: Migrating v3 to v4
---

This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on _why_ certain changes were made, see the [`CHANGELOG.md`](https://github.com/vazco/uniforms/blob/master/CHANGELOG.md). When migrating to v4, use the newest version. Gradual updates will take more time and won't ease this process.

## Breaking API changes

- `AutoFields` component in all themes now renders a `React.Fragment` instead of a `div`. Explicitly render a wrapper component around if you need one.
