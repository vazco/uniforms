import BaseForm from 'uniforms/BaseForm';

const Material = (parent: any): any =>
  class extends parent {
    static Material = Material;

    static displayName = `Material${parent.displayName}`;
  };

export default Material(BaseForm);
