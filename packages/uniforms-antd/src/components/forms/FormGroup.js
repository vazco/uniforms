import React      from 'react';
import {InfoMessage} from '../fields/InfoMessage';
const FormGroup = ({
    children,
    errorMessage,      // errorMessage string of error
    id,
    label,             // string label (or false)
    //required,
    showInlineError,    // boolean, if true, show <span.help-text> with error message
    info
}) => {
    const AntD = require('antd');
    const Input = AntD.Input;
    const Form = AntD.Form;
    const FormItem = Form.Item;
    return(
        <FormItem
            label={label && (<span>{label}{info && (<span>&nbsp;<InfoMessage info={info} /></span>)}</span>)}
            help={showInlineError && (errorMessage)}
            hasFeedback
            validateStatus={errorMessage && ('error')}
            htmlFor={id}
            style={{marginBottom: '12px'}}
        >
          {children}
        </FormItem>
    );
}

export default FormGroup;
