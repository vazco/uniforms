import { AutoForm } from 'uniforms';

import ValidatedQuickForm from '/client/components/uniforms/base/ValidatedQuickForm';

function Auto(parent: any) {
  class _ extends AutoForm.Auto(parent) {
    static Auto = Auto;
  }

  return _ as unknown as AutoForm;
}

export default Auto(ValidatedQuickForm);
