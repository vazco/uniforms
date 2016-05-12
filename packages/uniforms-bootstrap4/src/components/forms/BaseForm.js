import classnames         from 'classnames';
import {BaseForm as Base} from 'uniforms';

export default class BaseForm extends Base {
    getNativeFormProps () {
        const props = super.getNativeFormProps();

        return {
            ...props,
            className: classnames('form', props.className, {error: !!this.getChildContextError()})
        };
    }
}
