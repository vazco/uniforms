import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const Error = ({children, errorMessage, ...props}) =>
    !errorMessage ? nothing : (
        <section {...filterDOMProps(props)}>
            {children ? (
                children
            ) : (
                <section style={{margin: '3px'}}>
                    {errorMessage}
                </section>
            )}
        </section>
    )
;

Error.defaultProps = {
    style: {
        backgroundColor: 'rgba(255, 85, 0, 0.2)',
        border: '1px solid rgb(255, 85, 0)',
        borderRadius: '7px',
        margin: '20px 0px',
        padding: '10px'
    }
};

export default connectField(Error, {initialValue: false});
