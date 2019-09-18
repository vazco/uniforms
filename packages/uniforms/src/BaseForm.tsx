import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import set from 'lodash/set';

import randomIds from './randomIds';
import createSchemaBridge from './createSchemaBridge';
import changedKeys from './changedKeys';

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
  onSubmit: PropTypes.func.isRequired,
  randomId: PropTypes.func.isRequired
};

export const __childContextTypesBuild = (type: any): any =>
  isPlainObject(type)
    ? PropTypes.shape(mapValues(type, __childContextTypesBuild)).isRequired
    : type;

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

  delayId?: number | void;
  mounted: boolean;
  reset: () => void;
  change: (key: any, value: any) => void;
  submit: (event: any) => void;
  randomId: any;

  constructor() {
    // @ts-ignore
    super(...arguments);

    this.state = {
      // @ts-ignore
      bridge: createSchemaBridge(this.props.schema),
      changed: null,
      changedMap: {},
      resetCount: 0,
      submitting: false
    };

    this.mounted = false;
    // @ts-ignore
    this.randomId = randomIds(this.props.id);

    this.onReset = this.reset = this.onReset.bind(this);
    this.onChange = this.change = this.onChange.bind(this);
    this.onSubmit = this.submit = this.onSubmit.bind(this);

    // TODO: It shouldn't be here
    const getModel = this.getModel.bind(this);
    this.getModel = (mode = null, model = getModel(mode)) =>
      // @ts-ignore
      mode !== null && this.props.modelTransform
        // @ts-ignore
        ? this.props.modelTransform(mode, model)
        : model;
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
        onSubmit: this.getChildContextOnSubmit(),
        randomId: this.randomId
      }
    };
  }

  componentWillMount() {
    this.mounted = true;
    this.setState(
      () => ({}),
      () => this.setState(() => ({ changed: false, changedMap: {} }))
    );
  }

  componentWillReceiveProps({ schema }: any) {
    // @ts-ignore
    if (this.props.schema !== schema) {
      this.setState(() => ({ bridge: createSchemaBridge(schema) }));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getChildContextName() {
    return [];
  }

  getChildContextError() {
    // @ts-ignore
    return this.props.error;
  }

  getChildContextModel() {
    return this.getModel('form');
  }

  getChildContextState() {
    return {
      // @ts-ignore
      changed: !!this.state.changed,
      // @ts-ignore
      changedMap: this.state.changedMap,
      // @ts-ignore
      submitting: this.state.submitting,

      // @ts-ignore
      label: !!this.props.label,
      // @ts-ignore
      disabled: !!this.props.disabled,
      // @ts-ignore
      placeholder: !!this.props.placeholder,
      // @ts-ignore
      showInlineError: !!this.props.showInlineError
    };
  }

  getChildContextSchema() {
    // @ts-ignore
    return this.state.bridge;
  }

  getChildContextOnChange() {
    return this.onChange;
  }

  getChildContextOnSubmit() {
    return this.onSubmit;
  }

  getModel(mode?: any) {
    // @ts-ignore
    return this.props.model;
  }

  getChangedKeys(root: any, valueA: any, valueB: any) {
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
      // @ts-ignore
      key: `reset-${this.state.resetCount}`
    };
  }

  onChange(key: any, value: any) {
    // Do not set `changed` before componentDidMount
    // @ts-ignore
    if (this.state.changed !== null) {
      // @ts-ignore
      this.state.changed = true;
      this.getChangedKeys(key, value, get(this.getModel(), key)).forEach(key =>
        this.setState(state => ({
          // @ts-ignore
          changedMap: set(cloneDeep(state.changedMap), key, {})
        }))
      );
    }

    // @ts-ignore
    if (this.props.onChange) {
      // @ts-ignore
      this.props.onChange(key, value);
    }

    // Do not call `onSubmit` before componentDidMount
    // @ts-ignore
    if (this.state.changed !== null && this.props.autosave) {
      if (this.delayId) {
        this.delayId = clearTimeout(this.delayId);
      }

      // @ts-ignore
      if (this.props.autosaveDelay > 0) {
        // @ts-ignore
        this.delayId = setTimeout(this.onSubmit, this.props.autosaveDelay);
      } else {
        this.onSubmit();
      }
    }
  }

  __reset(state: any) {
    return {
      changed: false,
      changedMap: {},
      submitting: false,
      resetCount: state.resetCount + 1
    };
  }

  onReset() {
    this.setState(this.__reset);
  }

  onSubmit(event?: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const result =
      // @ts-ignore
      this.props.onSubmit && this.props.onSubmit(this.getModel('submit'));

    // Set the `submitting` state only if onSubmit is async so we don't cause an unnecessary re-render
    let submitting;
    if (result && isFunction(result.then)) {
      this.setState({ submitting: true });
      submitting = result.finally(() => this.setState({ submitting: false }));
    } else {
      submitting = Promise.resolve(result);
    }

    return submitting.then(
      // @ts-ignore
      this.props.onSubmitSuccess,
      // @ts-ignore
      this.props.onSubmitFailure
    );
  }

  render() {
    return <form {...this.getNativeFormProps()} />;
  }
}
