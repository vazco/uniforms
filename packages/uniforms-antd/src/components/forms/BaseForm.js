import classnames from 'classnames';
import {BaseForm} from 'uniforms';
import {PropTypes} from 'react';

const AntD = parent => class extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;

    static propTypes = {
        ...parent.propTypes,

        grid: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
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
        const error = this.getChildContextError();
        const {
            className,
            grid,

            ...props
        } = super.getNativeFormProps();

        return {
            ...props,
            className: classnames('form', {error, 'form-horizontal': grid}, className)
        };
    }
};

export default AntD(BaseForm);
