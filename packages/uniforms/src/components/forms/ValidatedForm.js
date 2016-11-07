import cloneDeep   from 'lodash.clonedeep';
import isEqual     from 'lodash.isequal';
import set         from 'lodash.set';
import {PropTypes} from 'react';

import BaseForm from './BaseForm';

// Silent `Uncaught (in promise)` warnings
const __unhandledMark = typeof Symbol === 'undefined' ? '__uniformsPromiseMark' : Symbol();
const __unhandled = event =>
    event &&
    event.reason &&
    event.reason[__unhandledMark] &&
    event.preventDefault()
;

if (typeof process !== 'undefined' && process.addListener) {
    process.addListener('unhandledRejection', __unhandled);
}

if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('unhandledrejection', __unhandled);
}

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
        validate:  PropTypes.oneOf([
            'onChange',
            'onChangeAfterSubmit',
            'onSubmit'
        ]).isRequired
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
                this.onValidateModel(model);
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
            this.setState({validate: true}, () =>
                resolve(this.onValidate().then(() => super.onSubmit()))
            )
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

        const markAndHandle = (error = catched, resolve, reject) =>
            this.setState({error}, () => {
                if (error) {
                    error[__unhandledMark] = true;

                    reject(error);
                } else {
                    resolve();
                }
            })
        ;

        return new Promise((resolve, reject) =>
            this.props.onValidate
                ? this.props.onValidate(model, catched, error => markAndHandle(error, resolve, reject))
                : markAndHandle(catched, resolve, reject)
        );
    }
};

export default Validated(BaseForm);
