import React, { Component, SyntheticEvent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import set from 'lodash/set';

import Bridge from './Bridge';
import changedKeys from './changedKeys';
import context from './context';
import createSchemaBridge from './createSchemaBridge';
import randomIds from './randomIds';
import { ChangedMap, Context, DeepPartial, ModelTransformMode } from './types';

export type BaseFormProps<Model extends {}> = {
  autosave: boolean;
  autosaveDelay: number;
  disabled?: boolean;
  error?: any;
  id?: string;
  label: boolean;
  model: DeepPartial<Model>;
  modelTransform?: (
    mode: ModelTransformMode,
    model: DeepPartial<Model>,
  ) => DeepPartial<Model>;
  noValidate: boolean;
  onChange?: (key: string, value: any) => void;
  onSubmit?: (model: DeepPartial<Model>) => any;
  onSubmitSuccess?: (result: any) => void;
  onSubmitFailure?: (result: any) => void;
  placeholder?: boolean;
  schema: any;
  showInlineError?: boolean;
};

export type BaseFormState<Model extends {}> = {
  bridge: Bridge;
  changed: boolean;
  changedMap: ChangedMap<Model>;
  resetCount: number;
  submitting: boolean;
};

export default class BaseForm<
  Model extends {} = Record<string, any>,
  Props extends BaseFormProps<Model> = BaseFormProps<Model>,
  State extends BaseFormState<Model> = BaseFormState<Model>
> extends Component<Props, State> {
  static displayName = 'Form';
  static defaultProps = {
    autosave: false,
    autosaveDelay: 0,
    label: true,
    model: Object.create(null),
    noValidate: true,
  };

  constructor(props: Props) {
    super(props);

    // @ts-ignore: State may be bigger, but it'll be covered by the subclasses.
    this.state = {
      bridge: createSchemaBridge(this.props.schema),
      changed: false,
      changedMap: Object.create(null),
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
    this.getModel = (mode, model = getModel(mode)) =>
      mode !== undefined && this.props.modelTransform
        ? this.props.modelTransform(mode, model)
        : model;
  }

  static getDerivedStateFromProps(
    { schema }: BaseFormProps<any>,
    { bridge }: BaseFormState<any>,
  ) {
    // TODO: It updates the state each time. Add bridge.isSame(schema)?
    return { bridge: createSchemaBridge(schema) };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    this.mounted = false;
  }

  delayId?: any;
  mounted: boolean;
  reset: () => void;
  change: (key: string, value: any) => void;
  submit: (event?: SyntheticEvent) => Promise<any>;
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

  getContextState(): Context['state'] {
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

  getModel(
    mode?: ModelTransformMode,
    model: DeepPartial<Model> = this.props.model,
  ) {
    return model;
  }

  getChangedKeys<T>(root: string, valueA?: T, valueB?: T) {
    return changedKeys(root, valueA, valueB);
  }

  getNativeFormProps(): Record<string, any> {
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

  onChange(key: string, value: any) {
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

  __reset(state: State) {
    return {
      changed: false,
      changedMap: Object.create(null),
      submitting: false,
      resetCount: state.resetCount + 1,
    };
  }

  onReset() {
    this.setState(this.__reset);
  }

  onSubmit(event?: SyntheticEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const result =
      this.props.onSubmit && this.props.onSubmit(this.getModel('submit'));

    // Set the `submitting` state only if onSubmit is async so we don't cause an unnecessary re-render
    let submitting: Promise<any>;
    if (isPromiseLike(result)) {
      this.setState({ submitting: true });
      submitting = result.finally(() => {
        this.setState({ submitting: false });
      });
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

function isPromiseLike(value: any): value is Promise<any> {
  return !!value && isFunction(value.then);
}
