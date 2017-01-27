import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import classnames     from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <div className={classnames('panel panel-danger', className)} {...filterDOMProps(props)}>
            <div className="panel-body">
                {children}

                {schema.getErrorMessages(error).map((message, index) =>
                    <div key={index}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
