import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListAdd = ({className, parent, value, ...props}) => {
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

export default connectField(ListAdd, {includeParent: true, includeDefault: false});
