import { describe } from "vitest";
import * as suites from "uniforms/test/suites";

import * as theme from "uniforms-mui";

describe("@RTL", () => {
  suites.testAutoField(theme.AutoField, {
    getDateField: (screen) => screen.getByLabelText("X *"),
    getSelectField: (screen) => screen.getByRole("combobox"),
  });
  suites.testAutoForm(theme.AutoForm);
  suites.testBaseForm(theme.BaseForm);
  suites.testBoolField(theme.BoolField, { testSwitch: true });
  suites.testDateField(theme.DateField);
  suites.testErrorField(theme.ErrorField);
  suites.testErrorsField(theme.ErrorsField);
  suites.testHiddenField(theme.HiddenField);
  suites.testListAddField(theme.ListAddField);
  suites.testListDelField(theme.ListDelField);
  suites.testListField(theme.ListField, {
    getListAddField: (screen) => screen.getByText(/\+/),
    testError: false,
  });
  suites.testListItemField(theme.ListItemField);
  suites.testLongTextField(theme.LongTextField);
  suites.testNestField(theme.NestField, { skipInMuiTests: true });
  suites.testNumField(theme.NumField);
  suites.testQuickForm(theme.QuickForm);
  suites.testRadioField(theme.RadioField);
  suites.testSubmitField(theme.SubmitField);
  suites.testTextField(theme.TextField);
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
});
