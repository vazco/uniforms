import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const Error = ({
    children,
    errorMessage,
    ...props
}) =>
    !errorMessage ? nothing : (
        <section {...filterDOMProps(props)}>
            {children || errorMessage}
        </section>
    )
;

export default connectField(Error, {initialValue: false});
