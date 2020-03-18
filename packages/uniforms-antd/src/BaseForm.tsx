import { BaseForm } from 'uniforms';

const AntD = (parent: any): any => {
  class _ extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;
  }

  return _;
};

export default AntD(BaseForm);
