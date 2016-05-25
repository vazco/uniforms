import {QuickForm} from 'uniforms';

import BaseForm    from './BaseForm';
import AutoField   from '../fields/AutoField';
import ErrorsField from '../fields/ErrorsField';
import SubmitField from '../fields/SubmitField';

const Quick = parent => class extends QuickForm.Quick(parent) {
    static Quick = Quick;

    getAutoField () {
        return AutoField;
    }

    getErrorsField () {
        return ErrorsField;
    }

    getSubmitField () {
        return SubmitField;
    }
};

export default Quick(BaseForm);
