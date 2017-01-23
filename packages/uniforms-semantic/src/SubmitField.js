import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import classnames     from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';

const SubmitField = ({className, inputRef, value, ...props}, {uniforms: {error, state: {disabled}}}) =>
    <input
        className={classnames('ui', className, 'button')}
        disabled={!!(error || disabled)}
        ref={inputRef}
        type="submit"
        value={value}
        {...filterDOMProps(props)}
    />
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
