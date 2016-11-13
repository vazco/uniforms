import React            from 'react';
import classnames       from 'classnames';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {nothing}        from 'uniforms';
//className={classnames('ui', className, 'error message')}
const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <section style={{border: "1px solid rgb(255, 85, 0)", margin: "20px 0px", borderRadius: "7px", padding: "10px", backgroundColor: "rgba(255, 85, 0, 0.2)"}} {...filterDOMProps(props)}>
            {children}

            <ul className="list" >
                {schema.getErrorMessages(error).map((message, index) =>
                    <li key={index} style={{margin: '3px'}}>
                        {message}
                    </li>
                )}
            </ul>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
