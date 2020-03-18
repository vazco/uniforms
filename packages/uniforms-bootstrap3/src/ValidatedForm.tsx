import { ValidatedForm } from 'uniforms';

import BaseForm from './BaseForm';

const Validated = (parent: any): any => {
  class _ extends ValidatedForm.Validated(parent) {
    static Validated = Validated;
  }

  return _;
};

export default Validated(BaseForm);
