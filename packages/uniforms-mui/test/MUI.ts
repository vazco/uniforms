import { describe } from "vitest";
import * as suites from "uniforms/test/suites";

import * as theme from "uniforms-mui";

describe("@RTL MUI", () => {
  suites.testAutoField(theme.AutoField, {
    getDateField: (screen) => screen.getByLabelText("X *"),
    getSelectField: (screen) => screen.getByRole("button"),
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
  // FIXME: MUI select does not work with new RTL test implementation
  suites.testSelectField(theme.SelectField, {
    showInlineError: true,
    theme: "mui",
  });
  suites.testSubmitField(theme.SubmitField);
  suites.testTextField(theme.TextField);
  suites.testValidatedForm(theme.ValidatedForm);
  suites.testValidatedQuickForm(theme.ValidatedQuickForm);
  suites.testWrapField(theme.wrapField, {
    helpPropsName: "helperText",
    withoutLabel: true,
    withoutInlineError: true,
    withoutWrapClassName: true,
    withoutHelpClassName: true,
    withoutLabelClassName: true,
  });
});
