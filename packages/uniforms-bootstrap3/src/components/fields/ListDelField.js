import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const ListDel = ({
    className,
    disabled,
    name,
    parent,
    ...props
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

    return (
        <span
            className={classnames('badge', className)}
            onClick={() => limitNotReached && parent.onChange(
                [].concat(parent.value.slice(0,  fieldIndex))
                  .concat(parent.value.slice(1 + fieldIndex))
            )}
            {...filterDOMProps(props)}
        >
            {/* TODO: configure to alternate icon */}
            <i className="glyphicon glyphicon-minus" />
        </span>
   );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
