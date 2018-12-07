import React from 'react';
import connectField from 'uniforms/connectField';
import {Component} from 'react';

import styles from '../lib/styles';
import themes from '../lib/themes';

import ApplicationField from './ApplicationField';

class ApplicationPreview extends Component {
  constructor() {
    super(...arguments);

    this.state = {model: undefined};

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
    this.setState({model: JSON.stringify(model, null, 4)});
  }

  render() {
    const Form = themes[this.props.theme].AutoForm;
    const link = styles[this.props.theme];

    const {asyncOnSubmit, asyncOnValidate, ...props} = {...this.props.value};
    props.schema = this._schema;
    if (asyncOnSubmit) {
      props.onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000));
    }
    if (asyncOnValidate) {
      props.onValidate = (model, error, next) => setTimeout(() => next(), 1000);
    }

    return (
      <div>
        {link}

        {this.props.errorMessage ? (
          <span children={this.props.errorMessage} />
        ) : (
          <Form key={props.schema} onChangeModel={this.onModel} {...props} />
        )}

        {this.state.model !== undefined && <br />}
        {this.state.model !== undefined && <pre children={this.state.model} />}
      </div>
    );
  }
}

export default connectField(ApplicationPreview, {baseField: ApplicationField});
