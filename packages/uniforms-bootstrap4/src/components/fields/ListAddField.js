import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const ListAdd = ({
    className,
    disabled,
    parent,
    value,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

    return (
        <section
            className={classnames('label label-default label-pill pull-xs-right', className)}
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            {...filterDOMProps(props)}
        >
            {/* TODO: configure to alternate icon */}
            <i className="octicon octicon-plus" />
        </section>
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
