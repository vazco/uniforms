import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function Semantic(parent: any): any {
  class _ extends parent {
    static Semantic = Semantic;

    static displayName = `Semantic${parent.displayName}`;

    getNativeFormProps() {
      const props = super.getNativeFormProps();
      const error = this.getContextError();

      return {
        ...props,
        className: classnames('ui', props.className, { error }, 'form'),
      };
    }
  }

  return _;
}

export default Semantic(BaseForm);
