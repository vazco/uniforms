import classnames from 'classnames';
import { BaseForm } from 'uniforms';

const Semantic = (parent: any): any =>
  class extends parent {
    static Semantic = Semantic;

    static displayName = `Semantic${parent.displayName}`;

    getNativeFormProps() {
      const props = super.getNativeFormProps();
      const error = this.getChildContextError();

      return {
        ...props,
        className: classnames('ui', props.className, { error }, 'form'),
      };
    }
  };

export default Semantic(BaseForm);
