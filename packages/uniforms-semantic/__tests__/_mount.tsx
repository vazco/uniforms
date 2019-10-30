import { mount as enzyme } from 'enzyme';
import context from 'uniforms/context';

export default function mount(children, value) {
  if (value === undefined) return enzyme(children);
  return enzyme(children, {
    wrappingComponent: context.Provider,
    wrappingComponentProps: { value: value.context }
  });
}
