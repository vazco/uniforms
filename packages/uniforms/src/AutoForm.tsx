import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import setWith from 'lodash/setWith';

// FIXME: This import is needed to correctly build AutoForm.d.ts file.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseForm } from './BaseForm';
import {
  ValidatedQuickForm,
  ValidatedQuickFormProps,
  ValidatedQuickFormState,
} from './ValidatedQuickForm';
import { DeepPartial, ModelTransformMode } from './types';

export type AutoFormProps<Model> = ValidatedQuickFormProps<Model> & {
  onChangeModel?: (model: DeepPartial<Model>) => void;
};

export type AutoFormState<Model> = ValidatedQuickFormState<Model> & {
  model: DeepPartial<Model>;
};

export function Auto<Base extends typeof ValidatedQuickForm>(Base: Base) {
  // @ts-expect-error: Mixin class problem.
  class AutoForm<
    Model,
    Props extends AutoFormProps<Model> = AutoFormProps<Model>,
    State extends AutoFormState<Model> = AutoFormState<Model>,
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

    getNativeFormProps() {
      const props = super.getNativeFormProps();
      return omit(props, ['onChangeModel']) as typeof props;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModel(mode: ModelTransformMode) {
      return this.state.model;
    }

    onChange(key: string, value: any) {
      super.onChange(key, value);
      this.setState(
        state => ({ model: setWith(clone(state.model), key, value, clone) }),
        () => {
          if (this.props.onChangeModel) {
            this.props.onChangeModel(this.state.model);
          }
        },
      );
    }

    __reset(state: State) {
      return {
        ...super.__reset(state),
        model: this.props.model,
      } as Partial<State>;
    }
  }

  return AutoForm;
}

export const AutoForm = Auto(ValidatedQuickForm);
export type AutoForm = typeof AutoForm;
