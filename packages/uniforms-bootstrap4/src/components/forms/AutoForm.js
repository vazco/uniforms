import classnames         from 'classnames';
import {AutoForm as Base} from 'uniforms';

import AutoField   from '../fields/AutoField';
import ErrorsField from '../fields/ErrorsField';
import SubmitField from '../fields/SubmitField';

export default class AutoForm extends Base {
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
