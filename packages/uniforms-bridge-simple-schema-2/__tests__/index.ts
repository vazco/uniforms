import * as uniformsSimpleSchema2 from 'uniforms-bridge-simple-schema-2';

it('exports everything', () => {
  expect(uniformsSimpleSchema2).toMatchObject({
    default: expect.any(Function),
    SimpleSchema2Bridge: expect.any(Function),
  });
});
