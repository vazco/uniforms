import { BaseForm } from 'uniforms';

function Material(parent: any): any {
  class _ extends parent {
    static Material = Material;

    static displayName = `Material${parent.displayName}`;
  }

  return _;
}

export default Material(BaseForm);
