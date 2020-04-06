import { BaseForm } from 'uniforms';

function Unstyled(parent: any): any {
  return class extends parent {
    static Unstyled = Unstyled;

    static displayName = `Unstyled${parent.displayName}`;
  };
}

export default Unstyled(BaseForm);
