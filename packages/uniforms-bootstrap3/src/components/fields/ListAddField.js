import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListAdd = ({className, parent, value, ...props}) => {
    const limitNotReached = !(parent.maxCount <= parent.value.length);

    return (
        <i
            {...props}
            className={classnames(
                'add glyphicon glyphicon-plus', // TODO configure to alternate icon
                className,
                limitNotReached
                    ? 'link'
                    : 'disabled',
            )}
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
        />
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
