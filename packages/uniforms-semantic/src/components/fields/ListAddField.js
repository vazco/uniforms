import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListAdd = ({className, parent: {field: {maxCount}, value: parentValue, onChange}, value, ...props}) => {
    const limitReached = !(maxCount <= parentValue.length);

    return (
        <i
            {...props}
            className={classnames('ui', className, limitReached ? 'link' : 'disabled', 'fitted add icon')}
            onClick={() => limitReached && onChange(parentValue.concat([value]))}
        />
    );
};

export default connectField(ListAdd, {includeParent: true, includeDefault: false});
