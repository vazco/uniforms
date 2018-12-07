import PropTypes from 'prop-types';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import set from 'lodash/set';
import {Component} from 'react';

import changedKeys from './changedKeys';
import createSchemaBridge from './createSchemaBridge';
import randomIds from './randomIds';

export const __childContextTypes = {
  name: PropTypes.arrayOf(PropTypes.string).isRequired,

  error: PropTypes.object,
  model: PropTypes.object.isRequired,

  schema: {
    getError: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    getErrorMessages: PropTypes.func.isRequired,
    getField: PropTypes.func.isRequired,
    getInitialValue: PropTypes.func.isRequired,
    getProps: PropTypes.func.isRequired,
    getSubfields: PropTypes.func.isRequired,
    getType: PropTypes.func.isRequired,
    getValidator: PropTypes.func.isRequired
  },

  state: {
    changed: PropTypes.bool.isRequired,
    changedMap: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,

    label: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.bool.isRequired,
    showInlineError: PropTypes.bool.isRequired
  },

  onChange: PropTypes.func.isRequired,
  randomId: PropTypes.func.isRequired
};

export const __childContextTypesBuild = type =>
  isPlainObject(type) ? PropTypes.shape(mapValues(type, __childContextTypesBuild)).isRequired : type;

export default class BaseForm extends Component {
  static displayName = 'Form';

  static defaultProps = {
    model: {},
    label: true,

    autosave: false,
    autosaveDelay: 0,

    noValidate: true
  };

  static propTypes = {
    error: PropTypes.object,
    model: PropTypes.object,
    schema: PropTypes.any.isRequired,

    modelTransform: PropTypes.func,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitFailure: PropTypes.func,
    onSubmitSuccess: PropTypes.func,

    label: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.bool,
    showInlineError: PropTypes.bool,

    autosave: PropTypes.bool,
    autosaveDelay: PropTypes.number
  };

  static childContextTypes = {
    uniforms: __childContextTypesBuild(__childContextTypes)
  };

  constructor() {
    super(...arguments);

    this.state = {
      bridge: createSchemaBridge(this.props.schema),
      changed: null,
      changedMap: {},
      resetCount: 0,
      submitting: false
    };

    this.delayId = false;
    this.mounted = false;
    this.randomId = randomIds(this.props.id);

    this.onReset = this.reset = this.onReset.bind(this);
    this.onChange = this.change = this.onChange.bind(this);
    this.onSubmit = this.submit = this.onSubmit.bind(this);

    // TODO: It shouldn't be here
    const getModel = this.getModel.bind(this);
    this.getModel = (mode = null, model = getModel(mode)) =>
      mode !== null && this.props.modelTransform ? this.props.modelTransform(mode, model) : model;
  }

  getChildContext() {
    return {
      uniforms: {
        name: this.getChildContextName(),
        error: this.getChildContextError(),
        model: this.getChildContextModel(),
        state: this.getChildContextState(),
        schema: this.getChildContextSchema(),
        onChange: this.getChildContextOnChange(),
        randomId: this.randomId
      }
    };
  }

  getChildContextName() {
    return [];
  }

  getChildContextError() {
    return this.props.error;
  }

  getChildContextModel() {
    return this.getModel('form');
  }

  getChildContextState() {
    return {
      changed: !!this.state.changed,
      changedMap: this.state.changedMap,
      submitting: this.state.submitting,

      label: !!this.props.label,
      disabled: !!this.props.disabled,
      placeholder: !!this.props.placeholder,
      showInlineError: !!this.props.showInlineError
    };
  }

  getChildContextSchema() {
    return this.state.bridge;
  }

  getChildContextOnChange() {
    return this.onChange;
  }

  getModel(/* mode */) {
    return this.props.model;
  }

  componentWillMount() {
    this.mounted = true;
    this.setState(() => ({}), () => this.setState(() => ({changed: false, changedMap: {}})));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps({schema}) {
    if (this.props.schema !== schema) {
      this.setState(() => ({bridge: createSchemaBridge(schema)}));
    }
  }

  render() {
    return <form {...this.getNativeFormProps()} />;
  }

  getChangedKeys(root, valueA, valueB) {
    return changedKeys(root, valueA, valueB);
  }

  getNativeFormProps() {
    const props = omit(this.props, [
      'autosave',
      'autosaveDelay',
      'disabled',
      'error',
      'label',
      'model',
      'modelTransform',
      'onChange',
      'onSubmit',
      'onSubmitFailure',
      'onSubmitSuccess',
      'placeholder',
      'schema',
      'showInlineError'
    ]);

    return {
      ...props,
      onSubmit: this.onSubmit,
      key: `reset-${this.state.resetCount}`
    };
  }

  onChange(key, value) {
    // Do not set `changed` before componentDidMount
    if (this.state.changed !== null) {
      this.state.changed = true;
      this.getChangedKeys(key, value, get(this.getModel(), key)).forEach(key =>
        this.setState(state => ({changedMap: set(cloneDeep(state.changedMap), key, {})}))
      );
    }

    if (this.props.onChange) {
      this.props.onChange(key, value);
    }

    // Do not call `onSubmit` before componentDidMount
    if (this.state.changed !== null && this.props.autosave) {
      if (this.delayId) {
        this.delayId = clearTimeout(this.delayId);
      }

      if (this.props.autosaveDelay > 0) {
        this.delayId = setTimeout(this.onSubmit, this.props.autosaveDelay);
      } else {
        this.onSubmit();
      }
    }
  }

  __reset(state) {
    return {changed: false, changedMap: {}, submitting: false, resetCount: state.resetCount + 1};
  }

  onReset() {
    this.setState(this.__reset);
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const result = this.props.onSubmit && this.props.onSubmit(this.getModel('submit'));

    // Set the `submitting` state only if onSubmit is async so we don't cause an unnecessary re-render
    let submitting;
    if (result && isFunction(result.then)) {
      this.setState({submitting: true});
      submitting = result.finally(() => this.setState({submitting: false}));
    } else {
      submitting = Promise.resolve(result);
    }

    return submitting.then(this.props.onSubmitSuccess, this.props.onSubmitFailure);
  }
}
