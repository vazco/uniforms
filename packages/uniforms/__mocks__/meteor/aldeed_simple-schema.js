// @flow

export const SimpleSchema = {
  extendOptions: jest.fn(),
  _makeGeneric: jest.fn(name => {
    if (typeof name !== 'string') {
      return null;
    }

    return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');
  })
};
