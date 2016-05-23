import cloneDeep   from 'lodash.clonedeep';
import isEqual     from 'lodash.isequal';
import set         from 'lodash.set';
import {PropTypes} from 'react';

import BaseForm from './BaseForm';

export default class ValidatedForm extends BaseForm {
    constructor () {
        super(...arguments);

        this.state = {
            error: null,
            after: false,
            validator: this
                .getChildContextSchema()
                .getValidator(this.props.validator)
        };

        this.validate = this.validate.bind(this);
    }

    getChildContextError () {
        return super.getChildContextError() || this.state.error;
    }

    componentWillReceiveProps ({model, schema, validator}) {
        super.componentWillReceiveProps(...arguments);

        if (this.props.schema    !== schema ||
            this.props.validator !== validator) {
            this.setState({
                after: true,
                validator: this
                    .getChildContextSchema()
                    .getValidator(validator)
            }, () => this.validate());
        } else if (!isEqual(this.props.model, model)) {
            this.setState({
                after: true
            }, () => this.validate());
        }
    }

    validate (callback, key, value) {
        let model = cloneDeep(this.getChildContextModel());
        if (model && key) {
            set(model, key, cloneDeep(value));
        }

        try {
            this.state.validator(model);
            this.setState({error: null}, callback);
        } catch (error) {
            this.setState({error}, callback);
        }
    }

    onChange (key, value) {
        if (this.props.validate === 'onChange' ||
            this.props.validate === 'onChangeAfterSubmit' && this.state.after) {
            this.validate(() => super.onChange(...arguments), key, value);
        } else {
            super.onChange(...arguments);
        }
    }

    onSubmit (event) {
        event.preventDefault();
        event.stopPropagation();

        this.validate(() =>
            this.setState({after: true}, () =>
                this.getChildContextError() || super.onSubmit()
            )
        );
    }
}

ValidatedForm.defaultProps = {
    ...BaseForm.defaultProps,

    validate: 'onChangeAfterSubmit'
};

ValidatedForm.propTypes = {
    ...BaseForm.propTypes,

    validate: PropTypes.oneOf([
        'onChange',
        'onChangeAfterSubmit',
        'onSubmit'
    ]),
    validator: PropTypes.any
};
