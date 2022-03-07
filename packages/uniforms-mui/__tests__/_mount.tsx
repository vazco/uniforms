import { mount as enzyme } from 'enzyme';
import { context } from 'uniforms';

function mount(node: any, options: any) {
  if (options === undefined) {
    return enzyme(node);
  }
  return enzyme(node, {
    wrappingComponent: context.Provider,
    wrappingComponentProps: { value: options.context },
  });
}

export default mount as typeof enzyme;
