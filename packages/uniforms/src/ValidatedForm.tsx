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
  onValidate(model: DeepPartial<Model>, error: any): any;
  validate: ValidateMode;
  validator?: any;
};

export type ValidatedFormState<Model> = BaseFormState<Model> & {
  error: any;
  validate: boolean;
  validating: boolean;
  validator(model: DeepPartial<Model>): any;
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
      error: null,
      onValidate(model, error) {
        return error;
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

      const result = this.onValidate().then(error => {
        if (error) {
          return Promise.reject(error);
        }

        return super.onSubmit().catch(error => {
          this.setState((state, props) =>
            state.error === error
              ? null
              : { error: props.error === error ? null : error || null },
          );

          throw error;
        });
      });

      result.catch(noop);

      return result;
    }

    onValidate(key?: string, value?: any) {
      let model = this.getContextModel();
      if (model && key) {
        model = set(cloneDeep(model), key, cloneDeep(value));
      }

      return this.onValidateModel(model);
    }

    onValidateModel(originalModel: Props['model']) {
      const model = this.getModel('validate', originalModel);

      let result = this.state.validator(model) || null;
      if (!(result instanceof Promise)) {
        result = this.props.onValidate(model, result) || null;
        if (!(result instanceof Promise)) {
          this.setState((state, props) =>
            state.error === result
              ? null
              : { error: props.error === result ? null : result },
          );

          return Promise.resolve(result);
        }
      } else {
        result = result.then(error =>
          this.props.onValidate(model, error || null),
        );
      }

      this.setState({ validating: true });
      return result.then(error => {
        this.setState((state, props) => ({
          error: props.error === error ? null : error,
          validating: false,
        }));

        return error;
      });
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
