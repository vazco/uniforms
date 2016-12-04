import {AutoForm} from 'uniforms';

import ValidatedQuickForm from './ValidatedQuickForm';

const Auto = parent => class extends AutoForm.Auto(parent) {
    static Auto = Auto;
};

export default Auto(ValidatedQuickForm);
