import React from 'react';
import { connectField, filterDOMProps, nothing } from 'uniforms';

const Error = ({ children, error, errorMessage, ...props }) =>
  !error ? (
    nothing
  ) : (
    <div {...filterDOMProps(props)}>{children || errorMessage}</div>
  );
export default connectField(Error, { initialValue: false });
