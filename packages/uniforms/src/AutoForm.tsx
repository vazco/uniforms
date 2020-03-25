import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import set from 'lodash/set';

// FIXME: This import is needed to correctly build AutoForm.d.ts file.
import BaseForm from './BaseForm';
import ValidatedQuickForm, {
  ValidatedQuickFormProps,
  ValidatedQuickFormState,
} from './ValidatedQuickForm';
import { DeepPartial } from './types';

export type AutoFormProps<Model extends {}> = ValidatedQuickFormProps<Model> & {
  onChangeModel?: (model: DeepPartial<Model>) => void;
};

export type AutoFormState<Model extends {}> = ValidatedQuickFormState<Model> & {
  model: DeepPartial<Model>;
  modelSync: DeepPartial<Model>;
};

function Auto<Base extends typeof ValidatedQuickForm>(base: Base) {
  // @ts-ignore: Mixin class problem.
  return class AutoForm<
    Model extends {} = Record<string, any>,
    Props extends AutoFormProps<Model> = AutoFormProps<Model>,
    State extends AutoFormState<Model> = AutoFormState<Model>
  > extends base<Model, Props, State> {
    static Auto = Auto;
    static displayName = `Auto${base.displayName}`;

    constructor(props: Props) {
      super(props);

      this.state = {
        ...this.state,

        model: props.model,
        modelSync: props.model,
      };
    }

    componentDidUpdate(prevProps: Props) {
      const { model } = this.props;
      if (!isEqual(model, prevProps.model)) {
        this.setState({ model, modelSync: model });
      }

      // @ts-ignore
      super.componentDidUpdate(...arguments);
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
      };
    }

    onValidate() {
      return this.onValidateModel(this.getContextModel());
    }
  };
}

export default Auto(ValidatedQuickForm);
