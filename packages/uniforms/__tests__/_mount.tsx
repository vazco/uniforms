import { Component, ReactElement } from 'react';
import { context, Context } from 'uniforms';
import { ReactWrapper, mount as enzyme } from 'enzyme';

const mount: typeof enzyme = (node, options) => {
  if (options === undefined) return enzyme(node);
  return enzyme(node, {
    wrappingComponent: context.Provider,
    wrappingComponentProps: { value: options.context },
  });
};

export default mount;
