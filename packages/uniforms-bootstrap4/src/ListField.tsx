import React, { Children } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

const List = ({
  addIcon,
  children,
  className,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  removeIcon,
  showInlineError,
  value,
  ...props
}) => (
  <div
    className={classnames('card mb-3', className)}
    {...filterDOMProps(props)}
  >
    <div className="card-body">
      {label && (
        <div className="card-title">
          <label className="col-form-label">{label}&nbsp;</label>

          <ListAddField
            name={`${name}.$`}
            initialCount={initialCount}
            addIcon={addIcon}
          />

          {!!(error && showInlineError) && (
            <span className="text-danger">{errorMessage}</span>
          )}
        </div>
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
                removeIcon,
              }),
            ),
          )
        : value.map((item, index) => (
            <ListItemField
              key={index}
              label={null}
              name={joinName(name, index)}
              removeIcon={removeIcon}
              {...itemProps}
            />
          ))}
    </div>
  </div>
);
export default connectField(List, {
  ensureValue: false,
  includeInChain: false,
});
