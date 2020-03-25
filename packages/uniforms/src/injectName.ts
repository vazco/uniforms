import get from 'lodash/get';
import { Children, ReactElement, ReactNode, cloneElement } from 'react';

import joinName from './joinName';

export default function injectName(
  name: string,
  children: ReactNode,
  parent?: ReactNode,
): ReactNode[] {
  return Children.map(children, child => {
    if (!child || typeof child !== 'object' || get(parent, 'props.name'))
      return child;

    // TODO: It's probably the only case left.
    const element = child as ReactElement;
    return cloneElement(element, {
      children: injectName(name, element.props.children, child),
      name: joinName(name, element.props.name),
    });
  });
}
