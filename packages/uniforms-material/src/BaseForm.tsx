import { BaseForm } from 'uniforms';

function Material(parent: any) {
  class _ extends parent {
    static Material = Material;

    static displayName = `Material${parent.displayName}`;
  }

  return _ as unknown as typeof BaseForm;
}

export default Material(BaseForm);
