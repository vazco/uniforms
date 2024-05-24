import React, { createContext, useContext } from 'react';
import { UnknownObject } from 'uniforms';
import * as antd from 'uniforms-antd';
import * as bootstrap4 from 'uniforms-bootstrap4';
import * as bootstrap5 from 'uniforms-bootstrap5';
import * as material from 'uniforms-material';
import * as mui from 'uniforms-mui';
import * as semantic from 'uniforms-semantic';
import * as unstyled from 'uniforms-unstyled';

export const AutoFields = _createThemedComponent('AutoFields');
export const AutoField = _createThemedComponent('AutoField');
export const AutoForm = _createThemedComponent('AutoForm');
export const BaseForm = _createThemedComponent('BaseForm');
export const BoolField = _createThemedComponent('BoolField');
export const DateField = _createThemedComponent('DateField');
export const ErrorField = _createThemedComponent('ErrorField');
export const ErrorsField = _createThemedComponent('ErrorsField');
export const HiddenField = _createThemedComponent('HiddenField');
export const ListAddField = _createThemedComponent('ListAddField');
export const ListDelField = _createThemedComponent('ListDelField');
export const ListField = _createThemedComponent('ListField');
export const ListItemField = _createThemedComponent('ListItemField');
export const LongTextField = _createThemedComponent('LongTextField');
export const NestField = _createThemedComponent('NestField');
export const NumField = _createThemedComponent('NumField');
export const QuickForm = _createThemedComponent('QuickForm');
export const RadioField = _createThemedComponent('RadioField');
export const SelectField = _createThemedComponent('SelectField');
export const SubmitField = _createThemedComponent('SubmitField');
export const TextField = _createThemedComponent('TextField');
export const ValidatedForm = _createThemedComponent('ValidatedForm');
export const ValidatedQuickForm = _createThemedComponent('ValidatedQuickForm');

export const themes = {
  antd,
  bootstrap4,
  bootstrap5,
  material,
  mui,
  semantic,
  unstyled,
};

export const themeContext = createContext<keyof typeof themes>('unstyled');

function _createThemedComponent(component: keyof typeof unstyled) {
  return function ThemedComponent(props: UnknownObject) {
    const theme = useContext(themeContext);
    // FIXME: Form prop errors due to `props` having no strict type here.
    const Component: any = themes[theme][component];
    return <Component key={theme} {...props} />;
  };
}
