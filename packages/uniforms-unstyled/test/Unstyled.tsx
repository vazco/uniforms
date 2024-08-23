import { describe } from "vitest";

import * as theme from "uniforms-unstyled";
import * as suites from "uniforms/test/suites";

describe("@RTL unstyled", () => {
  suites.testAutoField(theme.AutoField, {
    getDateField: (screen) => screen.getByLabelText("X"),
    getSelectField: (screen) => screen.getByRole("combobox"),
  });
  suites.testAutoForm(theme.AutoForm);
  suites.testBaseForm(theme.BaseForm);
  suites.testBoolField(theme.BoolField);
  suites.testDateField(theme.DateField);
  suites.testErrorField(theme.ErrorField);
  suites.testErrorsField(theme.ErrorsField);
  suites.testHiddenField(theme.HiddenField);
  suites.testListAddField(theme.ListAddField);
  suites.testListDelField(theme.ListDelField);
  suites.testListField(theme.ListField, {
    getListAddField: (screen) => screen.getByRole("button", { name: "+" }),
    testError: false,
  });
  suites.testListItemField(theme.ListItemField);
  suites.testLongTextField(theme.LongTextField, {
    skipShowInlineErrorTests: true,
  });
  suites.testNestField(theme.NestField, {
    skipShowInlineErrorTests: true,
    skipErrorMessageTests: true,
  });
  suites.testNumField(theme.NumField);
  suites.testQuickForm(theme.QuickForm);
  suites.testRadioField(theme.RadioField);
  suites.testSelectField(theme.SelectField);
  suites.testSubmitField(theme.SubmitField);
  suites.testTextField(theme.TextField, { testShowInlineError: false });
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
});
