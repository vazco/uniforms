import classnames  from 'classnames';
import {BaseForm}  from 'uniforms';
import {PropTypes} from 'react';

const Bootstrap3 = parent => class extends parent {
    static Bootstrap3 = Bootstrap3;

    static displayName = `Bootstrap3${parent.displayName}`;

    static propTypes = {
        ...parent.propTypes,

        grid: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    };

    getChildContextState () {
        return {
            ...super.getChildContextState(),
            grid: this.props.grid
        };
    }

    getNativeFormProps () {
        const props = super.getNativeFormProps();
        const error = this.getChildContextError();

        return {
            ...props,
            className: classnames('form', {error, 'form-horizontal': props.grid}, props.className)
        };
    }
};

export default Bootstrap3(BaseForm);
