import QuickForm from 'uniforms/QuickForm';

import BaseForm from './BaseForm';
import AutoField from './AutoField';
import ErrorsField from './ErrorsField';
import SubmitField from './SubmitField';

const Quick = parent =>
  class extends QuickForm.Quick(parent) {
    static Quick = Quick;

    getAutoField() {
      return AutoField;
    }

    getErrorsField() {
      return ErrorsField;
    }

    getSubmitField() {
      return SubmitField;
    }
  };

export default Quick(BaseForm);
