import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListFieldDel = ({className, disabled, name, parent: {field: {minCount}, value, onChange}, ...props}) => {
    const fieldIndex   = +name.slice(1 + name.lastIndexOf('.'));
    const limitReached = !(minCount >= value.length);

    return (
        <i {...props}
           className={classnames('ui', className, limitReached && !disabled ? 'link' : 'disabled', 'fitted close icon')}
           onClick={() => limitReached && onChange(
               [].concat(value.slice(0,  fieldIndex))
                 .concat(value.slice(1 + fieldIndex))
           )}
       />
   );
};

export default connectField(ListFieldDel, {includeParent: true, includeDefault: false});
