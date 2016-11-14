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
        <section
            style={{
                border: '1px solid rgb(255, 85, 0)',
                margin: '20px 0px',
                borderRadius: '7px',
                padding: '10px',
                backgroundColor: 'rgba(255, 85, 0, 0.2)'
            }}
            {...filterDOMProps(props)}
        >
            {children ? (
                children
            ) : (
                <section className={'header'} style={{margin: '3px'}}>
                    {errorMessage}
                </section>
            )}
        </section>
    )
;

export default connectField(Error, {initialValue: false});
