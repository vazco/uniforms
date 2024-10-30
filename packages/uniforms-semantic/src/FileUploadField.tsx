import React, { useState } from 'react';
import { Input, List, Button } from 'semantic-ui-react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

const FileUploadField = (props: FieldProps<File[]>) => {
  const [fileList, setFileList] = useState<File[]>(props.value || []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFileList(newFiles);
    props.onChange(newFiles);
  };

  const handleRemove = (file: File) => {
    const newFileList = fileList.filter(item => item !== file);
    setFileList(newFileList);
    props.onChange(newFileList);
  };

  return (
    <div {...filterDOMProps(props)}>
      <Input
        type="file"
        multiple
        onChange={handleChange}
      />
      <List>
        {fileList.map((file, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>{file.name}</List.Header>
              <List.Description>{`Size: ${file.size} bytes`}</List.Description>
              <Button onClick={() => handleRemove(file)}>Remove</Button>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default connectField(FileUploadField);
