import React from 'react';
import connectField from 'uniforms/connectField';

import schema from './ImageFieldSchema';
import { AutoForm, SubmitField } from '../../../website/components/universal';

function Image({ onChange, value }) {
  const imgPlaceholder = 'https://via.placeholder.com/150.png';

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

export default function ExamplesSubmitField() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <ImageField name="pictureUrl" />
      <SubmitField />
    </AutoForm>
  );
}
