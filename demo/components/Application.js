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
            showInlineError: false,
            schemas: getSchemas(),
            themes:  getThemes(),

            schema: getSchema(),
            styles: getStyles(),
            theme:  getTheme()
        };

        this.onSchema = this.onSchema.bind(this);
        this.onTheme  = this.onTheme.bind(this);
        this.changeInlineError  = this.changeInlineError.bind(this);
    }

    onSchema ({target: {value}}) {
        this.setState({doc: null, schema: getSchema(value)});
    }

    onTheme ({target: {value}}) {
        this.setState({doc: null, styles: getStyles(value), theme: getTheme(value)});
    }
    changeInlineError () {
        this.setState({showInlineError: !this.state.showInlineError});
    }

    render () {
        const {
            state: {
                doc,
                schema,
                schemas,
                styles,
                theme,
                themes,
                showInlineError
            },

            onSchema,
            onTheme,
            changeInlineError
        } = this;
        return (
            <PanelGroup spacing={3} >

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
                            <input type="checkbox" onChange={changeInlineError} />
                        </section>
                    </nav>

                    <textarea
                        spellCheck={false}
                        value={schema.string}
                        onChange={onSchema}
                        style={{fontSize: '13px', lineHeight: '1'}}
                    />
                </section>
                <section style={{margin: '20px', fontSize: '13px', lineHeight: '1', overflow: 'scroll'}}>
                    {styles}
                    <div>
                        {schema.object ? (
                            <theme.components.AutoForm
                                key={schema.string}
                                schema={schema.object}
                                showInlineError={showInlineError}
                                onSubmit={doc => {
                                    //console.log(doc);
                                    this.setState({doc: JSON.stringify(doc, null, 4)});
                                }}
                            />
                        ) : (
                            <span>
                                {schema.error.message}
                            </span>
                        )}
                    </div>
                    <div>
                        {!!doc && (
                            <br />
                        )}
                    </div>
                    <div>
                        {!!doc && (
                            <pre>
                                {doc}
                            </pre>
                        )}
                    </div>
                </section>
            </PanelGroup>
        );
    }
}

export default Application;
