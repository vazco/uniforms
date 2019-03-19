## Next

- **Breaking:** Separated schema packages. These are now:

  ```
  uniforms-bridge-graphql
  uniforms-bridge-json-schema
  uniforms-bridge-simple-schema
  uniforms-bridge-simple-schema-2
  ```

  To register a new schema, import `uniforms-bridge-X` or `uniforms-bridge-X/register` directly. Named exports and file names haven't changed, so imports looks like this:

  ```diff
  // GraphQL
  -import {GraphQLBridge} from 'uniforms';
  +import {GraphQLBridge} from 'uniforms-bridge-graphql';

  -import GraphQLBridge from 'uniforms/GraphQLBridge';
  +import GraphQLBridge from 'uniforms-bridge-graphql/GraphQLBridge';

  // JSON Schema
  -import {JSONSchemaBridge} from 'uniforms';
  +import {JSONSchemaBridge} from 'uniforms-bridge-graphql';

  -import JSONSchemaBridge from 'uniforms/JSONSchemaBridge';
  +import JSONSchemaBridge from 'uniforms-bridge-json-schema/JSONSchemaBridge';

  // SimpleSchema (Atmosphere version for Meteor)
  -import {SimpleSchemaBridge} from 'uniforms';
  +import {SimpleSchemaBridge} from 'uniforms-bridge-simple-schema';

  -import SimpleSchemaBridge from 'uniforms/SimpleSchemaBridge';
  +import SimpleSchemaBridge from 'uniforms-bridge-simple-schema/SimpleSchemaBridge';

  // SimpleSchema (npm version)
  -import {SimpleSchema2Bridge} from 'uniforms';
  +import {SimpleSchema2Bridge} from 'uniforms-bridge-simple-schema-2';

  -import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';
  +import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2/SimpleSchema2Bridge';
  ```

- **Breaking:** Packages depending on the `uniforms` package are now using `dependency` instead of the `peerDependency`. Same goes for the schema packages and their schema respectives:
  ```
  uniforms-bridge-graphql ~> graphql
  uniforms-bridge-simple-schema-2 ~> simpl-schema
  ```
- **Breaking:** Removed `jsnext:main` and `module` from `package.json` in all packages. It means that bundlers like Webpack will load the fully transpiled version now. It caused more troubles than it's worth. The original sources are still shipped in `src` directory.
- **Breaking:** `QuickForm.render` logic was moved to `QuickForm.getNativeFormProps`. `BaseForm` is now the only form component with an explicit `render` method, what is good for custom themes and form components.
- **Feature:** Added `createSchemaBridge.register` for registering custom bridges.
- **Feature:** Added `onSubmit` to the context data. Now every field can trigger the submit directly, without the form ref.

## [v1.31.1](https://github.com/vazco/uniforms/tree/v1.31.1) (2019-03-06)

