import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function Semantic(parent: any): any {
  return class extends parent {
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
  };
}

export default Semantic(BaseForm);
