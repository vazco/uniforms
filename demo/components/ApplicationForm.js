import PanelGroup      from 'react-panelgroup';
import React           from 'react';
import {ValidatedForm} from 'uniforms';

export class ApplicationForm extends ValidatedForm {
    getChildContextState () {
        return {
            ...super.getChildContextState(),
            theme: this.props.model.theme
        };
    }

    render () {
        const {
            onSubmit, // eslint-disable-line no-unused-vars
            ...props
        } = this.getNativeFormProps();

        return (
            <PanelGroup {...props} />
        );
    }
}

export default ApplicationForm;
