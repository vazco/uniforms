import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const ListDel = ({ disabled, icon, name, parent, ...props }) => {
  const fieldIndex = +name.slice(1 + name.lastIndexOf('.'));
  const limitNotReached =
    !disabled && !(parent.minCount >= parent.value.length);

  return (
    <IconButton
      disabled={!limitNotReached}
      onClick={() =>
        limitNotReached &&
        parent.onChange(
          []
            .concat(parent.value.slice(0, fieldIndex))
            .concat(parent.value.slice(1 + fieldIndex)),
        )
      }
      {...filterDOMProps(props)}
    >
      {icon}
    </IconButton>
  );
};

ListDel.propTypes = {
  icon: PropTypes.node,
};

ListDel.defaultProps = {
  icon: '-',
};

export default connectField(ListDel, {
  includeParent: true,
  initialValue: false,
});
