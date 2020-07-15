import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import setWith from 'lodash/setWith';

// FIXME: This import is needed to correctly build AutoForm.d.ts file.
import { BaseForm } from './BaseForm';
import { DeepPartial, ModelTransformMode } from './types';
import {
  ValidatedQuickForm,
  ValidatedQuickFormProps,
  ValidatedQuickFormState,
} from './ValidatedQuickForm';

export type AutoFormProps<Model> = ValidatedQuickFormProps<Model> & {
  onChangeModel?(model: DeepPartial<Model>): void;
};

export type AutoFormState<Model> = ValidatedQuickFormState<Model> & {
  model: DeepPartial<Model>;
  modelSync: DeepPartial<Model>;
};

export function Auto<Base extends typeof ValidatedQuickForm>(Base: Base) {
  // @ts-ignore: Mixin class problem.
  class AutoForm<
    Model,
    Props extends AutoFormProps<Model> = AutoFormProps<Model>,
    State extends AutoFormState<Model> = AutoFormState<Model>
  > extends Base<Model, Props, State> {
    static Auto = Auto;
    static displayName = `Auto${Base.displayName}`;

    constructor(props: Props) {
      super(props);

      this.state = {
        ...this.state,
        model: props.model,
      };
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: never) {
      const { model } = this.props;
      if (!isEqual(model, prevProps.model)) {
        this.setState({ model });
      }

      super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    getNativeFormProps(): Record<string, any> {
      return omit(super.getNativeFormProps(), ['onChangeModel']);
    }

    getModel(mode: ModelTransformMode) {
      return this.state.model;
    }

    onChange(key: string, value: any) {
      super.onChange(key, value);
      this.setState(
        state => ({ model: setWith(clone(state.model), key, value, clone) }),
        () => {
          if (this.props.onChangeModel)
            this.props.onChangeModel(this.state.model);
        },
      );
    }

    __reset(state: State) {
      return {
        ...super.__reset(state),
        model: this.props.model,
      } as Partial<State>;
    }

    onValidate() {
      return this.onValidateModel(this.getContextModel());
    }
  }

  return AutoForm;
}

export const AutoForm = Auto(ValidatedQuickForm);
export type AutoForm = typeof AutoForm;
