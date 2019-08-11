import { Children, cloneElement } from 'react';

import joinName from './joinName';

export default function injectName(
  name: string,
  children: JSX.Element | JSX.Element[],
  parent?: JSX.Element
): JSX.Element[] {
  return Children.map(children, child =>
    child &&
    typeof child !== 'string' &&
    (!parent || !parent.props || !parent.props.name)
      ? !child.props
        ? cloneElement(child, { name })
        : cloneElement(child, {
            name: joinName(name, child.props.name),
            children: injectName(name, child.props.children, child)
          })
      : child
  );
}
