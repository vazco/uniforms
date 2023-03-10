import * as uniformsZod from 'uniforms-bridge-zod';

it('exports everything', () => {
  expect(uniformsZod).toMatchObject({
    default: expect.any(Function),
    ZodBridge: expect.any(Function),
  });
});
