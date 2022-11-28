import * as uniformsGraphQL from 'uniforms-bridge-graphql';

test('exports everything', () => {
  expect(uniformsGraphQL).toEqual({
    default: expect.any(Function),
    GraphQLBridge: expect.any(Function),
  });
});
