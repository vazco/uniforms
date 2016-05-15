import React          from 'react';
import {connectField} from 'uniforms';

const ListFieldDel = ({disabled, name, parent, ...props}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !(parent.minCount >= parent.value.length);

    return (
        <span {...props}
              onClick={() => !disabled && limitNotReached && parent.onChange(
                  [].concat(parent.value.slice(0,  fieldIndex))
                    .concat(parent.value.slice(1 + fieldIndex))
              )}
        >
            -
        </span>
    );
};

export default connectField(ListFieldDel, {includeParent: true, includeDefault: false});
