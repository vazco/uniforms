import PropTypes      from 'prop-types';
import React          from 'react';
import enUS           from 'antd/lib/locale-provider/en_US';
import {Component}    from 'react';

import {Meteor} from 'meteor/meteor';

import presets from '../lib/presets';
import schema  from '../lib/schema';

import ApplicationForm         from './ApplicationForm';
import ApplicationPreviewField from './ApplicationPreviewField';
import ApplicationPropsField   from './ApplicationPropsField';
import ApplicationSelectField  from './ApplicationSelectField';

class Application extends Component {
    constructor () {
        super(...arguments);

        this.state = schema.clean({});

        this.onChange = this.onChange.bind(this);
    }

    getChildContext () {
        return {
            antLocale: {...enUS, exist: true}
        };
    }

    onChange (key, value) {
        if (key === 'preset') {
            this.setState({props: {...this.state.props, schema: presets[value]}});
        }

        this.setState({[key]: value});
    }

    render () {
        return (
            <ApplicationForm label={false} model={this.state} onChange={this.onChange} schema={schema} spacing={3}>
                <section className="panelLeft" >
                    <nav className="panelGroupNavbar">
                        <section className="panelHeader">
                            <b>
                                uniforms
                            </b>
                        </section>

                        <section className="panelHeaderInfo">
                            <ApplicationSelectField name="preset" />
                            <ApplicationSelectField name="theme" />
                        </section>
                    </nav>

                    <ApplicationPropsField name="props" spellCheck={false} />

                    <a href="https://github.com/vazco/uniforms">
                        {/* eslint-disable max-len */}
                        <img
                            alt="Fork me on GitHub"
                            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                        />
                        {/* eslint-enable max-len */}
                    </a>
                </section>

                <ApplicationPreviewField name="props" nameTheme="theme" />
            </ApplicationForm>
        );
    }
}

Application.childContextTypes = {
    antLocale: PropTypes.object.isRequired
};

export default Application;
