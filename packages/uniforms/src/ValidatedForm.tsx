import cloneDeep from 'lodash/cloneDeep';
import identity from 'lodash/identity';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { Component, SyntheticEvent } from 'react';

import { BaseForm, BaseFormProps, BaseFormState } from './BaseForm';
import { Context, DeepPartial, ValidateMode } from './types';

export type ValidatedFormProps<Model> = BaseFormProps<Model> & {
  onValidate(model: DeepPartial<Model>, error: any | null): Promise<void>;
  validate: ValidateMode;
  validator?: any;
};

export type ValidatedFormState<Model> = BaseFormState<Model> & {
  error: any;
  validate: boolean;
  validating: boolean;
  validator(model: DeepPartial<Model>): Promise<void>;
};

export function Validated<Base extends typeof BaseForm>(Base: Base) {
  // @ts-ignore: Mixin class problem.
  class ValidatedForm<
    Model,
    Props extends ValidatedFormProps<Model> = ValidatedFormProps<Model>,
    State extends ValidatedFormState<Model> = ValidatedFormState<Model>
  > extends Base<Model, Props, State> {
    static Validated = Validated;
    static displayName = `Validated${Base.displayName}`;
    static defaultProps = {
      ...Base.defaultProps,
      onValidate(model, error) {
        return error ? Promise.reject(error) : Promise.resolve();
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
        validator: this.getContextSchema().getValidator(props.validator),
      };

      this.onValidate = this.validate = this.onValidate.bind(this);
      this.onValidateModel = this.validateModel = this.onValidateModel.bind(
        this,
      );
    }

    getContextError(): Context<Model>['error'] {
      return super.getContextError() || this.state.error;
    }

    getContext(): Context<Model> {
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
              this.onValidate();
            }
          },
        );
      } else if (
        !isEqual(model, prevProps.model) &&
        shouldRevalidate(validate, this.state.validate)
      ) {
        this.onValidateModel(model);
      }
    }

    onChange(key: string, value: any) {
      if (shouldRevalidate(this.props.validate, this.state.validate)) {
        this.onValidate(key, value);
      }

      super.onChange(key, value);
    }

    __reset(state: State) {
      return {
        ...super.__reset(state),
        error: null,
        validate: false,
        validating: false,
      } as Partial<State>;
    }

    onSubmit(event?: SyntheticEvent) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.setState({ validate: true });

      const promise = this.onValidate().then(() => super.onSubmit());

      promise.catch(error => {
        this.setState((state, props) =>
          state.error === error
            ? null
            : { error: props.error === error ? null : error },
        );
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

    onValidateModel(originalModel: Props['model']) {
      this.setState({ validating: true });

      const model = this.getModel('validate', originalModel);
      const promise = this.state
        .validator(model)
        .catch(identity)
        .then(error => this.props.onValidate(model, error || null));

      promise.catch(identity).then(error => {
        this.setState((state, props) => ({
          error: props.error === error ? null : error || null,
          validating: false,
        }));
      });

      return promise;
    }
  }

  return ValidatedForm;
}

function shouldRevalidate(inProps: ValidateMode, inState: boolean) {
  return (
    inProps === 'onChange' || (inProps === 'onChangeAfterSubmit' && inState)
  );
}

export const ValidatedForm = Validated(BaseForm);
export type ValidatedForm = typeof ValidatedForm;
