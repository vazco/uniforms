# uniforms-antd

> Ant Design UI components for `uniforms`.

## Install

```sh
$ npm install uniforms-antd
```

For more in depth documentation see [uniforms.tools](https://uniforms.tools).

## FileUploadField

The `FileUploadField` component allows you to upload files with drag-and-drop functionality and preview the uploaded files.

### Usage

```jsx
import React from 'react';
import { AutoForm } from 'uniforms-antd';
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
