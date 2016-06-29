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
        <section className={classnames('panel panel-danger', className)} {...props}>
            <section className="panel-body">
                {children ? (
                    children
                ) : (
                    <section className="panel-heading">
                        <h4 className="panel-title">
                            {errorMessage}
                        </h4>
                    </section>
                )}
            </section>
        </section>
    )
;

export default connectField(Error, {initialValue: false});
