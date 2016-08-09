import React      from 'react';
import {Children} from 'react';

import joinName from './joinName';

export default function injectName (name, children, parent) {
    return Children.map(children, child =>
        child && typeof child !== 'string' && (!parent || !parent.props || !parent.props.name)
            ? !child.props
                ? React.cloneElement(child, {name})
                : React.cloneElement(child, {
                    name:     joinName  (name, child.props.name),
                    children: injectName(name, child.props.children, child)
                })
            : child
    );
}
