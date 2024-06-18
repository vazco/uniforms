import ConfigProvider from 'antd/lib/config-provider';
import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { Component } from 'react';
// @ts-expect-error
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { ValidatedForm, connectField, context, useForm } from 'uniforms';
import type { Option } from 'uniforms-unstyled/src/types';

import playgroundStyles from '../index.module.css';
import presets from '../lib/presets';
import { bridge, schema } from '../lib/schema';
import styles from '../lib/styles';
import { themes } from '../lib/universal';
import { compress, parseQuery, updateQuery } from '../lib/utils';

export class Playground extends Component<any, any> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  constructor() {
    // @ts-expect-error: Types.
    super(...arguments);

    const state = schema.clean(parseQuery());

    try {
      schema.validate(state);
      // FIXME: Types.
    } catch (error: any) {
      (error.details as any[]).forEach(({ name }) => {
        state[name] = schema.getDefinition(name).defaultValue;
      });
    }

    this.state = state;

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    updateQuery(this.state);
  }

  componentDidUpdate() {
    updateQuery(this.state);
  }

  onChange(key: string, value: unknown) {
    if (key === 'preset') {
      // FIXME: Types.
      this.setState((state: any) => ({
        props: {
          ...state.props,
          schema: presets[value as keyof typeof presets],
        },
      }));
    }

    this.setState({ error: undefined, [key]: value });
  }

  render() {
    return (
      // @ts-expect-error: Types.
      <PlaygroundForm
        className={playgroundStyles['playground']}
        model={this.state}
        // It's bound in constructor.
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onChange={this.onChange}
        schema={bridge}
      >
        <section className={playgroundStyles['playground-column']}>
          <nav className={playgroundStyles['playground-toolbar']}>
            <PlaygroundSelectField name="preset" />
            <PlaygroundSelectField name="theme" />
          </nav>

          <PlaygroundPropsField name="props" spellCheck={false} />
        </section>

        {this.state.error ? (
          <pre children={'' + this.state.error} />
        ) : (
          <PlaygroundPreviewField name="props" nameTheme="theme" />
        )}
      </PlaygroundForm>
    );
  }
}

// FIXME: ValidatedForm is not derivable.
class PlaygroundForm extends (ValidatedForm as any) {
  getContextState() {
    return {
      ...super.getContextState(),
      theme: this.props.model.theme,
    };
  }

  render() {
    return (
      <context.Provider value={this.getContext()}>
        <section {...omit(this.getNativeFormProps(), ['onSubmit'])} />
      </context.Provider>
    );
  }
}

const PlaygroundModelDebug = () => {
  const { model } = useForm();
  return (
    <>
      <br />
      <br />
      <pre>
        <code>{`const model = ${JSON.stringify(model, null, 2)};`}</code>
      </pre>
    </>
  );
};

class PlaygroundPreview extends Component<any, any> {
  constructor() {
    // @ts-expect-error: Types.
    super(...arguments);

    this._schema = eval(`(${this.props.value.schema})`);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props: any) {
    if (this.props.value.schema !== props.value.schema) {
      this._schema = eval(`(${props.value.schema})`);
    }
  }

  // TODO: Types.
  _schema: any;

  render() {
    const { AutoFields, AutoForm, ErrorsField, SubmitField } =
      themes[(this.props.theme as keyof typeof themes) || 'unstyled'];

    const { asyncOnSubmit, asyncOnValidate, schema, ...props } =
      this.props.value;

    props.schema = this._schema;
    if (asyncOnSubmit) {
      props.onSubmit = () =>
        new Promise(resolve => {
          setTimeout(resolve, 1000);
        });
    }
    if (asyncOnValidate) {
      props.onValidate = (model: object, error: Error) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(error);
          }, 1000);
        });
    }

    return (
      <PlaygroundWrap theme={this.props.theme}>
        {this.props.errorMessage ? (
          <span children={this.props.errorMessage} />
        ) : (
          <AutoForm key={compress(schema)} {...props}>
            <AutoFields />
            <ErrorsField />
            <SubmitField />
            <PlaygroundModelDebug />
          </AutoForm>
        )}
      </PlaygroundWrap>
    );
  }
}

const PlaygroundPreviewField = connectField(PlaygroundPreview);

class PlaygroundProps extends Component<any, any> {
  render() {
    const { onChange, schema, theme, value } = this.props;

    const isAntd = theme === 'antd';
    const isBootstrap = theme === 'bootstrap4';
    const isSemantic = theme === 'semantic';

    // FIXME: theme is undefined during `docusaurus build`.
    const { AutoForm, BoolField, ErrorsField, LongTextField, NumField } =
      themes[(theme as keyof typeof themes) || 'unstyled'];

    return (
      <PlaygroundWrap theme={theme}>
        <AutoForm
          autosave
          autosaveDelay={1000}
          model={value}
          onSubmit={onChange}
          schema={schema}
        >
          <BoolField name="autosave" />
          <NumField name="autosaveDelay" disabled={!value.autosave} />
          <BoolField name="disabled" />
          <BoolField name="readOnly" />
          <BoolField name="label" />
          <BoolField name="placeholder" />
          <BoolField
            name="showInlineError"
            disabled={!(isAntd || isBootstrap || isSemantic)}
          />
          <BoolField name="asyncOnSubmit" />
          <BoolField name="asyncOnValidate" />
          <LongTextField name="schema" />
          <ErrorsField />
        </AutoForm>
      </PlaygroundWrap>
    );
  }
}

const PlaygroundPropsField = connectField(PlaygroundProps);

class PlaygroundSelect extends Component<any, any> {
  render() {
    // FIXME: allowedValues is undefined during `docusaurus build`.
    const { options, onChange, value } = this.props;

    return (
      <select onChange={event => onChange(event.target.value)} value={value}>
        {options.map((option: Option<string>) => (
          <option key={option.key ?? option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
    );
  }
}

const PlaygroundSelectField = connectField(PlaygroundSelect);

export class PlaygroundWrap extends Component<any, any> {
  render() {
    const { children, frameProps, theme } = this.props;
    const content = (
      <React.Fragment>
        {children}
        {styles[theme as keyof typeof styles]}
      </React.Fragment>
    );

    if (theme === 'mui') {
      // Material-UI injects scoped CSS classes into head.
      return (
        <section
          children={content}
          className={classNames(
            'frame-root',
            playgroundStyles['playground-wrap'],
          )}
        />
      );
    }

    let frameContent = content;
    if (theme === 'antd') {
      // Make AntD popups contained within the iframe.
      frameContent = (
        <FrameContextConsumer>
          {(context: any) => (
            <ConfigProvider getPopupContainer={() => context.document.body}>
              {content}
            </ConfigProvider>
          )}
        </FrameContextConsumer>
      );
    }

    return (
      <Frame
        children={frameContent}
        className={playgroundStyles['playground-wrap']}
        {...frameProps}
      />
    );
  }
}
