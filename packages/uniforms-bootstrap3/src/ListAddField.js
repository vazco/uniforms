import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListAdd = ({
    addIcon,
    className,
    disabled,
    parent,
    value,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

    return (
        <div
            className={classnames('badge pull-right', className)}
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            {...filterDOMProps(props)}
        >
            {addIcon}
        </div>
    );
};

ListAdd.defaultProps = {
    addIcon: <i className="glyphicon glyphicon-plus" />
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
