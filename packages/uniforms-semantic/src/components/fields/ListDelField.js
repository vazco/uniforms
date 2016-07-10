import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListDel = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    className,
    disabled,
    error,        // eslint-disable-line no-unused-vars
    errorMessage, // eslint-disable-line no-unused-vars
    field,        // eslint-disable-line no-unused-vars
    fieldType,    // eslint-disable-line no-unused-vars
    fields,       // eslint-disable-line no-unused-vars
    findError,    // eslint-disable-line no-unused-vars
    findField,    // eslint-disable-line no-unused-vars
    findValue,    // eslint-disable-line no-unused-vars
    id,           // eslint-disable-line no-unused-vars
    label,        // eslint-disable-line no-unused-vars
    name,
    onChange,     // eslint-disable-line no-unused-vars
    parent,
    placeholder,  // eslint-disable-line no-unused-vars
    required,     // eslint-disable-line no-unused-vars
    value,        // eslint-disable-line no-unused-vars
    ...props
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !(parent.minCount >= parent.value.length);

    return (
        <i
            {...props}
            className={classnames(
                'ui',
                className,
                limitNotReached && !disabled
                    ? 'link'
                    : 'disabled',
                'fitted close icon'
            )}
            onClick={() => limitNotReached && parent.onChange(
                [].concat(parent.value.slice(0,  fieldIndex))
                  .concat(parent.value.slice(1 + fieldIndex))
            )}
       />
   );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
