import * as uniformsGraphQL from 'uniforms-bridge-graphql';

it('exports everything', () => {
  expect(uniformsGraphQL).toMatchObject({
    default: expect.any(Function),
    GraphQLBridge: expect.any(Function),
  });
});
