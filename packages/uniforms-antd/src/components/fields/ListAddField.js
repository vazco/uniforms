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
    var AntIn = require('antd');
    const Button = AntIn.Button;

    return (
      <section  className={classnames('pull-right', className)}>
        <Button
            type="ghost"
            size="small"
            icon="plus-square-o"
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            style={{float: "right", marginTop: "-10px"}}
            {...filterDOMProps(props)}
         />
     </section>
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
