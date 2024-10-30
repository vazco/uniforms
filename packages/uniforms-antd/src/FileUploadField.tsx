import React, { useState } from 'react';
import { Upload, List, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

const FileUploadField = (props: FieldProps<File[]>) => {
  const [fileList, setFileList] = useState<File[]>(props.value || []);

  const handleChange = ({ file, fileList }: any) => {
    if (file.status === 'done') {
      setFileList(fileList.map((file: any) => file.originFileObj));
      props.onChange(fileList.map((file: any) => file.originFileObj));
    }
  };

  const handleRemove = (file: any) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
    props.onChange(newFileList);
  };

  return (
    <div {...filterDOMProps(props)}>
      <Upload
        fileList={fileList}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={() => false}
        multiple
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <List
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={file => (
          <List.Item>
            <List.Item.Meta
              title={file.name}
              description={`Size: ${file.size} bytes`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default connectField(FileUploadField);
