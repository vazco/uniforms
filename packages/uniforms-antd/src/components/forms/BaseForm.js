import classnames from 'classnames';
import {BaseForm} from 'uniforms';

const AntD = parent => class extends parent {
    static AntD = AntD;

    static displayName = `AntD${parent.displayName}`;

    getNativeFormProps () {
        const props = super.getNativeFormProps();
        const error = this.getChildContextError();

        return {
            ...props,
            className: classnames('ui', props.className, {error}, 'form')
        };
    }
};

export default AntD(BaseForm);
