import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';
import Subheader      from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const Radio = ({
    allowedValues,
    disabled,
    id,
    label,
    labelPosition,
    name,
    onChange,
    transform,
    value,
    ...props
}) =>
    <div>
        {!!label && <Subheader children={label} style={{paddingLeft: 0}} />}

        <RadioButtonGroup
            disabled={disabled}
            id={id}
            labelPosition={labelPosition}
            name={name}
            valueSelected={value}
            onChange={(event, value) => onChange(value)}
            {...filterDOMProps(props)}
        >
            {allowedValues.map(item =>
                <RadioButton
                    disabled={disabled}
                    key={item}
                    label={transform ? transform(item) : item}
                    labelPosition={labelPosition}
                    value={item}
                />
            )}
        </RadioButtonGroup>
    </div>
;

export default connectField(Radio);
