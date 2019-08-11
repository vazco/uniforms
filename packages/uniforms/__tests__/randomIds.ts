import randomIds from 'uniforms/randomIds';

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
    const generated = [...Array(amount)].map(generator);

    const unique = generated.filter((a, b, c) => c.indexOf(a) === b);

    expect(unique).toHaveLength(amount);
  });
});
