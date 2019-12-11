import React, { Children } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

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
  <div
    className={classnames(
      'ui',
      className,
      { disabled },
      'grouped fitted fields list',
    )}
    {...filterDOMProps(props)}
  >
    {label && (
      <div className={classnames({ error, required }, 'field item')}>
        <label className="left floated">{label}</label>

        <ListAddField
          name={`${name}.$`}
          initialCount={initialCount}
          className="right floated"
        />
      </div>
    )}

    {label && <div className="ui fitted hidden clearing horizontal divider" />}

    {!!(error && showInlineError) && (
      <div className="ui red basic label">{errorMessage}</div>
    )}

    {children
      ? value.map((item, index) =>
          Children.map(children, child =>
            React.cloneElement(child, {
              key: index,
              label: null,
              name: joinName(
                name,
                child.props.name && child.props.name.replace('$', index),
              ),
            }),
          ),
        )
      : value.map((item, index) => (
          <ListItemField
            key={index}
            label={null}
            name={joinName(name, index)}
            {...itemProps}
          />
        ))}
  </div>
);

export default connectField(List, {
  ensureValue: false,
  includeInChain: false,
});
