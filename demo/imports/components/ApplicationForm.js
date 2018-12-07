import PanelGroup from 'react-panelgroup';
import React from 'react';
import ValidatedForm from 'uniforms/ValidatedForm';
import omit from 'lodash/omit';

export class ApplicationForm extends ValidatedForm {
  getChildContextState() {
    return {
      ...super.getChildContextState(),
      theme: this.props.model.theme
    };
  }

  render() {
    const props = omit(this.getNativeFormProps(), ['onSubmit']);

    return <PanelGroup {...props} />;
  }
}

export default ApplicationForm;
