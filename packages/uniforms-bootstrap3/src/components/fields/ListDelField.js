import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListFieldDel = ({className, parent, name, ...props}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !(parent.minCount >= parent.value.length);

    return (
        <span
            className={classnames('badge', className)}
            onClick={() => limitNotReached && parent.onChange(
                [].concat(parent.value.slice(0,  fieldIndex))
                  .concat(parent.value.slice(1 + fieldIndex))
            )}
            {...props}
        >
            {/* TODO: configure to alternate icon */}
            <i className="glyphicon glyphicon-minus" />
        </span>
   );
};

export default connectField(ListFieldDel, {includeParent: true, initialValue: false});
