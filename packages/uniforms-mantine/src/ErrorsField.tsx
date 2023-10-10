import { List } from '@mantine/core';
import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

export default function ErrorsField(props: ErrorsFieldProps) {
  const form = useForm();

  return !form.error && !props.children ? null : (
    <div {...filterDOMProps(props)}>
      {props.children}

      <List>
        {form.schema.getErrorMessages(form.error).map((message, index) => (
          <List.Item key={index}>{message}</List.Item>
        ))}
      </List>
    </div>
  );
}
