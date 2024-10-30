# uniforms-bootstrap5

> Bootstrap5 UI components for `uniforms`.

## Install

```sh
$ npm install uniforms-bootstrap5
```

For more in depth documentation see [uniforms.tools](https://uniforms.tools).

## FileUploadField

The `FileUploadField` component allows you to upload files with drag-and-drop functionality and preview the uploaded files.

### Usage

```jsx
import React from 'react';
import { AutoForm } from 'uniforms-bootstrap5';
import FileUploadField from './FileUploadField';

const schema = {
  file: { type: Array },
  'file.$': { type: Object },
};

const MyForm = () => (
  <AutoForm schema={schema} onSubmit={console.log}>
    <FileUploadField name="file" />
  </AutoForm>
);

export default MyForm;
```
