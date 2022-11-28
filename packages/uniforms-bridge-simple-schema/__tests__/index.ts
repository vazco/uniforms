import * as uniformsSimpleSchema from 'uniforms-bridge-simple-schema';

test('exports everything', () => {
  expect(uniformsSimpleSchema).toEqual({
    default: expect.any(Function),
    SimpleSchemaBridge: expect.any(Function),
  });
});
