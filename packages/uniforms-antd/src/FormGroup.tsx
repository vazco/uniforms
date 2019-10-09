import warning from 'warning';

import wrapField from './wrapField';

const FormGroup = ({ children, ...props }: any) => {
  warning(
    false,
    'FormGroup is deprecated and will be removed in the next release.'
  );

  return wrapField(props, children);
};

export default FormGroup;
