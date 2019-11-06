import { Bridge, createSchemaBridge } from 'uniforms';

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

  it('recognizes a registered bridge', () => {
    class TestSchema {}
    class TestSchemaBridge extends Bridge {
      static check(schema: any) {
        return schema instanceof TestSchema;
      }
    }

    createSchemaBridge.register(TestSchemaBridge);

    expect(createSchemaBridge(new TestSchema())).toBeInstanceOf(
      TestSchemaBridge
    );
  });

  it('throws on unrecognised schema', () => {
    expect(createSchemaBridge).toThrow(/Unrecognised schema: /);
  });
});
