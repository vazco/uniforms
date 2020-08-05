import React from 'react';
import { AutoForm, SubmitField } from '../../lib/universal';
import { HTMLFieldProps, connectField } from 'uniforms';

import { bridge as schema } from './ImageFieldSchema';

type ImageProps = HTMLFieldProps<string, HTMLDivElement>;

function Image({ onChange, value }: ImageProps) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>Choose your photo</div>
        <img
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
          src={value || 'https://picsum.photos/150?grayscale'}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            onChange(URL.createObjectURL(files[0]));
          }
        }}
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
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    >
      <div style={{ textAlign: 'center' }}>
        <ImageField name="pictureUrl" />
        <SubmitField />
      </div>
    </AutoForm>
  );
}
