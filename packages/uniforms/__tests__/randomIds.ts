import { randomIds } from 'uniforms';

describe('randomIds', () => {
  it('is a function', () => {
    expect(randomIds).toBeInstanceOf(Function);
  });

  it('returns a function', () => {
    expect(randomIds()).toBeInstanceOf(Function);
  });

  it('generate random id', () => {
    const amount = 100;

    const generator = randomIds();
    const generated = Array.from({ length: amount }, generator);

    const unique = generated.filter((a, b, c) => c.indexOf(a) === b);

    expect(unique).toHaveLength(amount);
  });
});
