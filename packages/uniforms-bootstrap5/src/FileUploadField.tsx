import React, { useState } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const FileUploadField = (props) => {
  const [fileList, setFileList] = useState(props.value || []);

  const handleChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFileList(newFiles);
    props.onChange(newFiles);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter(item => item !== file);
    setFileList(newFileList);
    props.onChange(newFileList);
  };

  return (
    <div {...filterDOMProps(props)}>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id={props.id}
          multiple
          onChange={handleChange}
        />
        <label className="custom-file-label" htmlFor={props.id}>
          {fileList.length > 0 ? `${fileList.length} files selected` : 'Choose files'}
        </label>
      </div>
      <ul className="list-group mt-3">
        {fileList.map((file, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {file.name}
            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemove(file)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connectField(FileUploadField);
