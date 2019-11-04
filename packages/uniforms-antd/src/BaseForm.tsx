import { BaseForm } from 'uniforms';

const AntD = (parent: any) =>
  class extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;
  };

export default AntD(BaseForm);
