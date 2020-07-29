import { Bridge } from 'uniforms';

describe('Bridge', () => {
  class CustomBridge extends Bridge {}
  const customBridgeInstance = new CustomBridge();

  it('cannot be instantiated', () => {
    // @ts-expect-error
    expect(() => new Bridge()).toThrow();
  });

  ([
    'getError',
    'getErrorMessage',
    'getErrorMessages',
    'getField',
    'getInitialValue',
    'getProps',
    'getSubfields',
    'getType',
    'getValidator',
  ] as const).forEach(method => {
    describe(`#${method}`, () => {
      it('throws an unimplemented error', () => {
        // @ts-expect-error
        expect(() => customBridgeInstance[method]()).toThrow();
      });
    });
  });
});
