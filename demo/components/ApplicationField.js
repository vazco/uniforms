import {BaseField} from 'uniforms';

class ApplicationField extends BaseField {
    shouldComponentUpdate (props, state, context) {
        return (
            this.context.uniforms.state.theme !== context.uniforms.state.theme ||
            super.shouldComponentUpdate(props, state, context)
        );
    }
}

export default ApplicationField;
