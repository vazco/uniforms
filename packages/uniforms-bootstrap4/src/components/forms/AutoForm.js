import classnames         from 'classnames';
import {PropTypes}        from 'react';
import {AutoForm as Base} from 'uniforms';

import AutoField   from '../fields/AutoField';
import ErrorsField from '../fields/ErrorsField';
import SubmitField from '../fields/SubmitField';

export default class AutoForm extends Base {
    static propTypes = {
        ...Base.propTypes,

        grid: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    };

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
