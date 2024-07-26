Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent: () => {},
    removeEventListener: () => {},
    removeListener: () => {},
  })),
});
