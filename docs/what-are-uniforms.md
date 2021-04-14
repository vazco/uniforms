---
id: what-are-uniforms
title: What are uniforms?
---

Generally speaking, uniforms are a set of React libraries for building forms from every schema.

### Core features

- Automatic forms generation
- Fields capable of rendering every schema
- Helper for creating custom fields with one line
- Inline and asynchronous form validation
- Various schemas integration
- Wide range of themes support

Similarly to other form packages, uniforms can help you with rendering a form, by taking care of its state management, validation, and submission.
What makes it unique though, is the ability to **completely generate the form** for you, without having to manually provide its fields.

In order to do so, uniforms require you to do two things:

1. Provide **the schema** of your data. You can approach the schema as a formal description of the data, where you define its types, allowed values, default values, required ones and so on.
2. Select desired **theme**. The theme is basically a package containing pre-styled form components in one of the popular styles (AntD, Bootstrap 3, Bootstrap 4, Bootstrap 5, Material, Semantic) or raw, unstyled HTML.

To operate on the schema, uniforms will need to receive a _bridge_ of it.
A bridge is a unified schema mapper that is used by uniforms internals in order to be able to operate on the schema data, validate it and generate errors.
To create one, you have to use one of the predefined schema-to-bridge mappers or create one by yourself.
To learn more about the bridge concept, please visit the [Under The Hood > Bridge concept](/docs/uth-bridge-concept) section.
