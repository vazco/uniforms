import warning from 'warning';

import wrapField from './wrapField';

function FormGroup({ children, ...props }: any) {
  warning(
    false,
    'FormGroup is deprecated and will be removed in the next release.',
  );

  return wrapField(props, children);
}

export default FormGroup;
