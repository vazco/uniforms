import { Screen, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import { AutoFieldProps, connectField } from 'uniforms';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testAutoField(
  AutoField: ComponentType<AutoFieldProps>,
  {
    getDateField,
    getSelectField,
  }: {
    getDateField: (screen: Screen) => HTMLElement;
    getSelectField: (screen: Screen) => HTMLElement;
  },
) {
  test('<AutoField> - works with absolute nested names (object variant) ', () => {
    const Element = connectField(() => (
      <AutoField name="x.y.z" data-testid="x.y.z" experimental_absoluteName />
    ));

    renderWithZod({
      element: <Element name="a" />,
      schema: z.object({
        a: z.string(),
        x: z.object({ y: z.object({ z: z.string() }) }),
      }),
    });

    expect(screen.getByTestId('x.y.z')).toBeInTheDocument();
  });

  test('<AutoField> - works with absolute nested names (list variant) ', () => {
    const Element = connectField(() => (
      <AutoField name="x.0.z" data-testid="x.0.z" experimental_absoluteName />
    ));

    renderWithZod({
      element: <Element name="a" />,
      schema: z.object({
        a: z.string(),
        x: z.array(z.object({ z: z.string() })),
      }),
    });

    expect(screen.getByTestId('x.0.z')).toBeInTheDocument();
  });

  test('<AutoFields> - works', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({ x: z.string() }),
    });

    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });

  // FIXME fix error with zod rendering radio field
  test.skip('<AutoField> - detects RadioField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.enum(['x', 'y']),
      }),
    });

    expect(screen.getByRole('radio')).toHaveLength(1);
  });

  test('<AutoField> - detects SelectField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.enum(['x', 'y']),
      }),
    });

    expect(getSelectField(screen)).toBeInTheDocument();
  });

  test('<AutoField> - detects DateField', () => {
    renderWithZod({
      element: <AutoField name="x" data-testid="x" />,
      schema: z.object({
        x: z.date(),
      }),
    });

    screen.debug();
    expect(getDateField(screen)).toBeInTheDocument();
  });

  test('<AutoField> - detects ListField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.array(z.string()),
      }),
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('<AutoField> - detects NumField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.number(),
      }),
    });

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('<AutoField> - detects NestField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.object({ y: z.string() }),
      }),
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('<AutoField> - detects TextField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.string(),
      }),
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('<AutoField> - detects BoolField', () => {
    renderWithZod({
      element: <AutoField name="x" />,
      schema: z.object({
        x: z.boolean(),
      }),
    });

    expect(screen.getByLabelText('X')).toBeInTheDocument();
  });

  test('<AutoField> - uses Component (props)', () => {
    const Component = jest.fn(() => null);

    renderWithZod({
      element: <AutoField name="x" component={Component} />,
      schema: z.object({
        x: z.string(),
      }),
    });

    expect(Component).toHaveBeenCalledTimes(1);
  });

  test('<AutoField> - uses Component (context)', () => {
    const FieldA = jest.fn(() => null);
    const FieldB = jest.fn(() => null);

    renderWithZod({
      element: (
        // @ts-expect-error FIXME: fix types for componentDetectorContext
        <AutoField.componentDetectorContext.Provider
          value={(props: Record<string, any>) =>
            props['data-component'] === 'A' ? FieldA : FieldB
          }
        >
          <>
            <AutoField name="x" data-component="A" />
            <AutoField name="x" data-component="B" />
          </>
          {/* @ts-expect-error FIXME: fix types for componentDetectorContext */}
        </AutoField.componentDetectorContext.Provider>
      ),
      schema: z.object({
        x: z.string(),
      }),
    });

    expect(FieldA).toHaveBeenCalledTimes(1);
    expect(FieldB).toHaveBeenCalledTimes(1);
  });

  test('<AutoField> - uses Component (invalid)', () => {
    const spy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      renderWithZod({
        element: <AutoField name="x" />,
        schema: z.object({ x: z.unknown() }),
      });
    }).toThrow('Field "x" has an unknown type');
    spy.mockRestore();
  });
}
