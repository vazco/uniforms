import createSchemaBridge from 'uniforms/createSchemaBridge';

describe('createSchemaBridge', () => {
  it('is a function', () => {
    expect(createSchemaBridge).toBeInstanceOf(Function);
  });

  it('accepts a Bridge instance', () => {
    const bridge = {
      getError() {},
      getErrorMessage() {},
      getErrorMessages() {},
      getField() {},
      getInitialValue() {},
      getProps() {},
      getSubfields() {},
      getType() {},
      getValidator() {}
    };

    expect(createSchemaBridge(bridge)).toBe(bridge);
  });

  it('throws on unrecognised schema', () => {
    expect(createSchemaBridge).toThrow(/Unrecognised schema: /);
  });
});
