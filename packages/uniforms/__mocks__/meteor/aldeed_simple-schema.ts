export const SimpleSchema = {
  extendOptions: jest.fn(),
  _makeGeneric: jest.fn(name =>
    typeof name === 'string' ? name.replace(/\.[0-9]+(?=\.|$)/g, '.$') : null,
  ),
};
