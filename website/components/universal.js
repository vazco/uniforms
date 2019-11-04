import * as antd from 'uniforms-antd';
import * as bootstrap3 from 'uniforms-bootstrap3';
import * as bootstrap4 from 'uniforms-bootstrap4';
import * as material from 'uniforms-material';
import * as semantic from 'uniforms-semantic';
import * as unstyled from 'uniforms-unstyled';
import React from 'react';

import { themeContext } from './ThemeContext';

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
  bootstrap3,
  bootstrap4,
  material,
  semantic,
  unstyled
};

function _createThemedComponent(component) {
  return function renderThemedComponent(props) {
    const theme = React.useContext(themeContext);
    const Component = themes[theme][component];
    return <Component key={theme} {...props} />;
  };
}
