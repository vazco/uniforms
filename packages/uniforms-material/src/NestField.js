import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import connectField from 'uniforms/connectField';
import injectName from 'uniforms/injectName';
import joinName from 'uniforms/joinName';

import AutoField from './AutoField';

const Nest = ({
  children,
  disabled,
  error,
  errorMessage,
  fields,
  fullWidth,
  itemProps,
  helperText,
  label,
  margin,
  name,
  required,
  showInlineError
}) => (
  <FormControl disabled={!!disabled} error={!!error} fullWidth={!!fullWidth} margin={margin} required={required}>
    {label && <FormLabel component="legend">{label}</FormLabel>}
    {children
      ? injectName(name, children)
      : fields.map(key => <AutoField key={key} name={joinName(name, key)} {...itemProps} />)}
    {showInlineError && error ? (
      <FormHelperText>{errorMessage}</FormHelperText>
    ) : (
      helperText && <FormHelperText>{helperText}</FormHelperText>
    )}
  </FormControl>
);

Nest.defaultProps = {
  fullWidth: true,
  margin: 'none'
};

export default connectField(Nest, {ensureValue: false, includeInChain: false});
