import * as suites from "uniforms/test/suites";
import { describe } from "vitest";

import * as theme from "uniforms-antd";

describe("@RTL", () => {
  suites.testAutoField(theme.AutoField, {
    getDateField: (screen) => screen.getByRole("textbox"),
    getSelectField: (screen) => screen.getByRole("combobox"),
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
    getListAddField: (screen) =>
      screen.getByRole("img", { name: "plus-square" }),
    testTooltip: true,
    testStyle: true,
  });
  suites.testListItemField(theme.ListItemField);
  suites.testLongTextField(theme.LongTextField);
  // FIXME: AntD number input doesn't work with new RTL test implementation
  // suites.testNumField(antd.NumField);
  suites.testNestField(theme.NestField);
  suites.testQuickForm(theme.QuickForm);
  // FIXME: AntD radio.group does not support HTML attributes https://github.com/ant-design/ant-design/issues/8561, added a flag to skip attributes tests.
  suites.testRadioField(theme.RadioField, { skipHtmlAttributesTest: true });
  // FIXME: AntD has problem with toHaveValue check
  suites.testSubmitField(theme.SubmitField, { skipValueTest: true });
  // FIXME: AntD select does not work with new RTL test implementation
  // suites.testSelectField(theme.SelectField, { theme: "antd" });
  suites.testTextField(theme.TextField);
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
});
