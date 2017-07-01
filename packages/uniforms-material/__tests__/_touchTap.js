import ReactDOM       from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

export default element => ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(element.node));
