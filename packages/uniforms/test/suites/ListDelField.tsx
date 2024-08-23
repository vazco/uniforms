import { cleanup, screen } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import React, { ComponentType } from "react";
import z from "zod";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithZod } from "./utils/render-zod";

export function testListDelField(ListDelField: ComponentType<any>) {
  afterEach(cleanup);

  test("<ListDelField> - correctly reacts on click", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListDelField name="x.1" data-testid="x" />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId("x"));
    expect(onChange).toHaveBeenLastCalledWith("x", ["a", "c"]);
  });

  test("<ListDelField> - correctly reacts on enter", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListDelField name="x.1" data-testid="x" />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    // we can't use `userEvent.type(...)` because it does 'click + type' so we "select the button"  using `userEvent.tab()`
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("x", ["a", "c"]);
  });

  test("<ListDelField> - prevents onClick when disabled", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListDelField name="x.1" data-testid="x" disabled />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId("x"), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  test("<ListDelField> - prevents onClick when readOnly", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListDelField name="x.1" data-testid="x" readOnly />,
      model: { x: ["a", "b", "c"] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId("x"), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  test("<ListDelField> - prevents onClick when limit reached", async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <ListDelField name="x.1" data-testid="x" readOnly />,
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
