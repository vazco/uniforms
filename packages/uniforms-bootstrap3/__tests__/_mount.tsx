import React from 'react';
import { mount as enzyme } from 'enzyme';
import context from 'uniforms/context';

export default function mount(children, value) {
  return enzyme(
    value === undefined ? (
      children
    ) : (
      <context.Provider children={children} value={value.context} />
    )
  );
}
