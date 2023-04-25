import * as semantic from 'uniforms-semantic';
import * as suites from 'uniforms/__suites__';

it('exports everything', () => {
  expect(semantic).toEqual({
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
  });
});

describe('@RTL', () => {
  suites.testAutoField(semantic.AutoField);
  suites.testDateField(semantic.DateField);
  suites.testListDelField(semantic.ListDelField);
  suites.testListAddField(semantic.ListAddField);
  suites.testListField(semantic.ListField, {
    getListAddField: screen => screen.getByRole('button'),
  });
  suites.testLongTextField(semantic.LongTextField);
  suites.testTextField(semantic.TextField);
  suites.testNumField(semantic.NumField);
  suites.testHiddenField(semantic.HiddenField);
  suites.testRadioField(semantic.RadioField);
});