- **Fixed:** `SelectField` required state in `uniforms-material`. [\#512](https://github.com/vazco/uniforms/issues/512)
- **Fixed:** `NumField` value parsing in `uniforms-material`. [\#516](https://github.com/vazco/uniforms/issues/516)

## [v1.31.0](https://github.com/vazco/uniforms/tree/v1.31.0) (2019-01-23)

- **Added:** Support for `$ref` property in `JSONSchemaBridge`. [\#507](https://github.com/vazco/uniforms/issues/507)
- **Fixed:** Warnings introduced in `1.30.0` in `uniforms-material` theme. [\#501](https://github.com/vazco/uniforms/issues/501)
- **Fixed:** Few style problems, by using differents components in `uniforms-material` theme. [\#505](https://github.com/vazco/uniforms/issues/505)

## [v1.30.0](https://github.com/vazco/uniforms/tree/v1.30.0) (2019-01-05)

- **Added:** New `variant` prop in most `uniforms-material` fields. [\#495](https://github.com/vazco/uniforms/issues/495)
- **Changed:** Default SubmitField `variant` in uniforms-material. Minimum version of `@material-ui/core` is now `1.2.0`. [\#498](https://github.com/vazco/uniforms/issues/498)

## [v1.29.0](https://github.com/vazco/uniforms/tree/v1.29.0) (2018-12-05)

- **Added:** Support for `placeholder` in `SelectField` in `uniforms-material`. [\#489](https://github.com/vazco/uniforms/issues/489)
- **Fixed:** Handling of default values in `ListField`.
- **Fixed:** Warning caused by `setState` on an unmounted component. [\#490](https://github.com/vazco/uniforms/issues/490)
- **Fixed:** Versioning scheme - no more `file:../uniforms`.

## [v1.28.0](https://github.com/vazco/uniforms/tree/v1.28.0) (2018-11-25)

- **Added:** Field `label` now defaults to `title` in `JSONSchemaBridge`. [\#488](https://github.com/vazco/uniforms/issues/488)
- **Added:** Proper styling for `SelectField` in `uniforms-semantic`. [\#482](https://github.com/vazco/uniforms/issues/482)
- **Added:** New `labelProps` props in `DateField` and `SelectField` in `uniforms-material`. [\#485](https://github.com/vazco/uniforms/issues/485)
- **Added:** New `submitting` and `validating` states in context. [\#449](https://github.com/vazco/uniforms/issues/449)

## [v1.27.0](https://github.com/vazco/uniforms/tree/v1.27.0) (2018-10-23)

## [v1.27.0-rc.2](https://github.com/vazco/uniforms/tree/v1.27.0-rc.2) (2018-10-12)

- **Changed:** Added necessary `invariant` and `warning` dependencies as React no longer depends on `fbjs`. [\#475](https://github.com/vazco/uniforms/issues/475)

## [v1.27.0-rc.1](https://github.com/vazco/uniforms/tree/v1.27.0-rc.1) (2018-10-06)

- **Added:** Support for `@material-ui/core@3.0.0`.
- **Changed:** Minimum version of `@material-ui/core` is 1.5.1, due to Babel updated.
- **Changed:** No `core-js` polyfills are automatically included.
- **Fixed:** Leaking `checkboxes` prop in `uniforms-antd`.
- **Fixed:** Renamed few internals to preserve default `displayName`s.

## [v1.26.0](https://github.com/vazco/uniforms/tree/v1.26.0) (2018-10-02)

- **Changed:** Updated `graphql` dependency. [\#467](https://github.com/vazco/uniforms/issues/467)
- **Fixed:** Extracting `fieldType` for `GraphQLBridge`. [\#460](https://github.com/vazco/uniforms/issues/460)
- **Fixed:** Leaking rejections in `ValidatedForm`. [\#471](https://github.com/vazco/uniforms/issues/471)
- **Fixed:** `RadioField` handles error and help texts without warnings in `uniforms-material`.

## [v1.25.0](https://github.com/vazco/uniforms/tree/v1.25.0) (2018-07-20)

## [v1.25.0-rc.3](https://github.com/vazco/uniforms/tree/v1.25.0-rc.3) (2018-06-27)

- **Changed:** We are using Babel@7 now!

## [v1.25.0-rc.2](https://github.com/vazco/uniforms/tree/v1.25.0-rc.2) (2018-06-10)

- **Fixed:** Explicitly pass `text` prop in `TextField` in `uniforms-material`.

## [v1.25.0-rc.1](https://github.com/vazco/uniforms/tree/v1.25.0-rc.1) (2018-06-05)

- **Changed:** Updated `uniforms-material` to `@material-ui/core`. [\#349](https://github.com/vazco/uniforms/issues/349)

## [v1.24.5](https://github.com/vazco/uniforms/tree/v1.24.5) (2018-05-30)

- **Fixed:** Added `wrapperStyle` to `filterDOMProps` defaults. [\#430](https://github.com/vazco/uniforms/issues/430)
- **Fixed:** `ListAddField` now clones given `value` to not keep its reference. [\#428](https://github.com/vazco/uniforms/issues/428)

## [v1.24.4](https://github.com/vazco/uniforms/tree/v1.24.4) (2018-05-27)

- **Fixed:** Placeholders are now working with disabled labels on `GraphQLBridge` and `JSONSchemaBridge`. [\#421](https://github.com/vazco/uniforms/issues/421)
- **Fixed:** `SubmitField` labels.

## [v1.24.3](https://github.com/vazco/uniforms/tree/v1.24.3) (2018-05-07)

- **Fixed:** `ListAddField` and `ListDelField` in `uniforms-bootstrap4` now use `.badge` instead of `.label` styling. [\#419](https://github.com/vazco/uniforms/issues/419)

## [v1.24.2](https://github.com/vazco/uniforms/tree/v1.24.2) (2018-04-25)

- **Added:** Support for `rows` in `LongTextField` in `uniforms-bootstrap3`. [\#418](https://github.com/vazco/uniforms/issues/418)
- **Fixed:** Prop `style` was incorrectly used in `uniforms-antd`, therefore it was renamed to `wrapperStyle`. [\#416](https://github.com/vazco/uniforms/issues/416)

## [v1.24.1](https://github.com/vazco/uniforms/tree/v1.24.1) (2018-04-13)

- **Fixed:** Invalid publish occurred. Sorry!

## [v1.24.0](https://github.com/vazco/uniforms/tree/v1.24.0) (2018-04-06)

- **Added:** Support for `style` in `uniforms-antd`. [\#404](https://github.com/vazco/uniforms/issues/404)
- **Fixed:** Added `allowedValues` to `filterDOMProps` defaults. [\#403](https://github.com/vazco/uniforms/issues/403)

## [v1.23.2](https://github.com/vazco/uniforms/tree/v1.23.2) (2018-03-18)

- **Fixed:** Added `transform` to `filterDOMProps` defaults. [\#399](https://github.com/vazco/uniforms/issues/399)

## [v1.23.1](https://github.com/vazco/uniforms/tree/v1.23.1) (2018-03-05)

- **Fixed:** Got rid of React warning triggered during form reset.

## [v1.23.0](https://github.com/vazco/uniforms/tree/v1.23.0) (2018-01-12)

## [v1.23.0-rc.2](https://github.com/vazco/uniforms/tree/v1.23.0-rc.2) (2018-01-10)

- **Changed:** If `onSubmit` rejects, it's treated as a form error.
- **Fixed:** `form.submit` correctly rejects on validation error.

## [v1.23.0-rc.1](https://github.com/vazco/uniforms/tree/v1.23.0-rc.1) (2017-12-29)

- **Added:** Support for `antd@3.0.0`. [\#372](https://github.com/vazco/uniforms/issues/372)

## [v1.22.2](https://github.com/vazco/uniforms/tree/v1.22.2) (2017-12-11)

- **Fixed:** Passing an empty string to `ListField` and `NestField`. [\#366](https://github.com/vazco/uniforms/issues/366)

## [v1.22.1](https://github.com/vazco/uniforms/tree/v1.22.1) (2017-11-08)

- **Fixed:** Hiding rejected promises. [\#362](https://github.com/vazco/uniforms/issues/362)

## [v1.22.0](https://github.com/vazco/uniforms/tree/v1.22.0) (2017-10-30)

## [v1.22.0-rc.4](https://github.com/vazco/uniforms/tree/v1.22.0-rc.4) (2017-10-26)

- **Added:** Support for `wrapClassName` in `uniforms-semantic`. [\#358](https://github.com/vazco/uniforms/issues/358)
- **Fixed:** Removed `babel-plugin-transform-react-inline-elements`. [\#359](https://github.com/vazco/uniforms/issues/359)

## [v1.22.0-rc.3](https://github.com/vazco/uniforms/tree/v1.22.0-rc.3) (2017-10-20)

- **Fixed:** Clearing `DateField`. [\#357](https://github.com/vazco/uniforms/issues/357)

## [v1.22.0-rc.2](https://github.com/vazco/uniforms/tree/v1.22.0-rc.2) (2017-10-16)

- **Fixed:** Invalid prop warning in `uniforms-bootstrap3` and `uniforms-bootstrap4`. [\#350](https://github.com/vazco/uniforms/issues/350)

## [v1.22.0-rc.1](https://github.com/vazco/uniforms/tree/v1.22.0-rc.1) (2017-10-13)

- **Added:** Support for `GraphQLID` in `GraphQLBridge`. [\#281](https://github.com/vazco/uniforms/issues/281)
- **Added:** Support for JSON schema. [\#353](https://github.com/vazco/uniforms/issues/353)
- **Added:** Support for React@16. [\#351](https://github.com/vazco/uniforms/issues/351)
- **Changed:** Field `error` prop is not changing from `null` to `undefined` after validation.

## [v1.21.0](https://github.com/vazco/uniforms/tree/v1.21.0) (2017-09-28)

- **Added:** Support for `checkbox` in `BoolField` in `uniforms-antd`. [\#348](https://github.com/vazco/uniforms/issues/348)

## [v1.20.4](https://github.com/vazco/uniforms/tree/v1.20.4) (2017-09-22)

- **Fixed:** Refreshing fields on form state change. [\#347](https://github.com/vazco/uniforms/issues/347)

## [v1.20.3](https://github.com/vazco/uniforms/tree/v1.20.3) (2017-09-18)

- **Fixed:** Invalid publish occurred. Sorry!

## [v1.20.2](https://github.com/vazco/uniforms/tree/v1.20.2) (2017-09-16)

- **Fixed:** Passing `type` prop in `TextField` in `uniforms-antd`. [\#345](https://github.com/vazco/uniforms/issues/345)

## [v1.20.1](https://github.com/vazco/uniforms/tree/v1.20.1) (2017-08-26)

- **Fixed:** Missing `Boolean` type in `GraphQLBridge`. [\#335](https://github.com/vazco/uniforms/issues/335)
- **Fixed:** Position of inline error in `BoolField` in `uniforms-semantic`. [\#338](https://github.com/vazco/uniforms/issues/338)

## [v1.20.0](https://github.com/vazco/uniforms/tree/v1.20.0) (2017-08-07)

- **Changed:** Moved from `lodash.x` packages to `lodash/x`. It will increase `node_modules` size but probably reduce your bundle size as many projects are already using `lodash` which lead to having both `lodash.x` and `lodash/x` in the bundle.
- **Fixed:** Warning in `SelectField` in `uniforms-antd`.

## [v1.19.1](https://github.com/vazco/uniforms/tree/v1.19.1) (2017-07-08)

- **Fixed:** Removed unnecessary published files.

## [v1.19.0](https://github.com/vazco/uniforms/tree/v1.19.0) (2017-07-08)

- **Changed:** Additional props are passed to the rendered `div` in `NestField` in `uniforms-antd`.
- **Changed:** Additional props are passed to the rendered `div` in `wrapField` in both `uniforms-bootstrap3` and `uniforms-bootstrap4`.
- **Changed:** Now `gridClassName` always returns a string in both `uniforms-bootstrap3` and `uniforms-bootstrap4`.
- **Changed:** `ErrorsField` is now styled in both `uniforms-bootstrap3` and `uniforms-bootstrap4`. [\#301](https://github.com/vazco/uniforms/issues/301)
- **Fixed:** Added missing `LongTextField` label `htmlFor` in `uniforms-semantic`.
- **Fixed:** Added missing `placeholder` prop in `SelectField` in `uniforms-antd`.
- **Fixed:** `HiddenField` now behaves the same in every theme.
- **Fixed:** `RadioField` spacing in `uniforms-bootsrap4`. [\#304](https://github.com/vazco/uniforms/issues/304)
- **Fixed:** Pass `hintText` prop instead of `placeholder` in `LongTextField` in `uniforms-material`.

## [v1.18.2](https://github.com/vazco/uniforms/tree/v1.18.2) (2017-06-09)

- **Fixed:** `SubmitField` respects `disabled` prop.

## [v1.18.1](https://github.com/vazco/uniforms/tree/v1.18.1) (2017-05-28)

- **Changed:** Optimized `BaseField` props calculation.
- **Changed:** Switched to `prop-types`.
- **Fixed:** `Bridge.check` error message.

## [v1.18.0](https://github.com/vazco/uniforms/tree/v1.18.0) (2017-04-30)

- **Changed:** Inline errors are now triggered by `error`, not `errorMessage`. [\#267](https://github.com/vazco/uniforms/issues/267)
- **Fixed:** Removed unknown prop warning when defining component in schema. [\#284](https://github.com/vazco/uniforms/issues/284)

## [v1.17.2](https://github.com/vazco/uniforms/tree/v1.17.2) (2017-04-12)

- **Fixed:** Detection of SimpleSchema.
- **Fixed:** Warning in empty `BoolField` in `uniforms-antd`.

## [v1.17.1](https://github.com/vazco/uniforms/tree/v1.17.1) (2017-04-10)

- **Fixed:** Removed unnecessary line in `ListField` in `uniforms-semantic`.

## [v1.17.1-beta.1](https://github.com/vazco/uniforms/tree/v1.17.1-beta.1) (2017-04-08)

- **Fixed:** Fields props precedence. [\#262](https://github.com/vazco/uniforms/issues/262)

## [v1.17.0](https://github.com/vazco/uniforms/tree/v1.17.0) (2017-04-05)

- **Added:** Support for few props in `DateField` in `uniforms-material`. [\#246](https://github.com/vazco/uniforms/issues/246)
- **Added:** Support for GraphQL inputs in `GraphQLBridge`. [\#244](https://github.com/vazco/uniforms/issues/244)
- **Fixed:** Removing non-edited list items.

## [v1.16.0](https://github.com/vazco/uniforms/tree/v1.16.0) (2017-03-24)

- **Added:** Support for `multiple` in `SelectField` in `uniforms-material`. [\#236](https://github.com/vazco/uniforms/issues/236)
- **Changed:** Internal handling of `changed` and `changedMap`.
- **Changed:** Optimized whole rendering process.
- **Changed:** Rewritten `AutoField`.
- **Fixed:** Autosave is no longer triggering a submit on render. [\#238](https://github.com/vazco/uniforms/issues/238)

## [v1.15.0](https://github.com/vazco/uniforms/tree/v1.15.0) (2017-03-12)

- **Added:** Support for `colon` and `required` in `uniforms-antd`. [\#229](https://github.com/vazco/uniforms/issues/229)
- **Added:** Support for `grouped` in `uniforms-semantic`. [\#227](https://github.com/vazco/uniforms/issues/227)
- **Added:** Support for `material-ui@0.17` in `uniforms-material`. [\#232](https://github.com/vazco/uniforms/issues/232)

## [v1.14.0](https://github.com/vazco/uniforms/tree/v1.14.0) (2017-03-06)

- **Added:** Additional babel transforms to reduce bundle size.
- **Added:** Support for `labelCol` and `wrapperCol` in `uniforms-antd`. [\#207](https://github.com/vazco/uniforms/issues/207)

## [v1.13.1](https://github.com/vazco/uniforms/tree/v1.13.1) (2017-03-02)

- **Fixed:** Peer dependencies versions.

## [v1.13.0](https://github.com/vazco/uniforms/tree/v1.13.0) (2017-03-01)

- **Added:** Passing through all unused props in some fields in `uniforms-antd`. [\#203](https://github.com/vazco/uniforms/issues/203)
- **Added:** Support for `rows` in `LongTextField` in `uniforms-bootstrap4`. [\#208](https://github.com/vazco/uniforms/issues/208)
- **Fixed:** Removed `TextField` warning in `uniforms-material`. [\#205](https://github.com/vazco/uniforms/issues/205)

## [v1.12.1](https://github.com/vazco/uniforms/tree/v1.12.1) (2017-02-25)

- **Fixed:** `HiddenField` display name.
- **Fixed:** Handling of negative numbers in `NumField`.
- **Fixed:** Unnecessary `onSubmit` after mount with `autosave`. [\#204](https://github.com/vazco/uniforms/issues/204)

## [v1.12.0](https://github.com/vazco/uniforms/tree/v1.12.0) (2017-02-19)

- **Added:** Support for `itemProps` in `ListField` in `uniforms-antd`.
- **Added:** Support for `itemProps` in `NestField`. [\#181](https://github.com/vazco/uniforms/issues/181)
- **Fixed:** Handling of arrays in SimpleSchema@2. [\#200](https://github.com/vazco/uniforms/issues/200)

## [v1.11.3](https://github.com/vazco/uniforms/tree/v1.11.3) (2017-02-16)

- **Added:** Support for SimpleSchema2@0.2. [\#198](https://github.com/vazco/uniforms/issues/198)
- **Fixed:** Handling of no value in multiple select in `uniforms-antd`. [\#199](https://github.com/vazco/uniforms/issues/199)

## [v1.11.2](https://github.com/vazco/uniforms/tree/v1.11.2) (2017-02-14)

- **Fixed:** Multiple select in `uniforms-antd`.

## [v1.11.1](https://github.com/vazco/uniforms/tree/v1.11.1) (2017-02-14)

- **Fixed:** Removed Meteor missing module warning. [\#197](https://github.com/vazco/uniforms/issues/197)

## [v1.11.0](https://github.com/vazco/uniforms/tree/v1.11.0) (2017-02-14)

- **Added:** Field rendered outside of a form throws an error.
- **Added:** Support for `appearance` prop in `BoolField` in `uniforms-material`. [\#189](https://github.com/vazco/uniforms/issues/189)
- **Changed:** Use `children` instead of specified props in `ListAddField` in `uniforms-material`.
- **Changed:** Use `children` instead of specified props in `ListDelField` in `uniforms-material`.
- **Fixed:** Handling of `decimal` in `NumField`. [\#167](https://github.com/vazco/uniforms/issues/167)
- **Fixed:** Handling of `defaultValue` in `SimpleSchema2Bridge`. [\#182](https://github.com/vazco/uniforms/issues/182)
- **Fixed:** Removed `DateField` warning in `uniforms-material`.
- **Fixed:** `ListAddField` in `uniforms-material`.
- **Fixed:** `ListDelField` in `uniforms-material`.

## [v1.10.0](https://github.com/vazco/uniforms/tree/v1.10.0) (2017-02-07)

- **Added:** AntD theme. [\#134](https://github.com/vazco/uniforms/issues/134)
- **Added:** Material UI theme. [\#142](https://github.com/vazco/uniforms/issues/142)
- **Added:** Support for Bootstrap4@alpha.6. [\#170](https://github.com/vazco/uniforms/issues/170)
- **Added:** Support for `initialValue` in `GraphQLBridge`. [\#183](https://github.com/vazco/uniforms/issues/183)
- **Changed:** All `<section>`s tags are now `<div>`s. [\#172](https://github.com/vazco/uniforms/issues/172)

## [v1.9.0](https://github.com/vazco/uniforms/tree/v1.9.0) (2017-01-21)

- **Added:** Online demo [uniforms.tools](https://uniforms.tools/). [\#156](https://github.com/vazco/uniforms/issues/156)
- **Added:** Support for SimpleSchema2@0.1.x.
- **Added:** Support for `step` prop in `NumField`. [\#165](https://github.com/vazco/uniforms/issues/165)

## [v1.8.4](https://github.com/vazco/uniforms/tree/v1.8.4) (2017-01-14)

- **Fixed:** Handling of `initialValue`. [\#164](https://github.com/vazco/uniforms/issues/164)

## [v1.8.3](https://github.com/vazco/uniforms/tree/v1.8.3) (2017-01-06)

- **Fixed:** Handling of additional error in `ValidatedForm`. [\#161](https://github.com/vazco/uniforms/issues/161)

## [v1.8.2](https://github.com/vazco/uniforms/tree/v1.8.2) (2017-01-06)

- **Fixed:** Propagation of labels and placeholders.

## [v1.8.1](https://github.com/vazco/uniforms/tree/v1.8.1) (2016-12-30)

- **Fixed:** Placeholder text from schema. [\#152](https://github.com/vazco/uniforms/issues/152)

## [v1.8.0](https://github.com/vazco/uniforms/tree/v1.8.0) (2016-12-19)

- **Added:** Support for direct imports, i.e. `import connectField from 'uniforms'`. [\#129](https://github.com/vazco/uniforms/issues/129)
- **Fixed:** Optional packages resolution in Webpack. [\#150](https://github.com/vazco/uniforms/issues/150)
- **Fixed:** Reset of a form with a model. [\#140](https://github.com/vazco/uniforms/issues/140)

## [v1.7.1](https://github.com/vazco/uniforms/tree/v1.7.1) (2016-12-04)

- **Fixed:** Handling of `label` in `GraphQLBridge`.
- **Fixed:** Got rid of unknown props warning in semantic theme.
- **Fixed:** Extraneous option in `SelectField` in semantic theme.
- **Fixed:** Extraneous option in `SelectField` in unstyled theme.

## [v1.7.0](https://github.com/vazco/uniforms/tree/v1.7.0) (2016-11-28)

## [v1.7.0-beta.1](https://github.com/vazco/uniforms/tree/v1.7.0-beta.1) (2016-11-27)

- **Added:** New `modelTransform` prop in `BaseForm`. [\#123](https://github.com/vazco/uniforms/issues/123)

## [v1.6.0](https://github.com/vazco/uniforms/tree/v1.6.0) (2016-11-21)

## [v1.6.0-beta.4](https://github.com/vazco/uniforms/tree/v1.6.0-beta.4) (2016-11-19)

- **Fixed:** Handling of initial values. [\#135](https://github.com/vazco/uniforms/issues/135)

## [v1.6.0-beta.3](https://github.com/vazco/uniforms/tree/v1.6.0-beta.3) (2016-11-19)

- **Changed:** Components created with `connectField` have now different `displayName` to match forms inheritance.
- **Fixed:** Handling of `defaultValue` in `SimpleSchema2Bridge`. [\#130](https://github.com/vazco/uniforms/issues/130)

## [v1.6.0-beta.2](https://github.com/vazco/uniforms/tree/v1.6.0-beta.2) (2016-11-13)

- **Fixed:** GraphQL conditional import.

## [v1.6.0-beta.1](https://github.com/vazco/uniforms/tree/v1.6.0-beta.1) (2016-11-13)

- **Changed:** Added GraphQL schema support. [\#118](https://github.com/vazco/uniforms/issues/118)
- **Changed:** Optimized build size.
- **Changed:** Removed `invariant` and `warning` dependencies.
- **Changed:** `Bridge` cannot be instantiated.
- **Changed:** `Bridge` constructor is now noop.
- **Changed:** `Bridge` methods are now throwing an _unimplemented method_ errors.

## [v1.5.0](https://github.com/vazco/uniforms/tree/v1.5.0) (2016-11-05)

- **Fixed:** Got rid of unknown props warning in bootstrap themes.
- **Fixed:** SimpleSchema validator.

## [v1.5.0-rc.1](https://github.com/vazco/uniforms/tree/v1.5.0-rc.1) (2016-11-02)

- **Added:** New `showInlineError` prop in `BaseForm`. [\#87](https://github.com/vazco/uniforms/issues/87)
- **Added:** New `showInlineError` prop in `ListField`. [\#100](https://github.com/vazco/uniforms/issues/100)
- **Added:** New `showInlineError` prop in `NestField`.

## [v1.4.1](https://github.com/vazco/uniforms/tree/v1.4.1) (2016-11-02)

- **Fixed:** `ListAddField` and `ListDelField`. [\#125](https://github.com/vazco/uniforms/issues/125)
- **Fixed:** `process.addListener` is not a function in some environments. [\#124](https://github.com/vazco/uniforms/issues/124)

## [v1.4.0](https://github.com/vazco/uniforms/tree/v1.4.0) (2016-10-28)

- **Added:** New `showInlineError` prop in semantic theme.
- **Changed:** Select is now deselectable. [\#120](https://github.com/vazco/uniforms/issues/120)
- **Deprecated:** `FormGroup` helper component.
- **Fixed:** Bootstrap themes `grid` handling.
- **Fixed:** Bootstrap4 `ListAddField` styling. [\#121](https://github.com/vazco/uniforms/issues/121)

## [v1.3.0](https://github.com/vazco/uniforms/tree/v1.3.0) (2016-10-19)

- **Added:** Custom ListField icons in bootstrap3. [\#115](https://github.com/vazco/uniforms/issues/115)
- **Added:** Custom ListField icons in bootstrap4. [\#114](https://github.com/vazco/uniforms/issues/114)

## [v1.2.0](https://github.com/vazco/uniforms/tree/v1.2.0) (2016-10-18)

## [v1.2.0-rc.1](https://github.com/vazco/uniforms/tree/v1.2.0-rc.1) (2016-10-15)

- **Added:** Options passed to `connectField` are now stored on fields instances.
- **Changed:** Moved from inline helpers to `babel-runtime` to minify build size.
- **Changed:** Optimized `BaseForm`.
- **Changed:** Optimized `ListField`.

## [v1.1.5](https://github.com/vazco/uniforms/tree/v1.1.5) (2016-10-08)

- **Added:** Better nested fields support in SimpleSchema2.

## [v1.1.4](https://github.com/vazco/uniforms/tree/v1.1.4) (2016-10-07)

- **Fixed:** Reverted React dependency version.

## [v1.1.3](https://github.com/vazco/uniforms/tree/v1.1.3) (2016-10-06)

- **Fixed:** Unmet peer dependency warning.

## [v1.1.2](https://github.com/vazco/uniforms/tree/v1.1.2) (2016-09-28)

- **Fixed:** Enabled `SimpleSchema2Bridge`. [\#107](https://github.com/vazco/uniforms/issues/107)

## [v1.1.1](https://github.com/vazco/uniforms/tree/v1.1.1) (2016-09-27)

- **Fixed:** Missing export.

## [v1.1.0](https://github.com/vazco/uniforms/tree/v1.1.0) (2016-09-27)

- **Added:** Support for SimpleSchema2. [\#99](https://github.com/vazco/uniforms/issues/99)

## [v1.0.1](https://github.com/vazco/uniforms/tree/v1.0.1) (2016-09-20)

- **Fixed:** Controlled `ValidatedForm` validates with the old model. [\#104](https://github.com/vazco/uniforms/issues/104)

## [v1.0.0](https://github.com/vazco/uniforms/tree/v1.0.0) (2016-09-20)

## [v1.0.0-rc.33](https://github.com/vazco/uniforms/tree/v1.0.0-rc.33) (2016-09-14)

- **Fixed:** `NumberField` does not seem to let me enter "0" as the number. [\#101](https://github.com/vazco/uniforms/issues/101)

## [v1.0.0-rc.32](https://github.com/vazco/uniforms/tree/v1.0.0-rc.32) (2016-09-10)

- **Added:** New documentation. [\#92](https://github.com/vazco/uniforms/issues/92)
- **Added:** New playground. [\#98](https://github.com/vazco/uniforms/issues/98)
- **Fixed:** `SubmitField` doesn't allow you to set value. [\#95](https://github.com/vazco/uniforms/issues/95)

## [v1.0.0-rc.31](https://github.com/vazco/uniforms/tree/v1.0.0-rc.31) (2016-08-16)

- **Fixed:** `AutoFields` component is not exported. [\#31](https://github.com/vazco/uniforms/issues/31)

## [v1.0.0-rc.30](https://github.com/vazco/uniforms/tree/v1.0.0-rc.30) (2016-08-09)

- **Fixed:** Got rid of (un)controlled input warning. [\#90](https://github.com/vazco/uniforms/issues/90)
- **Fixed:** Got rid of unknown props warning. [\#89](https://github.com/vazco/uniforms/issues/89)
- **Fixed:** Nesting `ListField` in `ListField`. [\#91](https://github.com/vazco/uniforms/issues/91)

## [v1.0.0-rc.29](https://github.com/vazco/uniforms/tree/v1.0.0-rc.29) (2016-08-03)

- **Added:** Custom `AutoField` example. [\#85](https://github.com/vazco/uniforms/issues/85)
- **Fixed:** `BoolField` return non-boolean value. [\#88](https://github.com/vazco/uniforms/issues/88)

## [v1.0.0-rc.28](https://github.com/vazco/uniforms/tree/v1.0.0-rc.28) (2016-07-29)

- **Added:** New `showInlineError` prop in bootstrap theme. [\#84](https://github.com/vazco/uniforms/issues/84)
- **Fixed:** Removed custom validation warning. [\#83](https://github.com/vazco/uniforms/issues/83)

## [v1.0.0-rc.27](https://github.com/vazco/uniforms/tree/v1.0.0-rc.27) (2016-07-23)

- **Added:** New `onSubmitSuccess` and `onSubmitFailure` props on forms. [\#51](https://github.com/vazco/uniforms/issues/51)
- **Changed:** Improved error handling - using `invariant` package.
- **Changed:** Prevent validation when schema has changed and form is not submitted. [\#82](https://github.com/vazco/uniforms/issues/82)
- **Fixed:** Regression with HTML5 inputs. [\#80](https://github.com/vazco/uniforms/issues/80)

## [v1.0.0-rc.26](https://github.com/vazco/uniforms/tree/v1.0.0-rc.26) (2016-07-20)

- **Added:** New `filterDOMProps` helper.
- **Fixed:** AutoForm performance. [\#70](https://github.com/vazco/uniforms/issues/70)
- **Fixed:** Dynamic schema change. [\#76](https://github.com/vazco/uniforms/issues/76)
- **Fixed:** Got rid of unknown props warning. [\#64](https://github.com/vazco/uniforms/issues/64)
- **Fixed:** Got rid of unknown props warning. [\#75](https://github.com/vazco/uniforms/issues/75)

## [v1.0.0-rc.25](https://github.com/vazco/uniforms/tree/v1.0.0-rc.25) (2016-07-18)

- **Added:** New `autosaveDelay` prop on forms. [\#29](https://github.com/vazco/uniforms/issues/29)
- **Added:** New `icon` and `iconLeft` prop in semantic theme. [\#67](https://github.com/vazco/uniforms/issues/67)
- **Added:** New `inputRef` prop on every field. [\#68](https://github.com/vazco/uniforms/issues/68)
- **Added:** `ModifierForm` example. [\#66](https://github.com/vazco/uniforms/issues/66)
- **Fixed:** Dramatically improved performance. [\#70](https://github.com/vazco/uniforms/issues/70)
- **Fixed:** Styling of `ListField` in bootstrap theme. [\#72](https://github.com/vazco/uniforms/issues/72)
- **Fixed:** `findError`.

## [v1.0.0-rc.24](https://github.com/vazco/uniforms/tree/v1.0.0-rc.24) (2016-07-10)

- **Added:** New `itemProps` prop on `ListField`. [\#60](https://github.com/vazco/uniforms/issues/60)
- **Added:** New `injectName` helper.
- **Changed:** Initial value logic for better UX. [\#58](https://github.com/vazco/uniforms/issues/58)
- **Changed:** `joinName` works with dots in parts.
- **Fixed:** Got rid of unknown props warning. [\#64](https://github.com/vazco/uniforms/issues/64)
- **Fixed:** Invalid `propTypes`.
- **Fixed:** `HiddenField` leads to infinite loop. [\#63](https://github.com/vazco/uniforms/issues/63)
- **Fixed:** `NestField` leads to infinite loop. [\#62](https://github.com/vazco/uniforms/issues/62)

## [v1.0.0-rc.23](https://github.com/vazco/uniforms/tree/v1.0.0-rc.23) (2016-07-05)

- **Added:** New `HiddenField`. [\#53](https://github.com/vazco/uniforms/issues/53)
- **Added:** New `onChangeModel` prop on `AutoForm`.
- **Added:** Support for arbitrary errors. [\#54](https://github.com/vazco/uniforms/issues/54)
- **Changed:** Initial value logic for better UX. [\#58](https://github.com/vazco/uniforms/issues/58)
- **Changed:** Initial value logic to respect `value` prop. [\#52](https://github.com/vazco/uniforms/issues/52)
- **Fixed:** SimpleSchema validation of objects with prototype. [\#3](https://github.com/vazco/uniforms/issues/3)
- **Fixed:** `ErrorField` styling in semantic theme. [\#55](https://github.com/vazco/uniforms/issues/55)

## [v1.0.0-rc.22](https://github.com/vazco/uniforms/tree/v1.0.0-rc.22) (2016-06-28)

- **Added:** New `labelLeft` prop in bootstrap themes. [\#36](https://github.com/vazco/uniforms/issues/36)
- **Added:** Public form API. [#47](https://github.com/vazco/uniforms/issues/47)
- **Changed:** Label can be a React node. [\#49](https://github.com/vazco/uniforms/issues/49)
- **Fixed:** Label styling in bootstrap theme. [\#35](https://github.com/vazco/uniforms/issues/35)

## [v1.0.0-rc.21](https://github.com/vazco/uniforms/tree/v1.0.0-rc.21) (2016-06-25)

- **Added:** Code coverage report. [\#46](https://github.com/vazco/uniforms/issues/46)
- **Added:** Support for React SSR. [\#40](https://github.com/vazco/uniforms/issues/40)
- **Added:** Support for React@0.14. [\#42](https://github.com/vazco/uniforms/issues/42)

## [v1.0.0-rc.20](https://github.com/vazco/uniforms/tree/v1.0.0-rc.20) (2016-06-23)

- **Changed:** Handling of Meteor packages.

## [v1.0.0-rc.19](https://github.com/vazco/uniforms/tree/v1.0.0-rc.19) (2016-06-22)

- **Added:** Code coverage report. [\#41](https://github.com/vazco/uniforms/issues/41)
- **Changed:** `SubmitField` accepts more props. [\#39](https://github.com/vazco/uniforms/issues/39)

## [v1.0.0-rc.18](https://github.com/vazco/uniforms/tree/v1.0.0-rc.18) (2016-06-19)

- **Added:** New `AutoFields`. [\#31](https://github.com/vazco/uniforms/issues/31)
- **Added:** New `autoField`, `errorsField` or `submitField` props on `QuickForm`. [\#28](https://github.com/vazco/uniforms/issues/28)
- **Added:** `SelectField` checkbox mode. [\#33](https://github.com/vazco/uniforms/issues/33)
- **Changed:** Renamed `type` to `fieldType`. [\#32](https://github.com/vazco/uniforms/issues/32)

## [v1.0.0-rc.17](https://github.com/vazco/uniforms/tree/v1.0.0-rc.17) (2016-06-16)

- **Fixed:** `TextField` regression. [\#30](https://github.com/vazco/uniforms/issues/30)

## [v1.0.0-rc.16](https://github.com/vazco/uniforms/tree/v1.0.0-rc.16) (2016-06-15)

- **Added:** Labeled options. [\#23](https://github.com/vazco/uniforms/issues/23)
- **Added:** New `transform` prop on `RadioField`. [\#27](https://github.com/vazco/uniforms/issues/27).
- **Added:** Suppress HTML5 validation. [\#25](https://github.com/vazco/uniforms/issues/25)

## [v1.0.0-rc.15](https://github.com/vazco/uniforms/tree/v1.0.0-rc.15) (2016-06-09)

- **Fixed:** Got rid of warning about field value. [\#22](https://github.com/vazco/uniforms/issues/22)

## [v1.0.0-rc.14](https://github.com/vazco/uniforms/tree/v1.0.0-rc.14) (2016-06-08)

- **Fixed:** Guaranteed field `id` generation.

## [v1.0.0-rc.13](https://github.com/vazco/uniforms/tree/v1.0.0-rc.13) (2016-06-05)

- **Added:** Asynchronous validation! [\#17](https://github.com/vazco/uniforms/issues/17)
- **Added:** New `type` prop on `TextField`. [\#19](https://github.com/vazco/uniforms/issues/19)
- **Added:** New guaranteed field prop - `id`.
- **Added:** `CONTRIBUTING.md`. [\#20](https://github.com/vazco/uniforms/issues/20)

## [v1.0.0-rc.12](https://github.com/vazco/uniforms/tree/v1.0.0-rc.12) (2016-06-01)

- **Changed:** Initial value works with array fields. [\#16](https://github.com/vazco/uniforms/issues/16)

## [v1.0.0-rc.11](https://github.com/vazco/uniforms/tree/v1.0.0-rc.11) (2016-05-31)

- **Fixed:** `ListField` styling in bootstrap themes. [\#16](https://github.com/vazco/uniforms/issues/16)

## [v1.0.0-rc.10](https://github.com/vazco/uniforms/tree/v1.0.0-rc.10) (2016-05-30)

- **Changed:** Skipping `onSubmit` until render. [\#15](https://github.com/vazco/uniforms/issues/15)

## [v1.0.0-rc.9](https://github.com/vazco/uniforms/tree/v1.0.0-rc.9) (2016-05-30)

- **Changed:** Now `initialCount` can be passed to the `ListField` directly. [\#14](https://github.com/vazco/uniforms/issues/14)
- **Fixed:** Autosave regression. [\#11](https://github.com/vazco/uniforms/issues/11)

## [v1.0.0-rc.8](https://github.com/vazco/uniforms/tree/v1.0.0-rc.8) (2016-05-30)

- **Added:** New `ErrorField`. [\#13](https://github.com/vazco/uniforms/issues/13)
- **Added:** New guaranteed field prop - `changed`. [\#12](https://github.com/vazco/uniforms/issues/12)
- **Changed:** Now `initialCount` works with arrays. [\#14](https://github.com/vazco/uniforms/issues/14)

## [v1.0.0-rc.7](https://github.com/vazco/uniforms/tree/v1.0.0-rc.7) (2016-05-27)

- **Added:** New `autosave` prop on forms. [\#11](https://github.com/vazco/uniforms/issues/11)
- **Changed:** Forms inheritance.

## [v1.0.0-rc.6](https://github.com/vazco/uniforms/tree/v1.0.0-rc.6) (2016-05-25)

- **Added:** Bootstrap 3 theme. [\#10](https://github.com/vazco/uniforms/issues/10)
- **Added:** New guaranteed field prop - `errorMessage`. [\#6](https://github.com/vazco/uniforms/issues/6)
- **Changed:** Schema bridges have to implement additional `getErrorMessage(name, error)` method. [\#6](https://github.com/vazco/uniforms/issues/6)

## [v1.0.0-rc.5](https://github.com/vazco/uniforms/tree/v1.0.0-rc.5) (2016-05-24)

- **Added:** Bootstrap 4 theme. [\#2](https://github.com/vazco/uniforms/issues/2)

## [v1.0.0-rc.4](https://github.com/vazco/uniforms/tree/v1.0.0-rc.4) (2016-05-23)

- **Added:** Multiple schemas support. [\#9](https://github.com/vazco/uniforms/issues/9)
- **Added:** New `component` prop on `AutoField`.
- **Changed:** Renamed `explicitDefaultValue` to `explicitInitialValue`.
- **Changed:** Renamed `includeDefault` to `initialValue`.
- **Changed:** Schema props spreading.

## [v1.0.0-rc.3](https://github.com/vazco/uniforms/tree/v1.0.0-rc.3) (2016-05-20)

- **Added:** New guaranteed field prop - `findError`. [\#8](https://github.com/vazco/uniforms/issues/8)
- **Added:** New guaranteed field prop - `findField`. [\#8](https://github.com/vazco/uniforms/issues/8)
- **Added:** New guaranteed field prop - `findValue`. [\#8](https://github.com/vazco/uniforms/issues/8)

## [v1.0.0-rc.2](https://github.com/vazco/uniforms/tree/v1.0.0-rc.2) (2016-05-11)

- **Changed:** Handling of Meteor packages.

## [v1.0.0-rc.1](https://github.com/vazco/uniforms/tree/v1.0.0-rc.1) (2016-05-10)
