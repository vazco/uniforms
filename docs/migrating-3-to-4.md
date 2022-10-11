---
id: migrating-3-to-4
title: Migrating v3 to v4
---

This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on _why_ certain changes were made, see the [`CHANGELOG.md`](https://github.com/vazco/uniforms/blob/master/CHANGELOG.md). When migrating to v4, use the newest version. Gradual updates will take more time and won't ease this process.

## Breaking API changes

- Dropped support for `initialCount` in bridges and `ListField`s. Pass a model object to the form with the appropriate amount of initial items instead.
