import Frame          from 'react-frame-component';
import React          from 'react';
import {connectField} from 'uniforms';

import styles from '../lib/styles';
import themes from '../lib/themes';

import ApplicationField from './ApplicationField';

const ApplicationProps = ({onChange, schema, theme, value}) => {
    const link = styles[theme];

    const isBootstrap = theme === 'bootstrap3' || theme === 'bootstrap4';
    const isMaterial  = theme === 'material';
    const isSemantic  = theme === 'semantic';

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
                    font-family: monospace !important;
                    min-height: 20em !important;
                }
            `}</style>

            <AutoForm autosave autosaveDelay={100} model={value} onSubmit={onChange} schema={schema}>
                <BoolField     name="autosave" />
                <NumField      name="autosaveDelay" disabled={!value.autosave} />
                <BoolField     name="disabled" />
                <BoolField     name="label" />
                <BoolField     name="placeholder" />
                <BoolField     name="showInlineError" disabled={!(isBootstrap || isMaterial || isSemantic)} />
                <LongTextField name="schema" {...isMaterial && {fullWidth: true, rowsMax: 20}} />

                <ErrorsField />
            </AutoForm>
        </Frame>
    );
};

export default connectField(ApplicationProps, {baseField: ApplicationField});
