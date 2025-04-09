"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[849],{86164:e=>{e.exports=JSON.parse('{"version":{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"docs":[{"type":"category","label":"Introduction","collapsible":false,"collapsed":false,"items":[{"type":"link","label":"What are uniforms?","href":"/docs/introduction/what-are-uniforms","docId":"introduction/what-are-uniforms","unlisted":false},{"type":"link","label":"Motivation","href":"/docs/introduction/motivation","docId":"introduction/motivation","unlisted":false},{"type":"link","label":"Comparison table","href":"/docs/introduction/comparison-table","docId":"introduction/comparison-table","unlisted":false}]},{"type":"category","label":"Getting started","collapsible":false,"collapsed":false,"items":[{"type":"link","label":"Installation","href":"/docs/getting-started/installation","docId":"getting-started/installation","unlisted":false},{"type":"link","label":"Basic usage","href":"/docs/getting-started/basic-usage","docId":"getting-started/basic-usage","unlisted":false},{"type":"link","label":"Migrating v2 to v3","href":"/docs/getting-started/migrating-2-to-3","docId":"getting-started/migrating-2-to-3","unlisted":false},{"type":"link","label":"Migrating v3 to v4","href":"/docs/getting-started/migrating-3-to-4","docId":"getting-started/migrating-3-to-4","unlisted":false},{"type":"link","label":"Custom theme","href":"/docs/getting-started/custom-theme","docId":"getting-started/custom-theme","unlisted":false},{"type":"link","label":"FAQ","href":"/docs/getting-started/faq","docId":"getting-started/faq","unlisted":false}]},{"type":"category","label":"Examples","collapsible":false,"collapsed":false,"items":[{"type":"link","label":"Basic usage","href":"/docs/examples/basic-usage","docId":"examples/basic-usage","unlisted":false},{"type":"link","label":"Form layout","href":"/docs/examples/form-layout","docId":"examples/form-layout","unlisted":false},{"type":"link","label":"Passing field props via schema","href":"/docs/examples/schema-props","docId":"examples/schema-props","unlisted":false},{"type":"link","label":"Passing field props via components","href":"/docs/examples/field-props","docId":"examples/field-props","unlisted":false},{"type":"link","label":"Multi step form","href":"/docs/examples/multi-step-form","docId":"examples/multi-step-form","unlisted":false},{"type":"link","label":"Custom field","href":"/docs/examples/custom-field","docId":"examples/custom-field","unlisted":false}]},{"type":"category","label":"API Reference","collapsible":false,"collapsed":false,"items":[{"type":"link","label":"Forms","href":"/docs/api-reference/forms","docId":"api-reference/forms","unlisted":false},{"type":"link","label":"Fields","href":"/docs/api-reference/fields","docId":"api-reference/fields","unlisted":false},{"type":"link","label":"Bridges","href":"/docs/api-reference/bridges","docId":"api-reference/bridges","unlisted":false},{"type":"link","label":"Context data","href":"/docs/api-reference/context-data","docId":"api-reference/context-data","unlisted":false},{"type":"link","label":"Helpers","href":"/docs/api-reference/helpers","docId":"api-reference/helpers","unlisted":false}]}]},"docs":{"api-reference/bridges":{"id":"api-reference/bridges","title":"Bridges","description":"To make use of any schema, uniforms have to create a bridge of it - a unified schema mapper.","sidebar":"docs"},"api-reference/context-data":{"id":"api-reference/context-data","title":"Context data","description":"Some components might need to know a current form state, which is passed as React context.","sidebar":"docs"},"api-reference/fields":{"id":"api-reference/fields","title":"Fields","description":"uniforms provide a set of predefined components that can be used as form fields.","sidebar":"docs"},"api-reference/forms":{"id":"api-reference/forms","title":"Forms","description":"Forms components","sidebar":"docs"},"api-reference/helpers":{"id":"api-reference/helpers","title":"Helpers","description":"connectField","sidebar":"docs"},"examples/basic-usage":{"id":"examples/basic-usage","title":"Basic usage","description":"const userSchema = z.object({","sidebar":"docs"},"examples/custom-field":{"id":"examples/custom-field","title":"Custom field","description":"const userSchema = z.object({","sidebar":"docs"},"examples/field-props":{"id":"examples/field-props","title":"Passing field props via components","description":"enum Role {","sidebar":"docs"},"examples/form-layout":{"id":"examples/form-layout","title":"Form layout","description":"const userSchema = z.object({","sidebar":"docs"},"examples/multi-step-form":{"id":"examples/multi-step-form","title":"Multi step form","description":"const handleUserFormSubmit = model => {","sidebar":"docs"},"examples/schema-props":{"id":"examples/schema-props","title":"Passing field props via schema","description":"enum Role {","sidebar":"docs"},"getting-started/basic-usage":{"id":"getting-started/basic-usage","title":"Basic usage","description":"This example uses uniforms-bridge-zod and uniforms-antd packages as this bridge and theme don\'t require any extra configuration.","sidebar":"docs"},"getting-started/custom-theme":{"id":"getting-started/custom-theme","title":"Custom theme","description":"We\'ve made hundreds of custom components across dozens of projects, including complete custom themes. Most of them began as source forks of uniforms-unstyled - one simply copies the source and imports ./some/project/path/uniforms-custom-theme-with-a-cool-name.","sidebar":"docs"},"getting-started/faq":{"id":"getting-started/faq","title":"FAQ","description":"How can I customize/style my form fields?","sidebar":"docs"},"getting-started/installation":{"id":"getting-started/installation","title":"Installation","description":"1. Install core","sidebar":"docs"},"getting-started/migrating-2-to-3":{"id":"getting-started/migrating-2-to-3","title":"Migrating v2 to v3","description":"This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on why certain changes were made, see the CHANGELOG.md. When migrating to v3, use the newest version. Gradual updates will take more time and won\'t ease this process.","sidebar":"docs"},"getting-started/migrating-3-to-4":{"id":"getting-started/migrating-3-to-4","title":"Migrating v3 to v4","description":"This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on why certain changes were made, see the CHANGELOG.md. When migrating to v4, use the newest version. Gradual updates will take more time and won\'t ease this process.","sidebar":"docs"},"introduction/comparison-table":{"id":"introduction/comparison-table","title":"Comparison table","description":"|                                                             Feature | uniforms | Formik | redux-form | React Final Form | react-hook-form | react-jsonschema-form |","sidebar":"docs"},"introduction/motivation":{"id":"introduction/motivation","title":"Motivation","description":"Forms concept","sidebar":"docs"},"introduction/what-are-uniforms":{"id":"introduction/what-are-uniforms","title":"What are uniforms?","description":"Uniforms is a set of React libraries designed to simplify form creation by generating complete forms from any data schema. It handles form state management, validation, and submission, allowing you to focus on your app\u2019s functionality rather than manual form-building.","sidebar":"docs"}}}}')}}]);