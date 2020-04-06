import { BaseForm } from 'uniforms';

function AntD(parent: any): any {
  return class extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;
  };
}

export default AntD(BaseForm);
