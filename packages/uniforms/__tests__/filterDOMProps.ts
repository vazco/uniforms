import { filterDOMProps } from 'uniforms';

describe('joinName', () => {
  it('is a function', () => {
    expect(filterDOMProps).toBeInstanceOf(Function);
  });

  it('removes props', () => {
    expect(filterDOMProps({ value: 999999 })).toEqual({});
    expect(filterDOMProps({ changed: true })).toEqual({});
  });

  it('removes registered props', () => {
    // @ts-ignore: Do not register its type not to pollute it.
    filterDOMProps.register('__special__');

    expect(filterDOMProps({ __special__: true })).toEqual({});
  });

  it('omits rest', () => {
    expect(filterDOMProps({ a: 1 })).toEqual({ a: 1 });
    expect(filterDOMProps({ b: 2 })).toEqual({ b: 2 });
  });
});
