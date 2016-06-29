import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import {nothing}      from 'uniforms';

const Error = ({
    children,
    className,
    errorMessage,
// onChange shouldn't be passed to <section>
// eslint-disable-next-line no-unused-vars
    onChange,
    ...props
}) =>
    !errorMessage ? nothing : (
        <section className={classnames('card', className)} {...props}>
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
