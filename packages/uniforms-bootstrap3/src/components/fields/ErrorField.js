import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {nothing}        from 'uniforms';

const Error = ({
    children,
    className,
    errorMessage,
    ...props
}) =>
    !errorMessage ? nothing : (
        <section className={classnames('panel panel-danger', className)} {...filterDOMProps(props)}>
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
