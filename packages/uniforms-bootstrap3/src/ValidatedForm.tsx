import { ValidatedForm } from 'uniforms';

import BaseForm from './BaseForm';

const Validated = (parent: any): any =>
  class extends ValidatedForm.Validated(parent) {
    static Validated = Validated;
  };

export default Validated(BaseForm);
