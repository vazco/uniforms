import { expect, test } from "vitest";

import * as theme from "uniforms-mui";

test("exports everything", () => {
  expect(theme).toHaveProperty("AutoFields", expect.any(Function));
  expect(theme).toHaveProperty("AutoField", expect.any(Function));
  expect(theme).toHaveProperty("AutoForm", expect.any(Function));
  expect(theme).toHaveProperty("BaseForm", expect.any(Function));
  expect(theme).toHaveProperty("BoolField", expect.any(Function));
  expect(theme).toHaveProperty("DateField", expect.any(Function));
  expect(theme).toHaveProperty("ErrorField", expect.any(Function));
  expect(theme).toHaveProperty("ErrorsField", expect.any(Function));
  expect(theme).toHaveProperty("HiddenField", expect.any(Function));
  expect(theme).toHaveProperty("ListAddField", expect.any(Function));
  expect(theme).toHaveProperty("ListDelField", expect.any(Function));
  expect(theme).toHaveProperty("ListField", expect.any(Function));
  expect(theme).toHaveProperty("ListItemField", expect.any(Function));
  expect(theme).toHaveProperty("LongTextField", expect.any(Function));
  expect(theme).toHaveProperty("NestField", expect.any(Function));
  expect(theme).toHaveProperty("NumField", expect.any(Function));
  expect(theme).toHaveProperty("QuickForm", expect.any(Function));
  expect(theme).toHaveProperty("RadioField", expect.any(Function));
  expect(theme).toHaveProperty("SelectField", expect.any(Function));
  expect(theme).toHaveProperty("SubmitField", expect.any(Function));
  expect(theme).toHaveProperty("TextField", expect.any(Function));
  expect(theme).toHaveProperty("ValidatedForm", expect.any(Function));
  expect(theme).toHaveProperty("ValidatedQuickForm", expect.any(Function));
});
