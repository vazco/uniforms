import React, { Component, SyntheticEvent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import set from 'lodash/set';

import changedKeys from './changedKeys';
import context from './context';
import createSchemaBridge from './createSchemaBridge';
import randomIds from './randomIds';
import { Context } from './types';

export default class BaseForm extends Component<any, any> {
  static displayName = 'Form';

  static defaultProps = {
    autosave: false,
    autosaveDelay: 0,
    label: true,
    model: {},
    noValidate: true,
  };

  constructor() {
    // @ts-ignore
    super(...arguments);

    this.state = {
      bridge: createSchemaBridge(this.props.schema),
      changed: false,
      changedMap: {},
      resetCount: 0,
      submitting: false,
    };

    this.mounted = false;
    this.randomId = randomIds(this.props.id);

    this.onReset = this.reset = this.onReset.bind(this);
    this.onChange = this.change = this.onChange.bind(this);
    this.onSubmit = this.submit = this.onSubmit.bind(this);

    // TODO: It shouldn't be here
    const getModel = this.getModel.bind(this);
    this.getModel = (mode = null, model = getModel(mode)) =>
      mode !== null && this.props.modelTransform
        ? this.props.modelTransform(mode, model)
        : model;
  }

  static getDerivedStateFromProps({ schema }, { bridge }) {
    // TODO: It updates the state each time. Add bridge.isSame(schema)?
    return { bridge: createSchemaBridge(schema) };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.mounted = false;
  }

  delayId?: any;
  mounted: boolean;
  reset: () => void;
  change: (key: string, value: unknown) => void;
  submit: (event?: SyntheticEvent) => Promise<unknown>;
  randomId: () => string;

  getContext(): Context {
    return {
      changed: this.state.changed,
      changedMap: this.state.changedMap,
      error: this.getContextError(),
      model: this.getContextModel(),
      name: this.getContextName(),
      onChange: this.getContextOnChange(),
      onSubmit: this.getContextOnSubmit(),
      randomId: this.randomId,
      schema: this.getContextSchema(),
      state: this.getContextState(),
      submitting: this.state.submitting,
      validating: false,
    };
  }

  getContextName() {
    return [];
  }

  getContextError() {
    return this.props.error;
  }

  getContextModel() {
    return this.getModel('form');
  }

  getContextState() {
    return {
      disabled: !!this.props.disabled,
      label: !!this.props.label,
      placeholder: !!this.props.placeholder,
      showInlineError: !!this.props.showInlineError,
    };
  }

  getContextSchema() {
    return this.state.bridge;
  }

  getContextOnChange() {
    return this.onChange;
  }

  getContextOnSubmit() {
    return this.onSubmit;
  }

  getModel(mode?: any) { // eslint-disable-line
    return this.props.model;
  }

  getChangedKeys(root: any, valueA: any, valueB: any) {
    return changedKeys(root, valueA, valueB);
  }

  getNativeFormProps(): Record<string, unknown> {
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
      'showInlineError',
    ]);

    return {
      ...props,
      onSubmit: this.onSubmit,
      key: `reset-${this.state.resetCount}`,
    };
  }

  onChange(key: string, value: unknown) {
    // Do not set `changed` before componentDidMount
    if (this.mounted) {
      const keys = this.getChangedKeys(key, value, get(this.getModel(), key));
      if (keys.length !== 0) {
        this.setState(state => ({
          changed: true,
          changedMap: keys.reduce(
            (changedMap, key) => set(changedMap, key, {}),
            cloneDeep(state.changedMap),
          ),
        }));
      }
    }

    if (this.props.onChange) {
      this.props.onChange(key, value);
    }

    // Do not call `onSubmit` before componentDidMount
    if (this.mounted && this.props.autosave) {
      if (this.delayId) {
        this.delayId = clearTimeout(this.delayId);
      }

      if (this.props.autosaveDelay > 0) {
        this.delayId = setTimeout(() => {
          this.onSubmit();
        }, this.props.autosaveDelay);
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
      resetCount: state.resetCount + 1,
    };
  }

  onReset() {
    this.setState(this.__reset);
  }

  onSubmit(event?: SyntheticEvent): Promise<unknown> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const result =
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
      this.props.onSubmitSuccess,
      this.props.onSubmitFailure,
    );
  }

  render() {
    return (
      <context.Provider value={this.getContext()}>
        <form {...this.getNativeFormProps()} />
      </context.Provider>
    );
  }
}
