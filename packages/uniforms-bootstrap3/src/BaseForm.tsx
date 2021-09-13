import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function Bootstrap3(parent: any) {
  class _ extends parent {
    static Bootstrap3 = Bootstrap3;

    static displayName = `Bootstrap3${parent.displayName}`;

    getContextState() {
      return {
        ...super.getContextState(),
        grid: this.props.grid,
      };
    }

    getNativeFormProps() {
      const error = this.getContextError();
      const {
        className,
        grid,

        ...props
      } = super.getNativeFormProps();

      return {
        ...props,
        className: classnames(
          'form',
          { error, 'form-horizontal': grid },
          className,
        ),
      };
    }
  }

  return _ as unknown as typeof BaseForm;
}

export default Bootstrap3(BaseForm);
