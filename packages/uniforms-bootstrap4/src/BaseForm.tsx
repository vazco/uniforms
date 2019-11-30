import classnames from 'classnames';
import { BaseForm } from 'uniforms';

const Bootstrap4 = (parent: any): any =>
  class extends parent {
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
  };

export default Bootstrap4(BaseForm);
