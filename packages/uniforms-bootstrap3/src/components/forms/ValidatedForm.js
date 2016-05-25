import classnames              from 'classnames';
import {PropTypes}             from 'react';
import {ValidatedForm as Base} from 'uniforms';

export default class ValidatedForm extends Base {
    getNativeFormProps () {
        const props = super.getNativeFormProps();

        return {
            ...props,
            className: classnames('form', props.className, {error: !!this.getChildContextError()})
        };
    }
}

ValidatedForm.propTypes = {
    ...Base.propTypes,
    grid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
