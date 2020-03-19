import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { Component, SyntheticEvent } from 'react';

import BaseForm from './BaseForm';
import { DeepPartial, Partialize, ValidateMode } from './types';

type ValidatedFormProps<Model extends object> = BaseForm<Model>['props'] & {
  onValidate: (
    model: DeepPartial<Model>,
    error: any,
    callback: (error?: any) => void,
  ) => void;
  validate: ValidateMode;
  validator: any;
};

type ValidatedFormState<Model extends object> = BaseForm<Model>['state'] & {
  error: any;
  validate: boolean;
  validating: boolean;
  validator: (model: DeepPartial<Model>) => void | never;
};

function Validated<Model extends object>(parent: typeof BaseForm) {
  type ValidatedForm<DefaultProps extends keyof ValidatedFormProps<Model>> = {
    new (props: ValidatedFormProps<Model>): BaseForm<Model> &
      Component<
        Partialize<ValidatedFormProps<Model>, DefaultProps>,
        ValidatedFormState<Model>
      >;
    Validated: (parent: typeof BaseForm) => ValidatedForm<DefaultProps>;
  };

  // @ts-ignore
  class _ extends (parent as ValidatedForm<never>) {
    static Validated = Validated;
    static displayName = `Validated${parent.displayName}`;

    static defaultProps: Pick<
      ValidatedFormProps<Model>,
      keyof typeof parent.defaultProps | 'onValidate' | 'validate'
    > = {
      ...parent.defaultProps,

      onValidate(model, error, callback) {
        callback();
      },

      validate: 'onChangeAfterSubmit',
    };

    validate: typeof _.prototype.onValidate;
    validateModel: typeof _.prototype.onValidateModel;

    constructor(props: ValidatedFormProps<Model>) {
      // eslint-disable-next-line constructor-super
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

    getContextState() {
      return {
        ...super.getContextState(),

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

    componentDidUpdate(prevProps, prevState, snapshot) {
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

    __reset(state: ValidatedFormState<Model>) {
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
              super.onSubmit().then(resolve, (error: any) => {
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

    onValidate(key?: any, value?: any) {
      let model = this.getContextModel();
      if (model && key) {
        model = set(cloneDeep(model), key, cloneDeep(value));
      }

      return this.onValidateModel(model);
    }

    onValidateModel(model: any) {
      model = this.getModel('validate', model);

      let catched = this.props.error || null;
      try {
        this.state.validator(model);
      } catch (error) {
        catched = error;
      }

      this.setState({ validating: true });
      return new Promise((resolve, reject) => {
        this.props.onValidate(model, catched, (error: any = catched) => {
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
  }

  return _ as ValidatedForm<keyof typeof _.defaultProps>;
}

function shouldRevalidate(inProps: ValidateMode, inState: boolean) {
  return (
    inProps === 'onChange' || (inProps === 'onChangeAfterSubmit' && inState)
  );
}

export default Validated(BaseForm);
