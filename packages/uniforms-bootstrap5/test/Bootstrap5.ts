import * as suites from "uniforms/test/suites";
import { describe } from "vitest";

import * as theme from "uniforms-bootstrap5";

describe("@RTL", () => {
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
    getListAddField: (screen) => screen.getByRole("button"),
    disableInlineError: true,
  });
  suites.testListItemField(theme.ListItemField);
  suites.testLongTextField(theme.LongTextField, {
    testMinMaxLength: true,
  });
  suites.testNestField(theme.NestField);
  suites.testNumField(theme.NumField);
  suites.testQuickForm(theme.QuickForm);
  suites.testRadioField(theme.RadioField);
  suites.testSelectField(theme.SelectField, {
    getCheckboxInlineOption: (screen) =>
      screen.getByLabelText("a").closest(".form-check-inline"),
  });
  suites.testSubmitField(theme.SubmitField);
  suites.testTextField(theme.TextField, {
    testWrapClassName: true,
    testMinMaxLength: true,
  });
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
  suites.testWrapField(theme.wrapField);
});
