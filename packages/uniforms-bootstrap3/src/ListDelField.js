import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListDel = ({
    className,
    disabled,
    name,
    parent,
    removeIcon,
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
            {removeIcon}
        </span>
    );
};

ListDel.defaultProps = {
    removeIcon: <i className="glyphicon glyphicon-minus" />
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
