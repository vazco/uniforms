# uniforms-mui

> MUI components for `uniforms`.

## Install

```sh
$ npm install uniforms-mui
```

## FileUploadField

The `FileUploadField` component allows users to upload files with drag-and-drop functionality and preview the uploaded files.

### Usage

```jsx
import React from 'react';
import { AutoForm } from 'uniforms-mui';
import FileUploadField from './FileUploadField'; // Adjust the import path as needed

const schema = {
  // Your schema definition
};

const MyForm = () => (
  <AutoForm schema={schema}>
    <FileUploadField name="files" />
  </AutoForm>
);

export default MyForm;
```

### Props

- `name` (string): The name of the field.
- `value` (File[]): The list of uploaded files.
- `onChange` (function): Callback function to handle file changes.

For more in depth documentation see [uniforms.tools](https://uniforms.tools).
