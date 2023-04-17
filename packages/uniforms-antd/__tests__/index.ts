import * as antd from 'uniforms-antd';
import * as suites from 'uniforms/__suites__';

it('exports everything', () => {
  expect(antd).toEqual({
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
  suites.testAutoField(antd.AutoField);
  // FIXME: AntD `DatePicker` is far from the HTML one.
  // suites.testDateField(antd.DateField);
  suites.testListDelField(antd.ListDelField);
  suites.testListAddField(antd.ListAddField);
  suites.testListField(antd.ListField, {
    getListAddField: screen => screen.getByRole('img', { name: 'plus-square' }),
  });
  suites.testLongTextField(antd.LongTextField);
  suites.testTextField(antd.TextField);
  // FIXME: AntD number input doesn't work with new RTL test implementation
  // suites.testNumField(antd.NumField);
  suites.testHiddenField(antd.HiddenField);
});
