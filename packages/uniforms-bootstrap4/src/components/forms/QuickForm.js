import classnames          from 'classnames';
import {PropTypes}         from 'react';
import {QuickForm as Base} from 'uniforms';

import AutoField   from '../fields/AutoField';
import ErrorsField from '../fields/ErrorsField';
import SubmitField from '../fields/SubmitField';

export default class QuickForm extends Base {
    getNativeFormProps () {
        const props = super.getNativeFormProps();

        return {
            ...props,
            className: classnames('form', props.className, {error: !!this.getChildContextError()})
        };
    }

    getAutoField () {
        return AutoField;
    }

    getErrorsField () {
        return ErrorsField;
    }

    getSubmitField () {
        return SubmitField;
    }
}

QuickForm.propTypes = {
    ...Base.propTypes,
    grid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
