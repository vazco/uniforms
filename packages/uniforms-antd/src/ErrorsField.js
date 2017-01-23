import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <section {...filterDOMProps(props)}>
            {children}
            <ul>
                {schema.getErrorMessages(error).map((message, index) =>
                    <li key={index} style={{margin: '3px'}}>
                        {message}
                    </li>
                )}
            </ul>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

ErrorsField.defaultProps = {
    style: {
        backgroundColor: 'rgba(255, 85, 0, 0.2)',
        border: '1px solid rgb(255, 85, 0)',
        borderRadius: '7px',
        margin: '20px 0px',
        padding: '10px'
    }
};

export default ErrorsField;
