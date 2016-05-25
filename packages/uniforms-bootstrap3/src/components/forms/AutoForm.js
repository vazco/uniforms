import classnames         from 'classnames';
import {PropTypes}        from 'react';
import {AutoForm as Base} from 'uniforms';

import AutoField   from '../fields/AutoField';
import ErrorsField from '../fields/ErrorsField';
import SubmitField from '../fields/SubmitField';

export default class AutoForm extends Base {
    getNativeFormProps () {
        const props = super.getNativeFormProps();

        return {
            ...props,
            className: classnames(
                'form',
                {
                    error: !!this.getChildContextError(),
                    'form-horizontal': !!props.grid
                },
                props.className
            )
        };
    }

    getChildContextState () {
        return {
            ...super.getChildContextState(),
            grid: this.props.grid
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

AutoForm.propTypes = {
    ...Base.propTypes,
    grid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
