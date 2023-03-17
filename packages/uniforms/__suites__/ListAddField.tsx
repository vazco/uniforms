import { screen } from '@testing-library/react';
import userEvent, {
  PointerEventsCheckLevel,
} from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testListAddField(ListAddField: ComponentType<any>) {
  test('<ListAddField> - correctly reacts on click', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <ListAddField name="x.1" data-testid="x" value="d" />,
      model: { x: ['a', 'b', 'c'] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId('x'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).toHaveBeenLastCalledWith('x', ['a', 'b', 'c', 'd']);
  });

  test('<ListAddField> - correctly reacts on enter', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <ListAddField name="x.1" data-testid="x" value="d" />,
      model: { x: ['a', 'b', 'c'] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.type(screen.getByTestId('x'), '{Enter}');
    expect(onChange).toHaveBeenLastCalledWith('x', ['a', 'b', 'c', 'd']);
  });

  test('<ListAddField> - prevents onClick when disabled', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <ListAddField name="x.1" data-testid="x" disabled />,
      model: { x: ['a', 'b', 'c'] },
      schema: z.object({ x: z.array(z.string()) }),
    });

    await userEvent.click(screen.getByTestId('x'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<ListAddField> - prevents onClick when readOnly', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <ListAddField name="x.1" data-testid="x" readOnly />,
      model: { x: ['a', 'b', 'c'] },
      onChange,
      schema: z.object({ x: z.array(z.string()) }),
    });
    await userEvent.click(screen.getByTestId('x'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<ListAddField> - prevents onClick when limit reached', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <ListAddField name="x.1" data-testid="x" readOnly />,
      model: { x: ['a', 'b', 'c'] },
      onChange,
      schema: z.object({ x: z.array(z.string()).min(3) }),
    });
    await userEvent.click(screen.getByTestId('x'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(onChange).not.toHaveBeenCalled();
  });
}
