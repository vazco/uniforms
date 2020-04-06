import { BaseForm } from 'uniforms';

function Material(parent: any): any {
  return class extends parent {
    static Material = Material;

    static displayName = `Material${parent.displayName}`;
  };
}

export default Material(BaseForm);
