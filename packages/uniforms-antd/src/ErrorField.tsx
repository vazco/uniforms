import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const Error = ({ children, error, errorMessage, ...props }: any) =>
  !error ? null : (
    <div {...filterDOMProps(props)}>
      {children ? (
        children
      ) : (
        <div style={{ margin: '3px' }}>{errorMessage}</div>
      )}
    </div>
  );
Error.defaultProps = {
  style: {
    backgroundColor: 'rgba(255, 85, 0, 0.2)',
    border: '1px solid rgb(255, 85, 0)',
    borderRadius: '7px',
    margin: '20px 0px',
    padding: '10px',
  },
};

export default connectField(Error, { initialValue: false });
