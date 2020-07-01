import { context } from 'uniforms';
import { mount as enzyme } from 'enzyme';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

function mount(node, options) {
  if (options === undefined) return enzyme(node);
  return enzyme(node, {
    wrappingComponent: context.Provider,
    wrappingComponentProps: { value: options.context },
  });
}

export default mount as typeof enzyme;
