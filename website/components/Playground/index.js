import ConfigProvider from 'antd/lib/config-provider';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import React, { Component } from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { BaseField, ValidatedForm, connectField } from 'uniforms';

import playgroundStyles from './playground.module.css';
import presets from './presets';
import schema from './schema';
import styles from './styles';
import { parseQuery, updateQuery } from './utils';
import { themes } from '../universal';

class Playground extends Component {
  constructor() {
    super(...arguments);

    const state = schema.clean(parseQuery());

    try {
      schema.validate(state);
    } catch (error) {
      error.details.forEach(({ name }) => {
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

  onChange(key, value) {
    if (key === 'preset') {
      this.setState(state => ({
        props: { ...state.props, schema: presets[value] }
      }));
    }

    this.setState({ [key]: value });
  }

  render() {
    return (
      <PlaygroundForm
        className={playgroundStyles['playground']}
        model={this.state}
        onChange={this.onChange}
        schema={schema}
      >
        <section className={playgroundStyles['playground-column']}>
          <nav className={playgroundStyles['playground-toolbar']}>
            <PlaygroundSelectField name="preset" />
            <PlaygroundSelectField name="theme" />
          </nav>

          <PlaygroundPropsField name="props" spellCheck={false} />
        </section>

        <PlaygroundPreviewField name="props" nameTheme="theme" />
      </PlaygroundForm>
    );
  }
}

class PlaygroundField extends BaseField {
  shouldComponentUpdate(props, state, context) {
    return (
      this.context.uniforms.state.theme !== context.uniforms.state.theme ||
      super.shouldComponentUpdate(props, state, context)
    );
  }
}

class PlaygroundForm extends ValidatedForm {
  getChildContextState() {
    return {
      ...super.getChildContextState(),
      theme: this.props.model.theme
    };
  }

  render() {
    const props = omit(this.getNativeFormProps(), ['onSubmit']);
    return <section {...props} />;
  }
}

class PlaygroundPreview extends Component {
  constructor() {
    super(...arguments);

    this.state = { model: undefined };

    this.onModel = this.onModel.bind(this);
    this._schema = eval(`(${this.props.value.schema})`);
  }

  componentWillReceiveProps(props) {
    if (this.props.value.schema !== props.value.schema) {
      this.onModel({});
      this._schema = eval(`(${props.value.schema})`);
    }
  }

  onModel(model) {
    this.setState({ model: JSON.stringify(model, null, 4) });
  }

  render() {
    const Form = themes[this.props.theme || 'unstyled'].AutoForm;
    const {
      asyncOnSubmit,
      asyncOnValidate,
      schema,
      ...props
    } = this.props.value;

    props.schema = this._schema;
    if (asyncOnSubmit)
      props.onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000));
    if (asyncOnValidate)
      props.onValidate = (model, error, next) => setTimeout(() => next(), 1000);

    return (
      <PlaygroundWrap theme={this.props.theme}>
        {this.props.errorMessage ? (
          <span children={this.props.errorMessage} />
        ) : (
          <Form key={schema} onChangeModel={this.onModel} {...props} />
        )}

        {this.state.model !== undefined && <br />}
        {this.state.model !== undefined && <pre children={this.state.model} />}
      </PlaygroundWrap>
    );
  }
}

const PlaygroundPreviewField = connectField(PlaygroundPreview, {
  baseField: PlaygroundField
});

class PlaygroundProps extends Component {
  render() {
    const { onChange, schema, theme, value } = this.props;

    const isAntd = theme === 'antd';
    const isBootstrap = theme === 'bootstrap3' || theme === 'bootstrap4';
    const isMaterial = theme === 'material';
    const isSemantic = theme === 'semantic';

    // FIXME: theme is undefined during `docusaurus build`.
    const {
      AutoForm,
      BoolField,
      ErrorsField,
      LongTextField,
      NumField
    } = themes[theme || 'unstyled'];

    return (
      <PlaygroundWrap theme={theme}>
        <AutoForm
          autosave
          autosaveDelay={100}
          model={value}
          onSubmit={onChange}
          schema={schema}
        >
          <BoolField name="autosave" />
          <NumField name="autosaveDelay" disabled={!value.autosave} />
          <BoolField name="disabled" />
          <BoolField name="label" />
          <BoolField name="placeholder" />
          <BoolField
            name="showInlineError"
            disabled={!(isAntd || isBootstrap || isMaterial || isSemantic)}
          />
          <BoolField name="asyncOnSubmit" />
          <BoolField name="asyncOnValidate" />
          <LongTextField
            name="schema"
            {...(isMaterial && { fullWidth: true, rowsMax: 20 })}
          />
          <ErrorsField />
        </AutoForm>
      </PlaygroundWrap>
    );
  }
}

const PlaygroundPropsField = connectField(PlaygroundProps, {
  baseField: PlaygroundField
});

class PlaygroundSelect extends Component {
  render() {
    // FIXME: allowedValues is undefined during `docusaurus build`.
    const { allowedValues = [], onChange, transform, value } = this.props;

    return (
      <select onChange={event => onChange(event.target.value)} value={value}>
        {allowedValues.map(value => (
          <option key={value} value={value}>
            {transform ? transform(value) : value}
          </option>
        ))}
      </select>
    );
  }
}

const PlaygroundSelectField = connectField(PlaygroundSelect);

export class PlaygroundWrap extends Component {
  render() {
    const { children, frameProps, theme } = this.props;
    const content = (
      <React.Fragment>
        {children}
        {styles[theme]}
      </React.Fragment>
    );

    if (theme === 'material') {
      // Material-UI injects scoped CSS classes into head.
      return (
        <section
          children={content}
          className={classNames(
            'frame-root',
            playgroundStyles['playground-wrap']
          )}
        />
      );
    }

    let frameContent = content;
    if (theme === 'antd') {
      // Make AntD popups contained within the iframe.
      frameContent = (
        <FrameContextConsumer>
          {context => (
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

export default Playground;
