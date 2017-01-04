import connectField     from 'uniforms/connectField';
import nothing          from 'uniforms/nothing';
import React            from 'react';

const Error = ({
    children,
    errorMessage
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
