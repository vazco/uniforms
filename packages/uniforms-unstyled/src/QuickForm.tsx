import { QuickForm } from 'uniforms';

import AutoField from './AutoField';
import BaseForm from './BaseForm';
import ErrorsField from './ErrorsField';
import SubmitField from './SubmitField';

function Quick(parent: any): any {
  class _ extends QuickForm.Quick(parent) {
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
  }

  return _;
}

export default Quick(BaseForm);
