import get from 'lodash/get';
import { Children, cloneElement } from 'react';

import joinName from './joinName';

export default function injectName(
  name: string,
  children: JSX.Element | JSX.Element[],
  parent?: JSX.Element
): JSX.Element[] {
  return Children.map(children, child => {
    if (!child || typeof child === 'string' || get(parent, 'props.name'))
      return child;

    return cloneElement(child, {
      children: injectName(name, child.props.children, child),
      name: joinName(name, child.props.name)
    });
  });
}
