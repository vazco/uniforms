import React       from 'react';
import {PropTypes} from 'react';

import BaseForm from './BaseForm';
import nothing  from '../../helpers/nothing';

const Quick = parent => class extends parent {
    static Quick = Quick;

    static displayName = `Quick${parent.displayName}`;

    static propTypes = {
        ...parent.propTypes,

        autoField:   PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        errorsField: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        submitField: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    };

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

        const AutoField   = this.props.autoField   || this.getAutoField();
        const ErrorsField = this.props.errorsField || this.getErrorsField();
        const SubmitField = this.props.submitField || this.getSubmitField();

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
        return () => nothing;
    }

    getErrorsField () {
        return () => nothing;
    }

    getSubmitField () {
        return () => nothing;
    }
};

export default Quick(BaseForm);
