import * as theme from 'uniforms-antd';
import * as suites from 'uniforms/__suites__';

it('exports everything', () => {
  expect(theme).toEqual({
    AutoFields: expect.any(Function),
    AutoField: expect.any(Function),
    AutoForm: expect.any(Function),
    BaseForm: expect.any(Function),
    BoolField: expect.any(Function),
    DateField: expect.any(Function),
    ErrorField: expect.any(Function),
    ErrorsField: expect.any(Function),
    HiddenField: expect.any(Function),
    ListAddField: expect.any(Function),
    ListDelField: expect.any(Function),
    ListField: expect.any(Function),
    ListItemField: expect.any(Function),
    LongTextField: expect.any(Function),
    NestField: expect.any(Function),
    NumField: expect.any(Function),
    QuickForm: expect.any(Function),
    RadioField: expect.any(Function),
    SelectField: expect.any(Function),
    SubmitField: expect.any(Function),
    TextField: expect.any(Function),
    ValidatedForm: expect.any(Function),
    ValidatedQuickForm: expect.any(Function),
    wrapField: expect.any(Function),
  });
});

describe('@RTL AntD', () => {
  suites.testAutoField(theme.AutoField, {
    getDateField: screen => screen.getByRole('textbox'),
    getSelectField: screen => screen.getByRole('combobox'),
  });
  suites.testAutoForm(theme.AutoForm);
  suites.testBaseForm(theme.BaseForm);
  suites.testBoolField(theme.BoolField, { isButton: true, testCheckbox: true });
  // FIXME: AntD `DatePicker` is far from the HTML one.
  // suites.testDateField(antd.DateField);
  suites.testErrorField(theme.ErrorField);
  suites.testErrorsField(theme.ErrorsField);
  suites.testHiddenField(theme.HiddenField);
  suites.testListAddField(theme.ListAddField);
  suites.testListDelField(theme.ListDelField);
  suites.testListField(theme.ListField, {
    getListAddField: screen => screen.getByRole('img', { name: 'plus-square' }),
    testTooltip: true,
    testStyle: true,
  });
  suites.testListItemField(theme.ListItemField);
  suites.testLongTextField(theme.LongTextField);
  suites.testNumField(theme.NumField);
  suites.testNestField(theme.NestField);
  suites.testQuickForm(theme.QuickForm);
  // FIXME: AntD radio.group does not support HTML attributes https://github.com/ant-design/ant-design/issues/8561, added a flag to skip attributes tests.
  suites.testRadioField(theme.RadioField, { skipHtmlAttributesTest: true });
  // FIXME: AntD has problem with toHaveValue check
  suites.testSubmitField(theme.SubmitField, { skipValueTest: true });
  // FIXME: AntD select does not work with new RTL test implementation
  suites.testSelectField(theme.SelectField, { theme: 'antd' });
  suites.testTextField(theme.TextField);
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testDateField(theme.DateField, {
    theme: 'antd',
  });
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
  suites.testWrapField(theme.wrapField, {
    helpPropsName: 'help',
    withoutWrapClassName: true,
    withoutHelpClassName: true,
    withoutLabelClassName: true,
  });
});
