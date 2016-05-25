import classnames  from 'classnames';
import {BaseForm}  from 'uniforms';
import {PropTypes} from 'react';

const Bootstrap4 = parent => class extends parent {
    static Bootstrap4 = Bootstrap4;

    static displayName = `Bootstrap4${parent.displayName}`;

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
            className: classnames('form', {error}, props.className)
        };
    }
};

export default Bootstrap4(BaseForm);
