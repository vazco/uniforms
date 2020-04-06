import React from 'react';
import { AutoForm, SubmitField } from '../../../website/components/universal';
import { connectField } from 'uniforms';

import schema from './ImageFieldSchema';

function Image({ onChange, value }) {
  const imgPlaceholder = 'https://picsum.photos/150?grayscale';

  function onImageChange({ target: { files } }) {
    if (files && files[0]) {
      onChange(URL.createObjectURL(files[0]));
    }
  }

  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>Choose your photo</div>
        <img
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
          src={value ? value : imgPlaceholder}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={onImageChange}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}

const ImageField = connectField(Image);

export default function ExampleOfSubmitField() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <div style={{ textAlign: 'center' }}>
        <ImageField name="pictureUrl" />
        <SubmitField />
      </div>
    </AutoForm>
  );
}
