import React, { useState, useRef } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

export type FileUploadFieldProps = HTMLFieldProps<
  File,
  HTMLDivElement,
  { inputRef?: React.Ref<HTMLInputElement> }
>;

function FileUploadField({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  value,
  ...props
}: FileUploadFieldProps) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled || readOnly) return;

    const newFiles = Array.from(event.dataTransfer.files);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    const newFiles = Array.from(event.target.files || []);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <input
          type="file"
          id={id}
          name={name}
          ref={inputRef || fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />
        <p>Drag and drop files here, or click to select files</p>
      </div>

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default connectField<FileUploadFieldProps>(FileUploadField, { kind: 'leaf' });
