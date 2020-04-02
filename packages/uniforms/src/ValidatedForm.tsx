import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { SyntheticEvent } from 'react';

import BaseForm, { BaseFormProps, BaseFormState } from './BaseForm';
import { DeepPartial, ValidateMode } from './types';

export type ValidatedFormProps<Model extends {}> = BaseFormProps<Model> & {
  onValidate: (
    model: DeepPartial<Model>,
    error: any,
    callback: (error?: any) => void,
  ) => void;
  validate: ValidateMode;
  validator?: any;
};

export type ValidatedFormState<Model extends {}> = BaseFormState<Model> & {
  error: any;
  validate: boolean;
  validating: boolean;
  validator: (model: DeepPartial<Model>) => void | never;
};

function Validated<Base extends typeof BaseForm>(base: Base) {
  // @ts-ignore: Mixin class problem.
  return class ValidatedForm<
    Model extends {} = Record<string, any>,
    Props extends ValidatedFormProps<Model> = ValidatedFormProps<Model>,
    State extends ValidatedFormState<Model> = ValidatedFormState<Model>
  > extends base<Model, Props, State> {
    static Validated = Validated;
    static displayName = `Validated${base.displayName}`;

    static defaultProps = {
      ...base.defaultProps,

      onValidate(model, error, callback) {
        callback();
      },

      validate: 'onChangeAfterSubmit',
    };

    validate: typeof ValidatedForm.prototype.onValidate;
    validateModel: typeof ValidatedForm.prototype.onValidateModel;

    constructor(props: Props) {
      super(props);

      this.state = {
        ...this.state,

        error: null,
        validate: false,
        validating: false,
        validator: this.getContextSchema().getValidator(this.props.validator),
      };

      this.onValidate = this.validate = this.onValidate.bind(this);
      this.onValidateModel = this.validateModel = this.onValidateModel.bind(
        this,
      );
    }

    getContextError() {
      return super.getContextError() || this.state.error;
    }

    getContext() {
      return {
        ...super.getContext(),
        validating: this.state.validating,
      };
    }

    getNativeFormProps(): Record<string, any> {
      return omit(super.getNativeFormProps(), [
        'onValidate',
        'validate',
        'validator',
      ]);
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: never) {
      super.componentDidUpdate(prevProps, prevState, snapshot);

      const { model, schema, validate, validator } = this.props;
      if (schema !== prevProps.schema || validator !== prevProps.validator) {
        this.setState(
          state => ({ validator: state.bridge.getValidator(validator) }),
          () => {
            if (shouldRevalidate(validate, this.state.validate)) {
              this.onValidate().catch(noop);
            }
          },
        );
      } else if (
        !isEqual(model, prevProps.model) &&
        shouldRevalidate(validate, this.state.validate)
      ) {
        this.onValidateModel(model).catch(noop);
      }
    }

    onChange(key: string, value: any) {
      if (shouldRevalidate(this.props.validate, this.state.validate)) {
        this.onValidate(key, value).catch(noop);
      }

      // FIXME: https://github.com/vazco/uniforms/issues/293
      // if (this.props.validate === 'onSubmit' && this.state.validate) {
      //     this.setState(() => ({error: null}));
      // }

      super.onChange(key, value);
    }

    __reset(state: State) {
      return {
        ...super.__reset(state),
        error: null,
        validate: false,
        validating: false,
      };
    }

    onSubmit(event?: SyntheticEvent) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const promise: Promise<void> = new Promise((resolve, reject) => {
        this.setState(
          () => ({ submitting: true, validate: true }),
          () => {
            this.onValidate().then(() => {
              super.onSubmit().then(resolve, error => {
                this.setState({ error });
                reject(error);
              });
            }, reject);
          },
        );
      });

      promise
        // `onSubmit` should never reject, so we ignore this rejection.
        .catch(noop)
        .then(() => {
          // It can be already unmounted.
          if (this.mounted) {
            // If validation fails, or `super.onSubmit` doesn't touch `submitting`, we need to reset it.
            this.setState(state =>
              state.submitting ? { submitting: false } : null,
            );
          }
        });

      return promise;
    }

    onValidate(key?: string, value?: any) {
      let model = this.getContextModel();
      if (model && key) {
        model = set(cloneDeep(model), key, cloneDeep(value));
      }

      return this.onValidateModel(model);
    }

    onValidateModel(model: Props['model']) {
      model = this.getModel('validate', model);

      let catched = this.props.error || null;
      try {
        this.state.validator(model);
      } catch (error) {
        catched = error;
      }

      this.setState({ validating: true });
      return new Promise((resolve, reject) => {
        this.props.onValidate(model, catched, (error = catched) => {
          // Do not copy error from props to state.
          this.setState(
            () => ({
              error: error === this.props.error ? null : error,
              validating: false,
            }),
            () => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            },
          );
        });
      });
    }
  };
}

function shouldRevalidate(inProps: ValidateMode, inState: boolean) {
  return (
    inProps === 'onChange' || (inProps === 'onChangeAfterSubmit' && inState)
  );
}

export default Validated(BaseForm);
