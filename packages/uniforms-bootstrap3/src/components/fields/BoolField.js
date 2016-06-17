import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

// IDEA manipulate props for label on left: re #35
const modifyProps = (props) => {
    if (!props.label) return props;
    return Object.assign({}, props, {
        label: (props.labelLeft ? props.labelLeft : <span>&nbsp;</span>)
    });
};

const Bool = props =>
    <FormGroup {...modifyProps(props)}>
        <section className={classnames(props.inputClassName, `checkbox${props.inline ? '-inline' : ''}`)}>
            <label htmlFor={props.id}>
                <input
                    checked={props.value}
                    disabled={props.disabled}
                    id={props.id}
                    name={props.name}
                    onChange={() => props.onChange(!props.value)}
                    type="checkbox"
                />&nbsp;
                {props.label}
            </label>
        </section>
    </FormGroup>
;

export default connectField(Bool);

