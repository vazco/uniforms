import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

const FileUploadField = (props: FieldProps<File[]>) => {
  const [fileList, setFileList] = useState<File[]>(props.value || []);

  const handleChange = (files: File[]) => {
    setFileList(files);
    props.onChange(files);
  };

  const handleRemove = (file: File) => {
    const newFileList = fileList.filter(item => item !== file);
    setFileList(newFileList);
    props.onChange(newFileList);
  };

  return (
    <div {...filterDOMProps(props)}>
      <DropzoneArea
        filesLimit={10}
        onChange={handleChange}
        onDelete={handleRemove}
        showPreviewsInDropzone={false}
        showPreviews={false}
      />
      <List>
        {fileList.map((file, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={file.name}
              secondary={`Size: ${file.size} bytes`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default connectField(FileUploadField);
