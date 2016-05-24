import classnames         from 'classnames';
import {BaseForm as Base} from 'uniforms';
import {PropTypes}        from 'react';

export default class BaseForm extends Base {
    getNativeFormProps () {
        const props = super.getNativeFormProps();

        return {
            ...props,
            className: classnames('form', props.className, {error: !!this.getChildContextError()})
        };
    }
    getChildContextState () {
        return {
            ...super.getChildContextState(),
            grid: this.props.grid
        };
    }
}

BaseForm.propTypes = {
    ...Base.propTypes,
    grid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
