import { screen } from '@testing-library/react';
import React from 'react';
import { TextField } from 'uniforms-material';
import { render, TextFieldTests } from 'uniforms/__suites__';

TextFieldTests(TextField);

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
