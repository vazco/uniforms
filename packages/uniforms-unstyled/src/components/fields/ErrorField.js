import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {nothing}        from 'uniforms';

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
