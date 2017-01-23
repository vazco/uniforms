import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const Error = ({
    children,
    className,
    errorMessage,
    ...props
}) =>
    !errorMessage ? nothing : (
        <section className={classnames('ui', className, 'error message')} {...filterDOMProps(props)}>
            {children ? (
                children
            ) : (
                <section className="header">
                    {errorMessage}
                </section>
            )}
        </section>
    )
;

export default connectField(Error, {initialValue: false});
