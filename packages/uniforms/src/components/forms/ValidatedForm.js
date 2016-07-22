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

    componentWillReceiveProps ({model, schema, validate, validator}) {
        super.componentWillReceiveProps(...arguments);

        if (this.props.schema    !== schema ||
            this.props.validator !== validator) {
            this.setState({
                validator: this
                    .getChildContextSchema()
                    .getValidator(validator)
            }, () => {
                if (validate === 'onChange' ||
                    validate === 'onChangeAfterSubmit' && this.state.validate) {
                    this.onValidate();
                }
            });
        } else if (!isEqual(this.props.model, model)) {
            if (validate === 'onChange' ||
                validate === 'onChangeAfterSubmit' && this.state.validate) {
                this.onValidate();
            }
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

        return new Promise(resolve =>
            this.setState({validate: true}, () => {
                const promise = this.onValidate();

                // This prevents "Uncaught (in promise)" warning
                promise.catch(() => {});

                resolve(promise.then(() => super.onSubmit()));
            })
        );
    }

    onValidate (key, value) {
        let model = this.getModel();
        if (model && key) {
            model = set(cloneDeep(model), key, cloneDeep(value));
        }

        return this.onValidateModel(model);
    }

    onValidateModel (model) {
        let catched = this.props.error || null;
        try {
            this.state.validator(model);
        } catch (error) {
            catched = error;
        }

        return new Promise((resolve, reject) => {
            if (this.props.onValidate) {
                this.props.onValidate(model, catched, (error = catched) =>
                    this.setState({error}, () => error ? reject(error) : resolve())
                );
            } else {
                this.setState({error: catched}, () => catched ? reject(catched) : resolve());
            }
        });
    }
};

export default Validated(BaseForm);
