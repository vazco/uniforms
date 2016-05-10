import classnames              from 'classnames';
import {ValidatedForm as Base} from 'uniforms';

export default class ValidatedForm extends Base {
    getNativeFormProps () {
        const props = super.getNativeFormProps();

        return {
            ...props,
            className: classnames('ui', props.className, {error: !!this.getChildContextError()}, 'form')
        };
    }
}
