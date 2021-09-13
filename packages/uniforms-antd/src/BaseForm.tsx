import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function AntD(parent: any) {
  class _ extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;

    getNativeFormProps() {
      const {
        className,
        layout = 'vertical',
        ...props
      } = super.getNativeFormProps();

      return {
        ...props,
        className: classnames('ant-form', 'ant-form-' + layout, className),
      };
    }
  }

  return _ as unknown as typeof BaseForm;
}

export default AntD(BaseForm);
