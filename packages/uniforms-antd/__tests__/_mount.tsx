import { mount as enzyme } from 'enzyme';
import { context } from 'uniforms';

export default function mount(
  children,
  value: { context: any } = { context: undefined },
) {
  if (value === undefined) return enzyme(children);
  return enzyme(children, {
    wrappingComponent: context.Provider,
    wrappingComponentProps: { value: value.context },
  });
}
