import * as PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import set from 'lodash/set';

import ValidatedQuickForm from './ValidatedQuickForm';

const Auto = (parent: any): any =>
  class extends parent {
    static Auto = Auto;

    static displayName = `Auto${parent.displayName}`;

    static propTypes: any = {
      ...parent.propTypes,

      onChangeModel: PropTypes.func,
    };

    constructor(...args: any[]) {
      super(...args);

      // @ts-ignore
      this.state = {
        ...this.state,

        model: this.props.model,
        modelSync: this.props.model,
      };
    }

    componentWillReceiveProps({ model }: { model: any }) {
      // @ts-ignore
      super.componentWillReceiveProps(...arguments);

      if (!isEqual(this.props.model, model)) {
        this.setState(() => ({ model, modelSync: model }));
      }
    }

    getNativeFormProps(): Record<string, unknown> {
      return omit(super.getNativeFormProps(), ['onChangeModel']);
    }

    getModel(mode: any) {
      return mode === 'form' ? this.state.modelSync : this.state.model;
    }

    onChange(key: any, value: any) {
      const updateState = (state: any) => ({
        modelSync: set(cloneDeep(state.modelSync), key, value),
      });
      const updateModel = (state: any) => {
        if (this.props.onChangeModel) {
          this.props.onChangeModel(state.modelSync);
        }

        return { model: state.modelSync };
      };

      // Before componentDidMount, every call to onChange should call BaseForm#onChange synchronously
      if (this.state.changed === null) {
        this.setState(updateState);
        super.onChange(key, value);
        this.setState(updateModel);
      } else {
        this.setState(updateState, () => {
          super.onChange(key, value);
          this.setState(updateModel);
        });
      }
    }

    __reset(state: any) {
      return {
        ...super.__reset(state),
        model: this.props.model,
        modelSync: this.props.model,
      };
    }

    onValidate() {
      // @ts-ignore
      return this.onValidateModel(this.getChildContextModel());
    }
  };

export default Auto(ValidatedQuickForm);
