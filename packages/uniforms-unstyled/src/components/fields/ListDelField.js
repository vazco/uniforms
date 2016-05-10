import React          from 'react';
import {connectField} from 'uniforms';

const ListFieldDel = ({disabled, name, parent: {field: {minCount}, value, onChange}, ...props}) => {
    const fieldIndex   = +name.slice(1 + name.lastIndexOf('.'));
    const limitReached = !(minCount >= value.length);

    return (
        <span {...props}
              onClick={() => !disabled && limitReached && onChange(
                  [].concat(value.slice(0,  fieldIndex))
                    .concat(value.slice(1 + fieldIndex))
              )}
        >
            -
        </span>
    );
};

export default connectField(ListFieldDel, {includeParent: true, includeDefault: false});
