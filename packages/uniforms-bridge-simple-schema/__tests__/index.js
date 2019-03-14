// @flow

import * as uniformsSimpleSchema from 'uniforms-bridge-simple-schema';

it('exports everything', () => {
  expect(uniformsSimpleSchema).toEqual({
    SimpleSchemaBridge: expect.any(Function)
  });
});
