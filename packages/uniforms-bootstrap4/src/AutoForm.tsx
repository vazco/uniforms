import { AutoForm } from 'uniforms';

import ValidatedQuickForm from './ValidatedQuickForm';

function Auto(parent: any): any {
  return class extends AutoForm.Auto(parent) {
    static Auto = Auto;
  };
}

export default Auto(ValidatedQuickForm);
