import classnames from 'classnames';
import omit from 'lodash/omit';
import { BaseForm } from 'uniforms';

function Bootstrap5(parent: any) {
  class _ extends parent {
    static Bootstrap5 = Bootstrap5;

    static displayName = `Bootstrap5${parent.displayName}`;

    getContextState() {
      return { ...super.getContextState(), grid: this.props.grid };
    }

    getNativeFormProps() {
      const error = this.getContextError();
      const props = super.getNativeFormProps();

      return {
        ...omit(props, ['grid']),
        className: classnames({ error }, props.className),
      };
    }
  }

  return _ as unknown as typeof BaseForm;
}

export default Bootstrap5(BaseForm);
