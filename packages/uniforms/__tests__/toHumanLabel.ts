import toHumanLabel from 'uniforms/toHumanLabel';

describe('toHumanLabel', () => {
  it('is a function', () => {
    expect(toHumanLabel).toBeInstanceOf(Function);
  });

  it('works with empty strings', () => {
    expect(toHumanLabel('')).toBe('');
  });

  it('works with separate words', () => {
    expect(toHumanLabel('To Human label')).toBe('To human label');
  });

  it('works with camelCase', () => {
    expect(toHumanLabel('toHumanLabel')).toBe('To human label');
    expect(toHumanLabel('AGirlHasNoName')).toBe('A girl has no name');
    expect(toHumanLabel('t')).toBe('T');
    expect(toHumanLabel('tT')).toBe('T t');
  });

  it('works with camelCase with first capital letter', () => {
    expect(toHumanLabel('ToHumanLabel')).toBe('To human label');
    expect(toHumanLabel('T')).toBe('T');
    expect(toHumanLabel('TT')).toBe('T t');
  });
});
