import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import classnames     from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <div className={classnames('card card-outline-danger text-danger', className)} {...filterDOMProps(props)}>
            <div className="card-block">
                {children}

                {schema.getErrorMessages(error).map((message, index) =>
                    <div key={index} className="disabled">
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
