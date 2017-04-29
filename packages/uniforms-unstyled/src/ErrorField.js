import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const Error = ({children, error, errorMessage, ...props}) =>
    !error ? nothing : (
        <div {...filterDOMProps(props)}>
            {children || errorMessage}
        </div>
    )
;

export default connectField(Error, {initialValue: false});
