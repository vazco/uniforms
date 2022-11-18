import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import { connectField } from 'uniforms';

import { render } from './render';

export function testAutoField(AutoField: ComponentType<any>) {
  test('<AutoField> - works with absolute nested names (object variant) ', () => {
    const Element = connectField(() => (
      <AutoField
        name="x.y.z"
        data-testid="x.y.z"
        options={{ absoluteName: true }}
      />
    ));

    render(<Element name="a" />, {
      a: { type: String },
      x: { type: Object },
      'x.y': { type: Object },
      'x.y.z': { type: String },
    });

    expect(screen.getByTestId('x.y.z')).toBeInTheDocument();
  });

  test('<AutoField> - works with absolute nested names (list variant) ', () => {
    const Element = connectField(() => (
      <AutoField
        name="x.0.z"
        data-testid="x.0.z"
        options={{ absoluteName: true }}
      />
    ));

    render(<Element name="a" />, {
      a: { type: String },
      x: { type: Array },
      'x.$': { type: Object },
      'x.$.z': { type: String },
    });

    expect(screen.getByTestId('x.0.z')).toBeInTheDocument();
  });
}
