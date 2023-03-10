import * as uniformsSimpleSchema from 'uniforms-bridge-simple-schema';

it('exports everything', () => {
  expect(uniformsSimpleSchema).toMatchObject({
    default: expect.any(Function),
    SimpleSchemaBridge: expect.any(Function),
  });
});
