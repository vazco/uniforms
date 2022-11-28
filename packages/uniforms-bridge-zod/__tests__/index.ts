import * as uniformsZod from 'uniforms-bridge-zod';

test('exports everything', () => {
  expect(uniformsZod).toEqual({
    default: expect.any(Function),
    ZodBridge: expect.any(Function),
  });
});
