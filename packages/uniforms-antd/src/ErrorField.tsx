import React, { HTMLProps } from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  { error?: any; errorMessage?: string }
>;

const defaultStyle = {
  backgroundColor: 'rgba(255, 85, 0, 0.2)',
  border: '1px solid rgb(255, 85, 0)',
  borderRadius: '2px',
  margin: '20px 0px',
  padding: '10px',
};

const messageWrapperStyle = { margin: '3px' };

function Error({
  children,
  error,
  errorMessage,
  style = defaultStyle,
  ...props
}: ErrorFieldProps) {
  return !error ? null : (
    <div {...filterDOMProps({ style, ...props })}>
      {children ? (
        children
      ) : (
        <div style={messageWrapperStyle}>{errorMessage}</div>
      )}
    </div>
  );
}

export default connectField(Error, { initialValue: false, kind: 'leaf' });
