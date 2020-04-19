import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import set from 'lodash/set';

// FIXME: This import is needed to correctly build AutoForm.d.ts file.
import { BaseForm } from './BaseForm';
import { DeepPartial } from './types';
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
        modelSync: props.model,
      };
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: never) {
      const { model } = this.props;
      if (!isEqual(model, prevProps.model)) {
        this.setState({ model, modelSync: model });
      }

      super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    getNativeFormProps(): Record<string, any> {
      return omit(super.getNativeFormProps(), ['onChangeModel']);
    }

    getModel(mode: any) {
      return mode === 'form' ? this.state.modelSync : this.state.model;
    }

    onChange(key: any, value: any) {
      this.setState(
        state => ({ modelSync: set(cloneDeep(state.modelSync), key, value) }),
        () => {
          super.onChange(key, value);
          this.setState(state => {
            if (this.props.onChangeModel)
              this.props.onChangeModel(state.modelSync);
            return { model: state.modelSync };
          });
        },
      );
    }

    __reset(state: State) {
      return {
        ...super.__reset(state),
        model: this.props.model,
        modelSync: this.props.model,
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
