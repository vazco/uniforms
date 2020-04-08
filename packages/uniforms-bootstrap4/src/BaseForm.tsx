import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function Bootstrap4(parent: any): any {
  class _ extends parent {
    static Bootstrap4 = Bootstrap4;

    static displayName = `Bootstrap4${parent.displayName}`;

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
        grid, // eslint-disable-line no-unused-vars

        ...props
      } = super.getNativeFormProps();

      return {
        ...props,
        className: classnames('form', { error }, className),
      };
    }
  }

  return _;
}

export default Bootstrap4(BaseForm);
