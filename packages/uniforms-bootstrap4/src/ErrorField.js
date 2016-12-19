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
        <section className={classnames('card', className)} {...filterDOMProps(props)}>
            <section className="card-block">
                {children ? (
                    children
                ) : (
                    <h4 className="card-title">
                        {errorMessage}
                    </h4>
                )}
            </section>
        </section>
    )
;

export default connectField(Error, {initialValue: false});
