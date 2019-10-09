import BaseForm from 'uniforms/BaseForm';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Bootstrap4 = parent =>
  class extends parent {
    static Bootstrap4 = Bootstrap4;

    static displayName = `Bootstrap4${parent.displayName}`;

    static propTypes = {
      ...parent.propTypes,

      grid: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        PropTypes.string
      ])
    };

    getContextState() {
      return {
        ...super.getContextState(),
        grid: this.props.grid
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
        className: classnames('form', { error }, className)
      };
    }
  };

export default Bootstrap4(BaseForm);
