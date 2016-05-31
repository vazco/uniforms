import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListFieldDel = ({className, disabled, parent, name, ...props}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !(parent.minCount >= parent.value.length);

    return (
        <span
            className="label label-default label-pill"
            onClick={() => limitNotReached && parent.onChange(
                [].concat(parent.value.slice(0,  fieldIndex))
                  .concat(parent.value.slice(1 + fieldIndex))
            )}
        >
            <i
                {...props}
                className={classnames(
                    'del octicon octicon-dash', // TODO configure to alternate icon
                    className,
                    limitNotReached && !disabled
                        ? 'link'
                        : 'disabled',
                )}
           />
        </span>
   );
};

export default connectField(ListFieldDel, {includeParent: true, initialValue: false});
