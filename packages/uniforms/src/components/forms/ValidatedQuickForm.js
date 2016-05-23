import React from 'react';

import ValidatedForm from './ValidatedForm';

export default class ValidatedQuickForm extends ValidatedForm {
    constructor () {
        super(...arguments);

        this.getAutoField   = this.getAutoField.bind(this);
        this.getErrorsField = this.getErrorsField.bind(this);
        this.getSubmitField = this.getSubmitField.bind(this);
    }

    render () {
        let nativeFormProps = this.getNativeFormProps();
        if (nativeFormProps.children) {
            return super.render();
        }

        const AutoField   = this.getAutoField();
        const ErrorsField = this.getErrorsField();
        const SubmitField = this.getSubmitField();

        return (
            <form {...nativeFormProps}>
                {this.getChildContextSchema().getSubfields().map(key =>
                    <AutoField key={key} name={key} />
                )}

                <ErrorsField />
                <SubmitField />
            </form>
        );
    }

    getAutoField () {
        return () => null;
    }

    getErrorsField () {
        return () => null;
    }

    getSubmitField () {
        return () => null;
    }
}
