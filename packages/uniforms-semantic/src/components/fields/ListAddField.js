import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListAdd = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    className,
    disabled,     // eslint-disable-line no-unused-vars
    error,        // eslint-disable-line no-unused-vars
    errorMessage, // eslint-disable-line no-unused-vars
    field,        // eslint-disable-line no-unused-vars
    fieldType,    // eslint-disable-line no-unused-vars
    fields,       // eslint-disable-line no-unused-vars
    findError,    // eslint-disable-line no-unused-vars
    findField,    // eslint-disable-line no-unused-vars
    findValue,    // eslint-disable-line no-unused-vars
    id,           // eslint-disable-line no-unused-vars
    initialCount, // eslint-disable-line no-unused-vars
    label,        // eslint-disable-line no-unused-vars
    name,         // eslint-disable-line no-unused-vars
    onChange,     // eslint-disable-line no-unused-vars
    parent,
    placeholder,  // eslint-disable-line no-unused-vars
    required,     // eslint-disable-line no-unused-vars
    value,
    ...props
}) => {
    const limitNotReached = !(parent.maxCount <= parent.value.length);

    return (
        <i
            {...props}
            className={classnames(
                'ui',
                className,
                limitNotReached
                    ? 'link'
                    : 'disabled',
                'fitted add icon'
            )}
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
        />
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
