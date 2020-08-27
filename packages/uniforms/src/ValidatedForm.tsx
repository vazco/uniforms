import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import setWith from 'lodash/setWith';
import { SyntheticEvent } from 'react';

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
      onValidate(model: unknown, error: any) {
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
      return super.getContextError() ?? this.state.error;
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
        this.setState({ validator: schema.getValidator(validator) }, () => {
          if (shouldRevalidate(validate, this.state.validate)) {
            this.onValidate();
          }
        });
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
        if (error !== null) {
          return Promise.reject(error);
        }

        // Validation failed (i.e. returned an error), so no error is present
        // both in the props nor the state.
        return super.onSubmit().catch(error => {
          this.setState({ error });
          throw error;
        });
      });

      result.catch(noop);

      return result;
    }

    onValidate(key?: string, value?: any) {
      let model = this.getContextModel();
      if (model && key) {
        model = setWith(clone(model), key, cloneDeep(value), clone);
      }

      return this.onValidateModel(model);
    }

    onValidateModel(originalModel: Props['model']) {
      const model = this.getModel('validate', originalModel);

      // Using `then` allows using the same code for both synchronous and
      // asynchronous cases. We could use `await` here, but it would make all
      // calls asynchronous, unnecessary delaying synchronous validation.
      const then = makeThen(() => {
        this.setState({ validating: true });
      });

      return then(this.state.validator(model), (error = null) =>
        then(this.props.onValidate(model, error), (error = null) => {
          // Do not copy the error from props to the state.
          error = this.props.error === error ? null : error;

          // If the whole operation was synchronous and resulted in the same
          // error, we can skip the re-render.
          this.setState(state =>
            state.error === error && !state.validating
              ? null
              : { error, validating: false },
          );

          // A predefined error takes precedence over the validation one.
          return Promise.resolve(this.props.error ?? error);
        }),
      );
    }
  }

  return ValidatedForm;
}

function makeThen(callIfAsync: () => void) {
  function then<T, U>(value: Promise<T>, fn: (value: T) => U): Promise<U>;
  function then<T, U>(value: T, fn: (value: T) => U): U;
  function then<T, U>(value: Promise<T> | T, fn: (value: T) => U) {
    if (value instanceof Promise) {
      callIfAsync();
      return value.then(fn);
    }

    return fn(value);
  }

  return then;
}

function shouldRevalidate(inProps: ValidateMode, inState: boolean) {
  return (
    inProps === 'onChange' || (inProps === 'onChangeAfterSubmit' && inState)
  );
}

export const ValidatedForm = Validated(BaseForm);
export type ValidatedForm = typeof ValidatedForm;
