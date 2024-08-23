import { screen } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import React, { ComponentType } from "react";
import z from "zod";
import { expect, test, vi } from "vitest";

import { renderWithZod } from "./utils/render-zod";

export function testListAddField(ListAddField: ComponentType<any>) {
  test("<ListAddField> - correctly reacts on click", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListAddField name="x.$" data-testid="x" value="d" />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId("x"), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).toHaveBeenLastCalledWith("x", ["a", "b", "c", "d"]);
  });

  test("<ListAddField> - correctly reacts on enter", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListAddField name="x.$" data-testid="x" value="d" />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    // we can't use `userEvent.type(...)` because it does 'click + type' so we "select the button"  using `userEvent.tab()`
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("x", ["a", "b", "c", "d"]);
  });

  test("<ListAddField> - prevents onClick when disabled", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListAddField name="x.$" data-testid="x" disabled />,
      model: { x: ["a", "b", "c"] },
      schema: z.object({ x: z.array(z.string()) }),
    });

    await userEvent.click(screen.getByTestId("x"), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  test("<ListAddField> - prevents onClick when readOnly", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListAddField name="x.$" data-testid="x" readOnly />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId("x"), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  test("<ListAddField> - prevents onClick when limit reached", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListAddField name="x.$" data-testid="x" readOnly />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()).min(3) }),
    });
    await userEvent.click(screen.getByTestId("x"), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });
}
