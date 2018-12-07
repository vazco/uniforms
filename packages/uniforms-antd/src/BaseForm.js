import BaseForm from 'uniforms/BaseForm';

const AntD = parent =>
  class extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;
  };

export default AntD(BaseForm);
