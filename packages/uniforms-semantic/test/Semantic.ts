import * as suites from "uniforms/test/suites";
import { describe } from "vitest";

import * as theme from "uniforms-semantic";

describe("@RTL Semantic", () => {
  suites.testAutoField(theme.AutoField, {
    getDateField: (screen) => screen.getByLabelText("X"),
    getSelectField: (screen) => screen.getByRole("combobox"),
  });
  suites.testAutoForm(theme.AutoForm);
  suites.testBaseForm(theme.BaseForm);
  suites.testBoolField(theme.BoolField, { testError: true, testFitted: true });
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
  suites.testLongTextField(theme.LongTextField);
  suites.testNestField(theme.NestField);
  suites.testNumField(theme.NumField);
  suites.testQuickForm(theme.QuickForm);
  suites.testRadioField(theme.RadioField);
  suites.testSelectField(theme.SelectField, { showInlineError: true });
  suites.testSubmitField(theme.SubmitField);
  suites.testTextField(theme.TextField, {
    testWrapClassName: true,
    testRenderIcon: true,
    testShowInlineError: true,
  });
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
});
