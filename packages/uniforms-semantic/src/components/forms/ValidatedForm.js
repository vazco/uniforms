import {ValidatedForm} from 'uniforms';

import BaseForm from './BaseForm';

const Validated = parent => class extends ValidatedForm.Validated(parent) {
    static Validated = Validated;
};

export default Validated(BaseForm);
