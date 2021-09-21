import classnames from 'classnames';
import { BaseForm } from 'uniforms';

function Semantic(parent: any) {
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

  return _ as unknown as typeof BaseForm;
}

export default Semantic(BaseForm);
