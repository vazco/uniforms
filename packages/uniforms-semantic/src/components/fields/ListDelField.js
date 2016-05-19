import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListFieldDel = ({className, disabled, parent, name, ...props}) => {
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

export default connectField(ListFieldDel, {includeParent: true, initialValue: false});
