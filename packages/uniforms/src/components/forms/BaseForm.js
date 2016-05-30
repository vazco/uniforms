import React       from 'react';
import get         from 'lodash.get';
import isEqual     from 'lodash.isequal';
import set         from 'lodash.set';
import xorWith     from 'lodash.xorwith';
import {Component} from 'react';
import {PropTypes} from 'react';

import joinName           from '../../helpers/joinName';
import createSchemaBridge from '../../bridges';

export default class BaseForm extends Component {
    static displayName = 'Form';

    static defaultProps = {
        model: {},
        label: true
    };

    static propTypes = {
        error:  PropTypes.any,
        model:  PropTypes.any,
        schema: PropTypes.any.isRequired,

        onChange: PropTypes.func,
        onSubmit: PropTypes.func,

        label:       PropTypes.bool,
        autosave:    PropTypes.bool,
        disabled:    PropTypes.bool,
        placeholder: PropTypes.bool
    };

    static childContextTypes = {
        uniforms: PropTypes.shape({
            name: PropTypes.arrayOf(PropTypes.string).isRequired,

            error:  PropTypes.object,
            model:  PropTypes.object.isRequired,

            schema: PropTypes.shape({
                getError:         PropTypes.func.isRequired,
                getErrorMessage:  PropTypes.func.isRequired,
                getErrorMessages: PropTypes.func.isRequired,
                getField:         PropTypes.func.isRequired,
                getInitialValue:  PropTypes.func.isRequired,
                getProps:         PropTypes.func.isRequired,
                getSubfields:     PropTypes.func.isRequired,
                getType:          PropTypes.func.isRequired,
                getValidator:     PropTypes.func.isRequired
            }).isRequired,

            state: PropTypes.shape({
                changed:    PropTypes.bool.isRequired,
                changedMap: PropTypes.object.isRequired,

                label:       PropTypes.bool.isRequired,
                disabled:    PropTypes.bool.isRequired,
                placeholder: PropTypes.bool.isRequired
            }).isRequired,

            onChange: PropTypes.func.isRequired
        }).isRequired
    };

    constructor () {
        super(...arguments);

        // These can't be in state, because state is asynchronous
        this.bridge     = createSchemaBridge(this.props.schema);
        this.changed    = null;
        this.changedMap = {};

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.getNativeFormProps = this.getNativeFormProps.bind(this);

        this.getChildContextName   = this.getChildContextName.bind(this);
        this.getChildContextError  = this.getChildContextError.bind(this);
        this.getChildContextModel  = this.getChildContextModel.bind(this);
        this.getChildContextState  = this.getChildContextState.bind(this);
        this.getChildContextSchema = this.getChildContextSchema.bind(this);
    }

    getChildContext () {
        return {
            uniforms: {
                name:     this.getChildContextName(),
                error:    this.getChildContextError(),
                model:    this.getChildContextModel(),
                state:    this.getChildContextState(),
                schema:   this.getChildContextSchema(),
                onChange: this.onChange
            }
        };
    }

    getChildContextName () {
        return [];
    }

    getChildContextError () {
        return this.props.error;
    }

    getChildContextModel () {
        return this.props.model;
    }

    getChildContextState () {
        return {
            changed:  !!this.changed,
            changedMap: this.changedMap,

            label:       !!this.props.label,
            disabled:    !!this.props.disabled,
            placeholder: !!this.props.placeholder
        };
    }

    getChildContextSchema () {
        return this.bridge;
    }

    componentDidMount () {
        this.changed = false;
    }

    componentWillReceiveProps ({schema}) {
        if (this.props.schema !== schema) {
            this.bridge = createSchemaBridge(schema);
        }
    }

    render () {
        return (
            <form {...this.getNativeFormProps()} />
        );
    }

    getChangedKeys (root, valueA, valueB) {
        if (Array.isArray(valueA)) {
            if (valueB) {
                const pairsA = valueA.map((value, index) => [value, index]);
                const pairsB = valueB.map((value, index) => [value, index]);

                return xorWith(pairsA, pairsB, isEqual)
                    .map(pair => pair[1])
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map(index => joinName(root, index));
            }

            return Object.keys(valueA).map(index => joinName(root, index));
        }

        return [root];
    }

    getNativeFormProps () {
        return {
            ...this.props,

            onChange () {},
            onSubmit: this.onSubmit
        };
    }

    onChange (key, value) {
        // Do not set `changed` before componentDidMount
        if (this.changed !== null) {
            this.changed = true;
            this.forceUpdate();
            this.getChangedKeys(key, value, get(this.getChildContextModel(), key)).forEach(key => {
                set(this.changedMap, key, true);
            });
        }

        if (this.props.onChange) {
            this.props.onChange(key, value);
        }

        // Do not call `onSubmit` before componentDidMount
        if (this.changed !== null && this.props.autosave) {
            this.onSubmit();
        }
    }

    onSubmit (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (this.props.onSubmit) {
            this.props.onSubmit(this.getChildContextModel());
        }
    }
}
