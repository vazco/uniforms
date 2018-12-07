import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import set from 'lodash/set';

import BaseForm from './BaseForm';
import {__childContextTypesBuild} from './BaseForm';
import {__childContextTypes} from './BaseForm';

const childContextTypes = __childContextTypesBuild(
  merge({state: {validating: PropTypes.bool.isRequired}}, __childContextTypes)
);

const Validated = parent =>
  class extends parent {
    static Validated = Validated;

    static displayName = `Validated${parent.displayName}`;

    static defaultProps = {
      ...parent.defaultProps,

      onValidate(model, error, callback) {
        callback();
      },

      validate: 'onChangeAfterSubmit'
    };

    static propTypes = {
      ...parent.propTypes,

      onValidate: PropTypes.func.isRequired,

      validator: PropTypes.any,
      validate: PropTypes.oneOf(['onChange', 'onChangeAfterSubmit', 'onSubmit']).isRequired
    };

    static childContextTypes = {
      ...(parent.childContextTypes || {}),
      uniforms: childContextTypes
    };

    constructor() {
      super(...arguments);

      this.state = {
        ...this.state,

        error: null,
        validate: false,
        validating: false,
        validator: this.getChildContextSchema().getValidator(this.props.validator)
      };

      this.onValidate = this.validate = this.onValidate.bind(this);
      this.onValidateModel = this.validateModel = this.onValidateModel.bind(this);
    }

    getChildContextError() {
      return super.getChildContextError() || this.state.error;
    }

    getChildContextState() {
      return {
        ...super.getChildContextState(),

        validating: this.state.validating
      };
    }

    getNativeFormProps() {
      return omit(super.getNativeFormProps(), ['onValidate', 'validate', 'validator']);
    }

    componentWillReceiveProps({model, schema, validate, validator}) {
      super.componentWillReceiveProps(...arguments);

      if (this.props.schema !== schema || this.props.validator !== validator) {
        this.setState(
          ({bridge}) => ({
            validator: bridge.getValidator(validator)
          }),
          () => {
            if (validate === 'onChange' || (validate === 'onChangeAfterSubmit' && this.state.validate)) {
              this.onValidate().catch(() => {});
            }
          }
        );
      } else if (!isEqual(this.props.model, model)) {
        if (validate === 'onChange' || (validate === 'onChangeAfterSubmit' && this.state.validate)) {
          this.onValidateModel(model).catch(() => {});
        }
      }
    }

    onChange(key, value) {
      // eslint-disable-next-line max-len
      if (
        this.props.validate === 'onChange' ||
        (this.props.validate === 'onChangeAfterSubmit' && this.state.validate)
      ) {
        this.onValidate(key, value).catch(() => {});
      }

      // FIXME: https://github.com/vazco/uniforms/issues/293
      // if (this.props.validate === 'onSubmit' && this.state.validate) {
      //     this.setState(() => ({error: null}));
      // }

      super.onChange(...arguments);
    }

    __reset(state) {
      return {...super.__reset(state), error: null, validate: false, validating: false};
    }

    onSubmit(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const promise = new Promise((resolve, reject) => {
        this.setState(
          () => ({submitting: true, validate: true}),
          () => {
            this.onValidate().then(() => {
              super.onSubmit().then(resolve, error => {
                this.setState({error});
                reject(error);
              });
            }, reject);
          }
        );
      });

      promise
        .catch(() => {
          // `onSubmit` should never reject, so we ignore this rejection.
        })
        .then(() => {
          // It can be already unmounted.
          if (this.mounted)
            // If validation fails, or `super.onSubmit` doesn't touch `submitting`, we need to reset it.
            this.setState(state => (state.submitting ? {submitting: false} : null));
        });

      return promise;
    }

    onValidate(key, value) {
      let model = this.getChildContextModel();
      if (model && key) {
        model = set(cloneDeep(model), key, cloneDeep(value));
      }

      return this.onValidateModel(model);
    }

    onValidateModel(model) {
      model = this.getModel('validate', model);

      let catched = this.props.error || null;
      try {
        this.state.validator(model);
      } catch (error) {
        catched = error;
      }

      this.setState({validating: true});
      return new Promise((resolve, reject) => {
        this.props.onValidate(model, catched, (error = catched) => {
          // Do not copy error from props to state.
          this.setState(
            () => ({error: error === this.props.error ? null : error, validating: false}),
            () => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            }
          );
        });
      });
    }
  };

export default Validated(BaseForm);
