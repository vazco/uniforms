import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import set from 'lodash/set';

import ValidatedQuickForm from './ValidatedQuickForm';

const Auto = parent =>
  class extends parent {
    static Auto = Auto;

    static displayName = `Auto${parent.displayName}`;

    static propTypes = {
      ...parent.propTypes,

      onChangeModel: PropTypes.func
    };

    constructor() {
      super(...arguments);

      this.state = {
        ...this.state,

        model: this.props.model,
        modelSync: this.props.model
      };
    }

    componentWillReceiveProps({model}) {
      super.componentWillReceiveProps(...arguments);

      if (!isEqual(this.props.model, model)) {
        this.setState(() => ({model, modelSync: model}));
      }
    }

    getNativeFormProps() {
      return omit(super.getNativeFormProps(), ['onChangeModel']);
    }

    getModel(mode) {
      return mode === 'form' ? this.state.modelSync : this.state.model;
    }

    onChange(key, value) {
      const updateState = state => ({modelSync: set(cloneDeep(state.modelSync), key, value)});
      const updateModel = state => {
        if (this.props.onChangeModel) {
          this.props.onChangeModel(state.modelSync);
        }

        return {model: state.modelSync};
      };

      // Before componentDidMount, every call to onChange should call BaseForm#onChange synchronously
      if (this.state.changed === null) {
        this.setState(updateState);
        super.onChange(...arguments);
        this.setState(updateModel);
      } else {
        this.setState(updateState, () => {
          super.onChange(...arguments);
          this.setState(updateModel);
        });
      }
    }

    __reset(state) {
      return {...super.__reset(state), model: this.props.model, modelSync: this.props.model};
    }

    onValidate() {
      return this.onValidateModel(this.getChildContextModel());
    }
  };

export default Auto(ValidatedQuickForm);
