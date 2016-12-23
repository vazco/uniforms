import Frame        from 'react-frame-component';
import React        from 'react';
import connectField from 'uniforms/connectField';

import styles from '../lib/styles';
import themes from '../lib/themes';

import ApplicationField from './ApplicationField';

const ApplicationProps = ({onChange, schema, theme, value}) => {
    const link = styles[theme];

    const isBootstrap = theme === 'bootstrap3' || theme === 'bootstrap4';
    const isSemantic  = theme === 'semantic';
    const isAntd = theme === 'antd';

    const AutoForm      = themes[theme].AutoForm;
    const BoolField     = themes[theme].BoolField;
    const ErrorsField   = themes[theme].ErrorsField;
    const LongTextField = themes[theme].LongTextField;
    const NumField      = themes[theme].NumField;

    return (
        <Frame>
            {link}

            <style>{`
                textarea {
                    font-family: monospace;
                    min-height: 20em !important;
                }
            `}</style>

            <AutoForm autosave autosaveDelay={100} model={value} onSubmit={onChange} schema={schema}>
                <BoolField     name="autosave" />
                <NumField      name="autosaveDelay" disabled={!value.autosave} />
                <BoolField     name="disabled" />
                <BoolField     name="label" />
                <BoolField     name="placeholder" />
                <BoolField     name="showInlineError" disabled={!(isBootstrap || isSemantic || isAntd)} />
                <LongTextField name="schema" />

                <ErrorsField />
            </AutoForm>
        </Frame>
    );
};

export default connectField(ApplicationProps, {baseField: ApplicationField});
