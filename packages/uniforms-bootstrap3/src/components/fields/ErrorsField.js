import React            from 'react';
import classnames       from 'classnames';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {nothing}        from 'uniforms';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <section className={classnames('panel panel-danger', className)} {...filterDOMProps(props)}>
            <section className="panel-body">
                {children}

                {schema.getErrorMessages(error).map((message, index) =>
                    <section key={index}>
                        {message}
                    </section>
                )}
            </section>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
