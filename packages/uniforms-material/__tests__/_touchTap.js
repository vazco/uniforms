import ReactDOM       from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import tapEventPlugin from 'react-tap-event-plugin';

tapEventPlugin();

const touchTap = element => ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(element.node));

export default touchTap;
