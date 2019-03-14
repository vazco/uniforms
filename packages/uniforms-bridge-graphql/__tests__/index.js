// @flow

import * as uniformsGraphQL from 'uniforms-bridge-graphql';

it('exports everything', () => {
  expect(uniformsGraphQL).toEqual({
    GraphQLBridge: expect.any(Function)
  });
});
