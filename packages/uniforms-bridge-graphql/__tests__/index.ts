import * as uniformsGraphQL from 'uniforms-bridge-graphql';

it('exports everything', () => {
  expect(uniformsGraphQL).toEqual({
    default: expect.any(Function),
    GraphQLBridge: expect.any(Function),
    __esModule: true,
  });
});
