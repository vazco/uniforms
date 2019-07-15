import React from 'react';

import connectField from 'uniforms/connectField';

function Image({ onChange, value }) {
  function onImageChange({ target: { files } }) {
    if (files && files[0]) {
      onChange(URL.createObjectURL(files[0]));
    }
  }

  return (
    <div>
      <label>Choose your photo</label>
      <input accept="image/*" onChange={onImageChange} type="file" />
      <img src={value} />
    </div>
  );
}

export default connectField(Image);
