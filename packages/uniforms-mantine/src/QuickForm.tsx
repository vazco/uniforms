import { QuickForm } from 'uniforms';

import AutoField from '/client/components/uniforms/base/AutoField';
import BaseForm from '/client/components/uniforms/base/BaseForm';
import ErrorsField from '/client/components/uniforms/base/ErrorsField';
import SubmitField from '/client/components/uniforms/base/SubmitField';

function Quick(parent: any) {
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

  return _ as unknown as QuickForm;
}

export default Quick(BaseForm);
