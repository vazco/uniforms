---
id: tutorials-creating-custom-theme
title: Creating a custom theme
---

We've made hundreds of custom components across dozens of projects, including complete custom themes.
Most of them began as source forks of `uniforms-unstyled` - one simply copies the source
and imports `./some/project/path/uniforms-custom-theme-with-a-cool-name`.

For the purposes of this tutorial we will be using `uniforms-custom-theme` as our custom theme name.

### Copy theme source

Copy source of [uniforms-unstyled](https://github.com/vazco/uniforms/tree/master/packages/uniforms-unstyled) package from uniforms repository, or any other provided theme that you would like to extend, and put it somewhere inside your project, e.g. `./uniforms-custom-theme`.

Now you can start making changes to your own custom theme!

### Import newly created theme

Instead of importing themes from `node_modules` (original uniforms theme packages), simply import theme from your local path.

That's all!

### Referenced issues and pull requests

[#433](https://github.com/vazco/uniforms/issues/433)
[#609](https://github.com/vazco/uniforms/issues/609#issuecomment-545079686)
[#612](https://github.com/vazco/uniforms/pull/612#issuecomment-545643935)
