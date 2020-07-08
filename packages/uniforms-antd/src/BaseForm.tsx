import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function AntD(parent: any): any {
  class _ extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;

    getNativeFormProps() {
      const { className, ...props } = super.getNativeFormProps();

      return {
        ...props,
        className: classnames('ant-form', 'ant-form-vertical', className),
      };
    }
  }

  return _;
}

export default AntD(BaseForm);
