import { screen } from '@testing-library/react';
import React from 'react';
import { TextField } from 'uniforms-bootstrap4';
import { render, TextFieldTests } from 'uniforms/__suites__';

TextFieldTests(TextField);

test('<TextField> - renders a wrapper with unknown props', () => {
  const props = {
    'data-x': 'x',
    'data-y': 'y',
    'data-z': 'z',
  };
  render(<TextField name="x" {...props} />);

  const wrapper = screen.getByRole('textbox').closest('div');
  Object.entries(props).forEach(([key, value]) =>
    expect(wrapper).toHaveAttribute(key, value),
  );
});
