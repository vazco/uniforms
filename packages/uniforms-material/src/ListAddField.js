import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
const ListAdd = ({disabled, fullWidth, icon, margin, parent, value, ...props}) => {
  const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

  return (
    <FormControl fullWidth={!!fullWidth} margin={margin}>
      <IconButton
        disabled={!limitNotReached}
        onClick={() => limitNotReached && parent.onChange(parent.value.concat([cloneDeep(value)]))}
        {...filterDOMProps(props)}
      >
        {icon}
      </IconButton>
    </FormControl>
  );
};

ListAdd.propTypes = {
  icon: PropTypes.node
};

ListAdd.defaultProps = {
  fullWidth: true,
  icon: '+',
  margin: 'normal'
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
