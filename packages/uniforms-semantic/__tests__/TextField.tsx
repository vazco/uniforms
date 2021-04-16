import { screen } from '@testing-library/react';
import React from 'react';
import { TextField } from 'uniforms-semantic';
import { render, TextFieldTests } from 'uniforms/__suites__';

TextFieldTests(TextField);

test('<TextField> - renders a wrapper with unknown props', () => {
  const props = {
    'data-x': 'x',
    'data-y': 'y',
    'data-z': 'z',
  };
  render(<TextField name="x" {...props} />);

  const wrapper = screen.getByTestId('field-wrapper');
  Object.entries(props).forEach(([key, value]) =>
    expect(wrapper).toHaveAttribute(key, value),
  );
});

test('<TextField> - renders a TextField with correct error text (specified)', () => {
  const errorMessage = 'Error';
  render(
    <TextField
      error={new Error()}
      name="x"
      showInlineError
      errorMessage={errorMessage}
    />,
  );

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

test('<TextField> - renders a TextField with correct error text (showInlineError=false)', () => {
  const errorMessage = 'Error';
  render(
    <TextField
      name="x"
      error={new Error()}
      showInlineError={false}
      errorMessage={errorMessage}
    />,
  );

  expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
});

test('<TextField> - renders an icon', () => {
  render(<TextField name="x" icon="small home" />);

  expect(screen.getByTestId('field-icon')).toBeInTheDocument();
});

test('<TextField> - renders with a custom wrapClassName', () => {
  const testClassName = 'test-class-name';
  render(<TextField name="x" wrapClassName={testClassName} />);

  expect(screen.getByRole('textbox').closest('div')).toHaveClass(testClassName);
});
