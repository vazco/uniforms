import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import joinName from 'uniforms/joinName';
import {Children} from 'react';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
  children,
  className,
  disabled,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  required,
  showInlineError,
  value,
  ...props
}) => (
  <div className={classnames('ui', className, {disabled}, 'grouped fitted fields list')} {...filterDOMProps(props)}>
    {label && (
      <div className={classnames({error, required}, 'field item')}>
        <label className="left floated">{label}</label>

        <ListAddField name={`${name}.$`} initialCount={initialCount} className="right floated" />
      </div>
    )}

    {label && <div className="ui fitted hidden clearing horizontal divider" />}

    {!!(error && showInlineError) && <div className="ui red basic label">{errorMessage}</div>}

    {children
      ? value.map((item, index) =>
          Children.map(children, child =>
            React.cloneElement(child, {
              key: index,
              label: null,
              name: joinName(name, child.props.name && child.props.name.replace('$', index))
            })
          )
        )
      : value.map((item, index) => (
          <ListItemField key={index} label={null} name={joinName(name, index)} {...itemProps} />
        ))}
  </div>
);
export default connectField(List, {ensureValue: false, includeInChain: false});
