import React from 'react';
import { connectField } from 'uniforms';

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

export default connectField(Image);
