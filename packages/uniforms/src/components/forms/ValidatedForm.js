import cloneDeep   from 'lodash.clonedeep';
import isEqual     from 'lodash.isequal';
import set         from 'lodash.set';
import {PropTypes} from 'react';

import BaseForm from './BaseForm';

const Validated = parent => class extends parent {
    static Validated = Validated;

    static displayName = `Validated${parent.displayName}`;

    static defaultProps = {
        ...parent.defaultProps,

        validate: 'onChangeAfterSubmit'
    };

    static propTypes = {
        ...parent.propTypes,

        onValidate: PropTypes.func,

        validator: PropTypes.any,
        validate: PropTypes.oneOf([
            'onChange',
            'onChangeAfterSubmit',
            'onSubmit'
        ])
    };

    constructor () {
        super(...arguments);

        this.state = {
            ...this.state,

            error: null,
            validate: false,
            validator: this
                .getChildContextSchema()
                .getValidator(this.props.validator)
        };

        this.onValidate      = this.validate      = this.onValidate.bind(this);
        this.onValidateModel = this.validateModel = this.onValidateModel.bind(this);
    }

    getChildContextError () {
        return super.getChildContextError() || this.state.error;
    }

    getNativeFormProps () {
        const {
            onValidate, // eslint-disable-line no-unused-vars
            validator,  // eslint-disable-line no-unused-vars
            validate,   // eslint-disable-line no-unused-vars

            ...props
        } = super.getNativeFormProps();

        return props;
    }

    componentWillReceiveProps ({model, schema, validator}) {
        super.componentWillReceiveProps(...arguments);

        if (this.props.schema    !== schema ||
            this.props.validator !== validator) {
            this.setState({
                validate: true,
                validator: this
                    .getChildContextSchema()
                    .getValidator(validator)
            });

            this.onValidate();
        } else if (!isEqual(this.props.model, model)) {
            this.setState({validate: true});
            this.onValidate();
        }
    }

    onChange (key, value) {
        if (this.props.validate === 'onChange' ||
            this.props.validate === 'onChangeAfterSubmit' && this.state.validate) {
            this.onValidate(key, value);
        }

        super.onChange(...arguments);
    }

    onReset () {
        super.onReset();
        this.setState(() => ({error: null, validate: false}));
    }

    onSubmit (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.onValidate();
        this.setState({validate: true}, () => this.getChildContextError() || super.onSubmit());
    }

    onValidate (key, value) {
        let model = this.getModel();
        if (model && key) {
            model = set(cloneDeep(model), key, cloneDeep(value));
        }

        this.onValidateModel(model);
    }

    onValidateModel (model) {
        let catched = null;
        try {
            this.state.validator(model);
        } catch (error) {
            catched = error;
        }

        if (this.props.onValidate) {
            this.props.onValidate(model, catched, (error = catched) => this.setState({error}));
        } else {
            this.setState({error: catched});
        }
    }
};

export default Validated(BaseForm);
