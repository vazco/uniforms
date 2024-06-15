import { List } from '@mantine/core';
import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

export default function ErrorsField(props: ErrorsFieldProps) {
  const { error, schema } = useForm();
  return !error && !props.children ? null : (
    <div {...filterDOMProps(props)}>
      {props.children}

      <List>
        {schema.getErrorMessages(error).map((message, index) => (
          <List.Item key={index}>{message}</List.Item>
        ))}
      </List>
    </div>
  );
}
