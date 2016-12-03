import Frame          from 'react-frame-component';
import React          from 'react';
import {Component}    from 'react';
import {connectField} from 'uniforms';

import styles from '../lib/styles';
import themes from '../lib/themes';

import ApplicationField from './ApplicationField';

class ApplicationPreview extends Component {
    constructor () {
        super(...arguments);

        this.state = {model: undefined};

        this.onModel = this.onModel.bind(this);
    }

    componentWillReceiveProps (props) {
        if (this.props.value.schema !== props.value.schema) {
            this.onModel({});
        }
    }

    onModel (model) {
        this.setState({model: JSON.stringify(model, null, 4)});
    }

    render () {
        const Form = themes[this.props.theme].AutoForm;
        const link = styles[this.props.theme];

        const props = {...this.props.value};
        props.schema = eval(`(${props.schema})`);

        return (
            <Frame>
                {link}

                {this.props.errorMessage ? (
                    <span children={this.props.errorMessage} />
                ) : (
                    <Form key={this.props.value.schema} onChangeModel={this.onModel} {...props} />
                )}

                {this.state.model !== undefined && <br />}
                {this.state.model !== undefined && <pre children={this.state.model} />}
            </Frame>
        );
    }
}

export default connectField(ApplicationPreview, {baseField: ApplicationField});
