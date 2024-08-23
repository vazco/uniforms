import { screen } from "@testing-library/react";
import React from "react";
import { wrapField } from "uniforms-antd";
import { renderWithZod } from "uniforms/test/suites";
import { describe, expect, test } from "vitest";
import { z } from "zod";

describe("wrapField tests", () => {
  test("<wrapField> - renders wrapper with extra style", () => {
    const { container } = renderWithZod({
      element: wrapField(
        { wrapperStyle: { backgroundColor: "red" } },
        <div data-testid="x" />,
      ),
      schema: z.object({}),
    });
    const element = container.getElementsByClassName("ant-form-item")[0];
    expect(element?.getAttribute("style")).toBe("background-color: red;");
  });

  test("<wrapField> - renders wrapper with label and info", () => {
    renderWithZod({
      element: wrapField({ label: "Label", info: "Info" }, <div />),
      schema: z.object({}),
    });
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe(
      "question-circle",
    );
  });

  test("<wrapField> - renders wrapper with extra text", () => {
    renderWithZod({
      element: wrapField({ extra: "Extra" }, <div data-testid="x" />),
      schema: z.object({}),
    });
    expect(screen.getByText("Extra")).toBeInTheDocument();
  });

  // FIXME:
  // test("<wrapField> - renders wrapper with a custom validateStatus", () => {
  //   renderWithZod({
  //     element: wrapField(
  //       { validateStatus: "success" },
  //       <div data-testid="x" />,
  //     ),
  //     schema: z.object({}),
  //   });
  //   expect(
  //     screen
  //       .getByTestId("x")
  //       .closest(".ant-form-item-has-feedback.ant-form-item-has-success"),
  //   ).toBeInTheDocument();
  // });
});
