import React         from 'react';
import ValidatedForm from 'uniforms/ValidatedForm';

// Update after react-panelgroup#11.
import PanelGroup from './vendor/PanelGroup';

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
