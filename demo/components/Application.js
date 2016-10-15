import Frame      from 'react-frame-component';
import PanelGroup from 'react-panelgroup';
import React      from 'react';

import {getSchemas} from '/assets/schemas';
import {getSchema}  from '/assets/schemas';
import {getStyles}  from '/assets/styles';
import {getThemes}  from '/assets/themes';
import {getTheme}   from '/assets/themes';

export class Application extends React.Component {
    constructor () {
        super(...arguments);

        this.state = {
            doc: null,

            schemas: getSchemas(),
            themes:  getThemes(),

            schema: getSchema(),
            styles: getStyles(),
            theme:  getTheme()
        };

        this.onSchema = this.onSchema.bind(this);
        this.onTheme  = this.onTheme.bind(this);
    }

    onSchema ({target: {value}}) {
        this.setState({schema: getSchema(value)});
    }

    onTheme ({target: {value}}) {
        this.setState({
            styles: getStyles(value),
            theme:  getTheme(value)
        });
    }

    render () {
        const {
            state: {
                doc,
                schema,
                schemas,
                styles,
                theme,
                themes
            },

            onSchema,
            onTheme
        } = this;

        return (
            <PanelGroup spacing={3}>
                <section>
                    <nav className="panelGroupNavbar">
                        <section className="panelHeader">
                            <b>
                                uniforms
                            </b>
                        </section>

                        <section className="panelHeaderInfo">
                            <select value={theme.text} onChange={onTheme}>
                                {themes.map(theme =>
                                    <option key={theme} value={theme}>
                                        Theme - {theme}
                                    </option>
                                )}
                            </select>

                            <select value={0} onChange={onSchema}>
                                <option value={0}>
                                    Select example
                                </option>

                                {schemas.map(schema =>
                                    <option key={schema} value={schema}>
                                        {schema}
                                    </option>
                                )}
                            </select>
                        </section>
                    </nav>

                    <textarea value={schema.string} onChange={onSchema} />

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

                <Frame>
                    {styles}
                    {schema.object ? (
                        <theme.components.AutoForm
                            key={schema.string}
                            schema={schema.object}
                            onSubmit={doc => this.setState({doc: JSON.stringify(doc, null, 4)})}
                        />
                    ) : (
                        <span>
                            {schema.error.message}
                        </span>
                    )}

                    {!!doc && (
                        <br />
                    )}
                    {!!doc && (
                        <pre>
                            {doc}
                        </pre>
                    )}
                </Frame>
            </PanelGroup>
        );
    }
}

export default Application;
