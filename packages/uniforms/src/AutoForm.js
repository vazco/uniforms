import cloneDeep   from 'lodash.clonedeep';
import isEqual     from 'lodash.isequal';
import set         from 'lodash.set';
import {PropTypes} from 'react';

import ValidatedQuickForm from './ValidatedQuickForm';

const Auto = parent => class extends parent {
    static Auto = Auto;

    static displayName = `Auto${parent.displayName}`;

    static propTypes = {
        ...parent.propTypes,

        onChangeModel: PropTypes.func
    };

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

    getNativeFormProps () {
        const {
            onChangeModel, // eslint-disable-line no-unused-vars

            ...props
        } = super.getNativeFormProps();

        return props;
    }

    getModel (mode) {
        return mode === 'form' ? this.state.modelSync : this.state.model;
    }

    onChange (key, value) {
        this.setState(state => ({modelSync: set(cloneDeep(state.modelSync), key, value)}), () => {
            super.onChange(...arguments);
            this.setState({model: this.state.modelSync}, () => {
                if (this.props.onChangeModel) {
                    this.props.onChangeModel(this.state.model);
                }
            });
        });
    }

    onReset () {
        this.setState(() => {
            super.onReset();

            return {
                model:     this.props.model,
                modelSync: this.props.model
            };
        });
    }

    onValidate () {
        return this.onValidateModel(this.getChildContextModel());
    }
};

export default Auto(ValidatedQuickForm);
