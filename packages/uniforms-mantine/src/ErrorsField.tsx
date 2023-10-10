import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

export default function ErrorsField(props: ErrorsFieldProps) {
  const { error, schema } = useForm();
  return !error && !props.children ? null : (
    <div {...filterDOMProps(props)}>
      {props.children}

      <ul>
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
