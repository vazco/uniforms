import cloneDeep from 'lodash.clonedeep';
import isEqual   from 'lodash.isequal';
import set       from 'lodash.set';

import ValidatedQuickForm from './ValidatedQuickForm';

const Auto = parent => class extends parent {
    static Auto = Auto;

    static displayName = `Auto${parent.displayName}`;

    constructor () {
        super(...arguments);

        this.state = {
            ...this.state,

            model:     this.props.model,
            modelSync: this.props.model
        };
    }

    componentWillReceiveProps ({model}) {
        super.componentWillReceiveProps(...arguments);

        if (!isEqual(this.props.model, model)) {
            this.setState({model, modelSync: model});
        }
    }

    getChildContextModel () {
        return this.state.modelSync;
    }

    getModel () {
        return this.state.model;
    }

    validate () {
        this.validateModel(this.getModel());
    }

    onChange (key, value) {
        this.setState(state => ({model: set(cloneDeep(state.model), key, value)}), () => {
            super.onChange(...arguments);
            this.setState({modelSync: this.state.model});
        });
    }
};

export default Auto(ValidatedQuickForm);
