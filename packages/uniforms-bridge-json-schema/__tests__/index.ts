import * as uniformsJSONSchema from 'uniforms-bridge-json-schema';

test('exports everything', () => {
  expect(uniformsJSONSchema).toEqual({
    default: expect.any(Function),
    JSONSchemaBridge: expect.any(Function),
  });
});
