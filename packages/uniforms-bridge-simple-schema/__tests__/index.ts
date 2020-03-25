import * as uniformsSimpleSchema from 'uniforms-bridge-simple-schema';

it('exports everything', () => {
  expect(uniformsSimpleSchema).toEqual({
    default: expect.any(Function),
    SimpleSchemaBridge: expect.any(Function),
    __esModule: true,
  });
});
