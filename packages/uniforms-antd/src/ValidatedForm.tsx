import { ValidatedForm } from 'uniforms';

import BaseForm from './BaseForm';

function Validated(parent: any): any {
  return class extends ValidatedForm.Validated(parent) {
    static Validated = Validated;
  };
}

export default Validated(BaseForm);
