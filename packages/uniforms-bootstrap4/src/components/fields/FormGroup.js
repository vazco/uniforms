import warning from 'fbjs/lib/warning';

import wrapField from '../../lib/wrapField';

const FormGroup = ({children, ...props}) => {
    warning(false, 'FormGroup is deprecated and will be removed in the next release.');

    return wrapField(props, children);
};

export default FormGroup;
