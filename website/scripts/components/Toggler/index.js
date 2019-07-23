import './Toggler.css';
import TogglerHeader from './TogglerHeader';
import Toggler from './Toggler';

function getDefaultToggle(items) {
  const index = items.findIndex(({ active }) => active === true);
  return index > 0 ? index : 0;
}

export { TogglerHeader, getDefaultToggle };

export default Toggler;
