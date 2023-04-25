import * as material from 'uniforms-material';
import * as suites from 'uniforms/__suites__';

it('exports everything', () => {
  expect(material).toEqual({
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
  suites.testAutoField(material.AutoField);
  suites.testDateField(material.DateField);
  suites.testListDelField(material.ListDelField);
  suites.testListAddField(material.ListAddField);
  suites.testListField(material.ListField, {
    getListAddField: screen => screen.getByText(/\+/),
  });
  suites.testLongTextField(material.LongTextField);
  suites.testTextField(material.TextField);
  suites.testNumField(material.NumField);
  suites.testHiddenField(material.HiddenField);
  suites.testRadioField(material.RadioField);
});
