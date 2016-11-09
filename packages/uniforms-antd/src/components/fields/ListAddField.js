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
        <i
            {...filterDOMProps(props)}
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
