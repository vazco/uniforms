import classnames from 'classnames';
import omit from 'lodash/omit';
import { BaseForm } from 'uniforms';

function Bootstrap4(parent: any) {
  class _ extends parent {
    static Bootstrap4 = Bootstrap4;

    static displayName = `Bootstrap4${parent.displayName}`;

    getContextState() {
      return { ...super.getContextState(), grid: this.props.grid };
    }

    getNativeFormProps() {
      const error = this.getContextError();
      const props = super.getNativeFormProps();

      return {
        ...omit(props, ['grid']),
        className: classnames('form', { error }, props.className),
      };
    }
  }

  return _ as unknown as typeof BaseForm;
}

export default Bootstrap4(BaseForm);
