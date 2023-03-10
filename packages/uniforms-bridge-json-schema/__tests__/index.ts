import * as uniformsJSONSchema from 'uniforms-bridge-json-schema';

it('exports everything', () => {
  expect(uniformsJSONSchema).toMatchObject({
    default: expect.any(Function),
    JSONSchemaBridge: expect.any(Function),
  });
});
