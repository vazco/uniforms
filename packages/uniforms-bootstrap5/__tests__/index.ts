import * as bootstrap5 from 'uniforms-bootstrap5';
import * as suites from 'uniforms/__suites__';

it('exports everything', () => {
  expect(bootstrap5).toEqual({
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
    gridClassName: expect.any(Function),
    wrapField: expect.any(Function),
  });
});

describe('@RTL', () => {
  suites.testAutoField(bootstrap5.AutoField);
  suites.testDateField(bootstrap5.DateField);
  suites.testListDelField(bootstrap5.ListDelField);
  suites.testListAddField(bootstrap5.ListAddField);
  suites.testListField(bootstrap5.ListField, {
    getListAddField: screen => screen.getByRole('button'),
  });
  suites.testTextField(bootstrap5.TextField);
  suites.testNumField(bootstrap5.NumField);
  suites.testHiddenField(bootstrap5.HiddenField);
});
