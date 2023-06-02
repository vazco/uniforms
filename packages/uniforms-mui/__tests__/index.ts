import * as theme from 'uniforms-mui';
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

describe('@RTL', () => {
  suites.testAutoField(theme.AutoField);
  suites.testAutoFields(theme.AutoFields);
  suites.testAutoForm(theme.AutoForm);
  suites.testBaseForm(theme.BaseForm);
  suites.testDateField(theme.DateField);
  suites.testErrorField(theme.ErrorField);
  suites.testErrorsField(theme.ErrorsField);
  suites.testHiddenField(theme.HiddenField);
  suites.testListAddField(theme.ListAddField);
  suites.testListDelField(theme.ListDelField);
  suites.testListField(theme.ListField, {
    getListAddField: screen => screen.getByText(/\+/),
  });
  suites.testLongTextField(theme.LongTextField);
  suites.testNumField(theme.NumField);
  suites.testQuickForm(theme.QuickForm);
  suites.testRadioField(theme.RadioField);
  suites.testTextField(theme.TextField);
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
});
