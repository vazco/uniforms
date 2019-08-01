// @flow

import * as uniformsSimpleSchema2 from 'uniforms-bridge-simple-schema-2';

it('exports everything', () => {
  expect(uniformsSimpleSchema2).toEqual({
    default: expect.any(Function),
    SimpleSchema2Bridge: expect.any(Function)
  });
});
