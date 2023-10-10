import { ValidatedForm } from 'uniforms';

import BaseForm from '/client/components/uniforms/base/BaseForm';

function Validated(parent: any) {
  class _ extends ValidatedForm.Validated(parent) {
    static Validated = Validated;
  }

  return _ as unknown as ValidatedForm;
}

export default Validated(BaseForm);
