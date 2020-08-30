import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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

Enzyme.configure({ adapter: new Adapter() });
