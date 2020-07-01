import { context } from 'uniforms';
import { mount as enzyme } from 'enzyme';

function mount(node, options) {
  if (options === undefined) return enzyme(node);
  return enzyme(node, {
    wrappingComponent: context.Provider,
    wrappingComponentProps: { value: options.context },
  });
}

export default mount as typeof enzyme;
