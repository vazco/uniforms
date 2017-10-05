import ReactTestUtils from 'react-dom/test-utils';

export default element => ReactTestUtils.Simulate.touchTap(element.find('button').getDOMNode());
