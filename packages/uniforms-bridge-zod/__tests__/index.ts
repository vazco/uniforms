import * as uniformsZod from 'uniforms-bridge-zod';

it('exports everything', () => {
  expect(uniformsZod).toEqual({
    default: expect.any(Function),
    ZodBridge: expect.any(Function),
  });
});
