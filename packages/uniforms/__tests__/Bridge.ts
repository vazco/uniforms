import { Bridge } from 'uniforms';

describe('Bridge', () => {
  class CustomBridge extends Bridge {}
  const customBridgeInstance = new CustomBridge();

  it('cannot be instantiated', () => {
    // @ts-ignore We could use @ts-expect-error in TypeScript 3.9.
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
