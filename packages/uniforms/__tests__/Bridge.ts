import { Bridge } from 'uniforms';

describe('Bridge', () => {
  class CustomBridge extends Bridge {}
  const customBridgeInstance = new CustomBridge();

  it('cannot be instantiated', () => {
    expect(() => new Bridge()).toThrow();
  });

  [
    'getError',
    'getErrorMessage',
    'getErrorMessages',
    'getField',
    'getInitialValue',
    'getProps',
    'getSubfields',
    'getType',
    'getValidator',
  ].forEach(method => {
    describe(`#${method}`, () => {
      it('throws an unimplemented error', () => {
        expect(() => customBridgeInstance[method]()).toThrow();
      });
    });
  });
});
