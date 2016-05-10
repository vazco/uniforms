import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

const SubmitField = ({className, ...props}, {uniforms: {error, state: {disabled} = {}}}) =>
    <input
        className={classnames('ui', className, 'button')}
        disabled={error || disabled ? true : null}
        type="submit"
        {...props}
    />
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
