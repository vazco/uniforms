import connectField from 'uniforms/connectField';
import React        from 'react';

import FormGroup    from './FormGroup';

const Bool = ({
    disabled,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    showInlineError,
    value,
    info
}) => {
    const AntD = require('antd');
    const Switch = AntD.Switch;
    const Icon = AntD.Icon;
    return (
        <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info} >
            <Switch
                id={id}
                name={name}
                ref={inputRef}
                checked={value}
                disabled={disabled}
                onChange={() => onChange(!value)}
                checkedChildren={<Icon type={'check'} />}
                unCheckedChildren={<Icon type={'cross'} />}
            />
        </FormGroup>
    );
};

export default connectField(Bool);

// SCHEMA PROTOTYPE
/*
boolfieldanttest:{
  type: Boolean,
  label: "Ant Boolean Field Sample",
  defaultValue: true
  }
  */
