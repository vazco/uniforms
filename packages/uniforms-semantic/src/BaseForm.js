import BaseForm from 'uniforms/BaseForm';
import classnames from 'classnames';

const Semantic = parent =>
  class extends parent {
    static Semantic = Semantic;

    static displayName = `Semantic${parent.displayName}`;

    getNativeFormProps() {
      const props = super.getNativeFormProps();
      const error = this.getChildContextError();

      return {
        ...props,
        className: classnames('ui', props.className, {error}, 'form')
      };
    }
  };

export default Semantic(BaseForm);
