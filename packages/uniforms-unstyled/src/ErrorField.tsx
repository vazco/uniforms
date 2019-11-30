import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const Error = ({ children, error, errorMessage, ...props }) =>
  !error ? null : (
    <div {...filterDOMProps(props)}>{children || errorMessage}</div>
  );
export default connectField(Error, { initialValue: false });
